import os
from functools import reduce
from threading import Thread

from gensim.models import KeyedVectors


def is_potential_model(file):
    """ Checks if a given file is a potential model

        Returns false for hidden files, directories, and files that have a file extention

        - @type  file: string
        - @param file: path to a file
        - @rtype:      boolean
        - @return:     if file is a valid model
    """
    return not (file.lower().endswith("-example") or os.path.isdir(file) or "." in file)


def load_model(full_file_path):
    """ Tries to open the model at the given path and adds total word counts property

        Returns a Gensim KeyedVectors model

        - @type  full_file_path: string
        - @param full_file_path: path to a model
        - @rtype:                object
        - @return:               KeyedVector model
    """
    model = KeyedVectors.load(full_file_path, mmap="r")
    model.syn0norm = model.wv.syn0  # prevent recalc of normed vectors
    model.totalWordCount = reduce(
        lambda total, word: total + word.count, model.wv.vocab.values(), 0
    )
    return model


def load_and_add_model_to_models(path, model_name, models):
    """ Loads and adds a given model to the models dictionary

        Add new model to models dictionary

        - @type path:        string
        - @param path:       path to a model
        - @type model_name:  string
        - @param model_name: name to reference new model in models
        - @type models:      dictionary
        - @param models:     dictionary of models
    """
    models[str(model_name)] = load_model(os.path.join(path, model_name))


# pylint: disable=invalid-name
def load_models(path):
    """ Loads and returns all models in the given path as a dictionary

        Returns a dictionary of Gensim KeyedVectors models

        - @type path:  string
        - @param path: path to directory containing models
        - @rtype       dictionary
        - @return      dictionary of every model in path
    """
    # raise OSError if path is invalid or is a file

    if not os.path.exists(path):
        raise OSError("given path does not exist")
    if os.path.isfile(path):
        raise OSError("given path is not a folder")
    threads = []
    models = {}
    files = os.listdir(path)
    for file in files:
        # Only try open files that appear to be models
        if is_potential_model(os.path.join(path, file)):
            process = Thread(
                target=load_and_add_model_to_models, args=[path, file, models]
            )
            process.start()
            threads.append(process)
    for process in threads:
        process.join()
    if not models:
        raise OSError("No models were found in given path")
    return models
