import pytest
from gensim.models import Word2Vec
from app.models.model_functions import loadModels
import unittest.mock as mock


class TestModelFunctions(object):
    @mock.patch('app.models.model_functions.os.path.exists', return_value=False)
    def test_should_throw_an_error_given_a_path_that_doesnt_exist(self, *args, **kwargs):
        with pytest.raises(OSError, match='given path does not exist'):
            loadModels('')

    @mock.patch('app.models.model_functions.os.path.exists', return_value=True)
    @mock.patch('app.models.model_functions.os.path.isfile', return_value=True)
    def test_should_throw_an_error_given_a_path_is_a_file(self, *args, **kwargs):
        with pytest.raises(OSError, match='given path is not a folder'):
            loadModels('')

    @mock.patch('app.models.model_functions.os.path.exists', return_value=True)
    @mock.patch('app.models.model_functions.os.path.isfile', return_value=False)
    @mock.patch('app.models.model_functions.os.listdir')
    def test_should_throw_an_error_when_given_path_has_no_models(self, mock_listdir, *args, **kwargs):
        mock_listdir.return_value = [
            'notamodel.py', 'notamodel-example', 'notamodel.xml', '.gitignore']
        with pytest.raises(OSError, match='No models were found in given path'):
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
