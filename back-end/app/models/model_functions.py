import os
from gensim.models import KeyedVectors
from functools import reduce


def isPotentialModel(file):
    '''
        Checks if a given file is a potential model
        Returns false for hidden files, directories, and files that have a file extention
    '''
    return not (file.lower().endswith('-example') or os.path.isdir(file) or '.' in file)


def loadModels(path):
    '''Loads and returns all models in the given path as a dictionary'''
    # raise OSError if path is invalid or is a file
    if not os.path.exists(path):
        raise OSError("given path does not exist")
    if os.path.isfile(path):
        raise OSError("given path is not a folder")
    models = {}
    files = os.listdir(path)
    for file in files:
        # Only try open files that appear to be models
        if isPotentialModel(path+file):
            # Try opening the model and add total word counts
            model = KeyedVectors.load(path+file, mmap='r')
            model.syn0norm = model.wv.syn0  # prevent recalc of normed vectors
            model.totalWordCount = reduce(
                lambda total, word: total+word.count, model.wv.vocab.values(), 0)
            models[str(file)] = model
    if len(models) == 0:
        raise OSError("No models were found in given path")
    return models
