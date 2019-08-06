import pytest
from app import app


class TestNLPRoutes(object):
    # Put any setup code in this method
    @classmethod
    def setup_class(self):
        self.app = app
        self.prefix = '/nlp/'
        self.client = self.app.test_client()

    # Put any cleanup code in this method
    @classmethod
    def teardown_class(self):
        pass

    # Tests if the message returned from the nlp index contains the string nlp
    def test_index_route_returns_nlp(self):
        response = self.client.get(self.prefix).get_json()
        assert 'nlp' in response['message']
