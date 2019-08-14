import os


def loadModels(path):
    '''Loads and returns all models in the given path as a dictionary'''
    # raise OSError if path is invalid
    if not os.path.exists(path):
        raise OSError("given path %s does not exist" % path)
    return {
        "ohno": 1
    }
