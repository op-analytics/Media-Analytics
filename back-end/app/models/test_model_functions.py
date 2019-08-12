import pytest
from app.models.model_functions import loadModels


class TestModelFunctions(object):
    def test_returns_a_dictionary(self):
        '''Test if loadModels Returns a dictionary'''
        models = loadModels('./')
        assert isinstance(models,dict)
