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
        responseCode = self.client.post(
            self.prefix+'frequency', json={'word': "Jim"}).status_code
        assert responseCode == 400

    def test_frequecy_should_return_202_if_given_all_params(self):
        responseCode = self.client.post(
            self.prefix+'frequency',
            json={
                'word': "Jim",
                'year_from': '1991',
                'year_too': '2000'
            }
        ).status_code
        assert responseCode == 202
