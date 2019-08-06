import pytest
from app import app


class TestNLPRoutes(object):
    @classmethod
    def setup_class(self):
        self.app = app
        self.prefix = '/nlp/'
        self.client = self.app.test_client()

    @classmethod
    def teardown_class(self):
        pass

    def test_index_route_returns_nlp(self):
        response = self.client.get(self.prefix).get_json()
        assert 'nlp' in response['message']
