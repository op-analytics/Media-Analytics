from gensim import matutils
from numpy import array, dot

from .models import LatentAssociation, Frequency


def get_index_by_value(object_list, key, value):
    """ Get the index in a list of the object whos key equals value

        - @type object_list:  array
        - @param object_list: an array of objects
        - @type key:          string
        - @param key:         the key to find the index of
        - @type value:        any
        - @param value:       the value of the key to find the index of
        - @rtype:             int
        - @return:            index of the key that matches the value
    """
    return next(
        (index for (index, w) in enumerate(object_list) if w[key] == value), None
    )


# The frequency data for each word in words for the year range given.
def get_word_frequency_data(words, year_from, year_to):
    """ Get the count, rank, frequency of a set of words for each year in range

        - @type models:           array
        - @param models:          array of KeyedVectors models
        - @type words:            array
        - @param words:           array of strings
        - @type year_from:        int
        - @param year_from:       the inclusive lower bound for data returned
        - @type year_to:          int
        - @param year_to:         the inclusive upper bound for data returned
        - @rtype frequency_data:  array
        - @return frequency_data: an array that contains an object for each word in words.
                                  each word object has the word and an array with data for
                                  each year.

                                  'array' of 'object'[
                                         word: 'string',
                                         data: 'array' of object[
                                             year:  'int',
                                             rank:  'int',
                                             count: 'int',
                                             freq:  'float'
                                         ]
                                  ]
    """
    frequency_data = []
    frequency_data_db = Frequency.objects(
        word__in=words, year__gte=year_from, year__lte=year_to
    )

    for frequency_data_obj in frequency_data_db:
        word = frequency_data_obj.word
        data_index = get_index_by_value(frequency_data, "word", word)
        word_data = {"year": frequency_data_obj.year, "rank": frequency_data_obj.rank, "count": frequency_data_obj.count, "freq": frequency_data_obj.freq}
        if data_index is None:
            frequency_data.append({"word": word, "data": [word_data]})
        else:
            # If the word already exists in frequency data,
            # just append the current year's data.
            frequency_data[data_index]["data"].append(word_data)
    # Sort all words datasets by year
    for word_data in frequency_data:
        word_data["data"].sort(key=lambda x: int(x["year"]))
    return frequency_data


def get_word_sentiment_data(sentiment_data):
    """ Extract the sentiment from sentiment data

        - @type sentiment_data:  array
        - @param sentiment_data: array of objects containing word, year and sentiment
        - @rtype sentiment_data: array
        - @return:               an array that contains an object for each word in
                                 sentiment_data. each word object has the word and an
                                 array with data for each year.

                                 'array' of 'object'[
                                        word: 'string',
                                        data: 'array' of object[
                                            year:  'int',
                                            sentiment:  'float',
                                        ]
                                 ]
    """
    new_sentiment_data = []

    for sentiment_obj in sentiment_data:
        word = sentiment_obj.word
        word_data = {"year": sentiment_obj.year, "sentiment": sentiment_obj.sentiment}
        data_index = get_index_by_value(new_sentiment_data, "word", word)
        if data_index is None:
            new_sentiment_data.append({"word": sentiment_obj.word, "data": [word_data]})
        else:
            # If the word already exists in frequency data,
            # just append the current year's data.
            new_sentiment_data[data_index]["data"].append(word_data)
    # Sort all words datasets by year
    for word_data in new_sentiment_data:
        word_data["data"].sort(key=lambda x: int(x["year"]))
    return new_sentiment_data


def extract_vectors(dict_list):
    """ Extract vectors from a list of dictionaries and add them to a dictionary with
        year range as the key

        - @type dict_list:     array
        - @param dict_list:    array containing objects
        - @rtype vector_data:  dictionary
        - @return vector_data: dictionary containing vectors accessible with
                               year range key e.g. 2000-2004
    """
    vector_data = {}
    for result in dict_list:
        vector_data_key = str(result["year_from"]) + "-" + str(result["year_to"])

        if not vector_data.get(vector_data_key, None):
            vector_data[vector_data_key] = [result["vectors"]]
        else:
            vector_data[vector_data_key].append(result["vectors"])
    return vector_data


def get_latent_association_data(year_from, year_to, construct_1, construct_2):
    """ Get the association between two contructs of words

        - @type year_from:                 int
        - @param year_from:                inclusive lower bound for data returned
        - @type year_to:                   int
        - @param year_to:                  inclusive upper bound for data returned
        - @type construct_1:               array
        - @param construct_1:              array of strings representing a concept
        - @type construct_2:               array
        - @param construct_2:              array of strings representing a concept
        - @rtype latent_association_data:  array
        - @return latent_association_data: an array od objects containing
                                           year range and association

                                  'array' of 'object'[
                                         year_range: 'string',
                                         association: 'float
                                  ]
    """
    latent_association_data = []

    construct_1_data = LatentAssociation.objects(
        word__in=construct_1, year_from__gte=year_from - 5, year_from__lte=year_to
    )

    construct_2_data = LatentAssociation.objects(
        word__in=construct_2, year_from__gte=year_from - 5, year_from__lte=year_to
    )

    construct_1_vecs = extract_vectors(construct_1_data)
    construct_2_vecs = extract_vectors(construct_2_data)

    year_ranges = sorted(
        construct_1_vecs.keys()
        if len(construct_1_vecs.keys()) > len(construct_2_vecs.keys())
        else construct_2_vecs.keys(),
        key=lambda x: int(x.split("-")[0]),
    )

    for year_range in year_ranges:
        year_range_vecs_1 = construct_1_vecs.get(year_range, None)
        year_range_vecs_2 = construct_2_vecs.get(year_range, None)
        if year_range_vecs_1 and year_range_vecs_2:
            latent_association_data.append(
                {
                    "year_range": year_range,
                    "association": dot(
                        matutils.unitvec(array(year_range_vecs_1).mean(axis=0)),
                        matutils.unitvec(array(year_range_vecs_2).mean(axis=0)),
                    ),
                }
            )
    return latent_association_data
