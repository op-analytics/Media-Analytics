import pytest
import string
from gensim.models import Word2Vec
import secrets
import os
from random import randint, choice
from app.models.model_functions import loadModels
import unittest.mock as mock


class TestModelFunctions(object):
    @mock.patch('app.models.model_functions.os.path')
    def test_should_throw_an_error_given_a_path_that_doesnt_exist(self,mock_path):
        # Test OSError is raised when given an invalid path
        mock_path.exists.return_value = False
        with pytest.raises(OSError):
          loadModels('')

    @mock.patch('app.models.model_functions.os.path')
    def test_should_throw_an_error_given_a_path_is_a_file(self,mock_path):
        # Test OSError is raised when given a file for a path
        mock_path.isfile.return_value = True
        with pytest.raises(OSError):
            loadModels('')

    @mock.patch('app.models.model_functions.os.listdir')
    def test_should_throw_an_error_when_given_path_has_no_models(self,mock_listdir):
        mock_listdir.return_value = [
            'notamodel.py', 'notamodel-example', 'notamodel.xml', '.gitignore']
        with pytest.raises(OSError):
          loadModels('')

    # TODO: Find a way to mock models used here
    # MAYBE: create an array of files using mock open called years holding a numpy array Use MOCK_OPEN and copy small models contents to be used as files read data
    def test_should_return_a_dictionary_of_models_given_a_valid_path_from_env(self):
        models = loadModels(os.environ['TIMELINE_MODELS_DIR'])
        assert all(isinstance(model, Word2Vec) for model in models.values())
