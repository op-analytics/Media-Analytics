import unittest.mock as mock

import pytest
from gensim.models import Word2Vec

from app.models.model_functions import load_models


class TestModelFunctions:
    @mock.patch("app.models.model_functions.os.path.exists", return_value=False)
    def test_should_throw_an_error_given_a_path_that_doesnt_exist(self, *_, **__):
        with pytest.raises(OSError, match="given path does not exist"):
            load_models("")

    @mock.patch("app.models.model_functions.os.path.exists", return_value=True)
    @mock.patch("app.models.model_functions.os.path.isfile", return_value=True)
    def test_should_throw_an_error_given_a_path_that_is_a_file(self, *_, **__):
        with pytest.raises(OSError, match="given path is not a folder"):
            load_models("")

    @mock.patch("app.models.model_functions.os.path.exists", return_value=True)
    @mock.patch("app.models.model_functions.os.path.isfile", return_value=False)
    @mock.patch("app.models.model_functions.os.listdir")
    def test_should_throw_an_error_when_given_path_has_no_models(
        self, mock_listdir, *_, **__
    ):
        mock_listdir.return_value = [
            "notamodel.py",
            "notamodel-example",
            "notamodel.xml",
            ".gitignore",
        ]
        with pytest.raises(OSError, match="No models were found in given path"):
            load_models("")

    @mock.patch("app.models.model_functions.os.path.exists", return_value=True)
    @mock.patch("app.models.model_functions.os.path.isfile", return_value=False)
    @mock.patch("app.models.model_functions.os.path.isdir", return_value=False)
    @mock.patch("app.models.model_functions.os.listdir", return_value=["1991"])
    @mock.patch("app.models.model_functions.KeyedVectors.load")
    def test_should_return_a_dictionary_of_models(
        self, mock_load_keyedvectors, *_, **__
    ):
        mock_load_keyedvectors.return_value = Word2Vec(
            [["first", "sentence"], ["second", "sentence"]],
            min_count=1,
            batch_words=0.1,
            workers=1,
        )
        models = load_models("")
        assert all(isinstance(model, Word2Vec) for model in models.values())
