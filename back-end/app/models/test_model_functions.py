import pytest
from gensim.models import Word2Vec
from app.models.model_functions import loadModels
import unittest.mock as mock


class TestModelFunctions(object):
    @mock.patch('app.models.model_functions.os.path')
    def test_should_throw_an_error_given_a_path_that_doesnt_exist(self, mock_path):
        mock_path.exists.return_value = False
        with pytest.raises(OSError):
            loadModels('')

    @mock.patch('app.models.model_functions.os.path')
    def test_should_throw_an_error_given_a_path_is_a_file(self, mock_path):
        # Test OSError is raised when given a file for a path
        mock_path.exists.return_value = True
        mock_path.isfile.return_value = True
        with pytest.raises(OSError):
            loadModels('')

    @mock.patch('app.models.model_functions.os.path')
    @mock.patch('app.models.model_functions.os.listdir')
    def test_should_throw_an_error_when_given_path_has_no_models(self, mock_listdir, mock_path):
        mock_listdir.return_value = [
            'notamodel.py', 'notamodel-example', 'notamodel.xml', '.gitignore']
        mock_path.exists.return_value = True
        mock_path.isfile.return_value = False
        with pytest.raises(OSError):
            loadModels('')

    @mock.patch('app.models.model_functions.os.path.exists', return_value=True)
    @mock.patch('app.models.model_functions.os.path.isfile', return_value=False)
    @mock.patch('app.models.model_functions.os.path.isdir', return_value=False)
    @mock.patch('app.models.model_functions.os.listdir', return_value=['1991'])
    @mock.patch('app.models.model_functions.KeyedVectors.load')
    def test_should_return_a_dictionary_of_models(self, mock_load_keyedvectors, *args, **kwargs):
        mock_load_keyedvectors.return_value = Word2Vec([['first', 'sentence'], [
                                                       'second', 'sentence']], min_count=1, batch_words=0.1, workers=1)
        models = loadModels('')
        assert all(isinstance(model, Word2Vec) for model in models.values())
