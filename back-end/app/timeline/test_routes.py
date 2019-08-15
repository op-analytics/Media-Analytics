import pytest
from app import create_app


class TestNLPRoutes(object):
    # Put any setup code in this method
    @classmethod
    def setup_class(self):
        self.app = create_app('config.Testing')
        self.prefix = '/timeline/'
        self.client = self.app.test_client()

    # Put any cleanup code in this method
    @classmethod
    def teardown_class(self):
        pass

    def test_frequecy_should_return_404_if_missing_items_in_body(self):
        responseCode = self.client.post(self.prefix+'frequency',json={'word':"Jim"}).status_code
        assert responseCode == 400
