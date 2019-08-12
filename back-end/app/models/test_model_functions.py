import pytest
from app.models.model_functions import loadModels


class TestModelFunctions(object):
    def test_model_functions_returns_a_dictionary_when_given_a_valid_path(self):
        '''Test if loadModels Returns a dictionary'''
        models = loadModels('./')
        assert isinstance(models,dict)
