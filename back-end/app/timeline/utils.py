def get_index_by_value(object_list, key, value):
    return next(
        (index for (index, w) in enumerate(object_list) if w[key] == value), None
    )

# The frequency data for each word in words for the year range given.
def get_word_frequency_data(models, words, year_from, year_to):
    frequency_data = []
    for year, model in models.items():
        year = int(year)
        if year < year_from or year > year_to:
            continue
        for word in words:
            word_exists = word in model.wv.vocab
            word_count = model.wv.vocab[word].count if word_exists else 0
            word_data = {
                "year": year,
                "rank": model.wv.vocab[word].index + 1 if word_exists else 0,
                "count": word_count,
                "freq": (word_count / model.totalWordCount) * 100 if word_exists else 0,
            }
            # Get the index of the object containing the current word in frequencyData.
            data_index = get_index_by_value(frequency_data, "word", word)
            # If the word is not already in frequencyData.
            if data_index is None:
                frequency_data.append({"word": word, "data": [word_data]})
            else:
                # If the word already exists in frequency data, just append the current year's data.
                frequency_data[data_index]["data"].append(word_data)
    # Sort all words datasets by year
    for word_data in frequency_data:
        word_data["data"].sort(key=lambda x: int(x["year"]))
    return frequency_data

def get_word_sentiment_data(sentiment_data):

    new_sentiment_data = []

    for sentiment_obj in sentiment_data:
        word = sentiment_obj.word
        word_data = {"year": sentiment_obj.year, "sentiment": sentiment_obj.sentiment}
        data_index = get_index_by_value(new_sentiment_data, "word", word)
        if data_index == None:
            new_sentiment_data.append({"word": sentiment_obj.word, "data": [word_data]})
        else:
            # If the word already exists in frequency data, just append the current year's data.
            new_sentiment_data[data_index]["data"].append(word_data)
    # Sort all words datasets by year
    for wordData in new_sentiment_data:
        wordData["data"].sort(key=lambda x: int(x["year"]))
    return new_sentiment_data
