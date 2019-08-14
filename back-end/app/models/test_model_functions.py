import pytest
import string
import secrets
import os
from random import *
from app.models.model_functions import loadModels


class TestModelFunctions(object):
    def test_returns_a_dictionary(self):
        models = loadModels('./')
        assert isinstance(models, dict)

    def test_should_throw_an_error_given_a_path_that_doesnt_exist(self):
        # Create random path
        path = ''
        allchar = string.ascii_letters + string.punctuation + string.digits
        while os.path.exists(path):
            path = '/'+"".join(choice(allchar)
                               for x in range(randint(3, 8)))
        # Test OSError is raised when given an invalid path
        with pytest.raises(OSError):
            models = loadModels(path)

    def test_should_throw_an_error_given_a_path_is_a_file(self):
        # Get random file from files in current dir
        file = secrets.choice([f for f in os.listdir('.') if os.path.isfile(f)])
        # Test OSError is raised when given a file for a path
        with pytest.raises(OSError):
            models = loadModels(file)
