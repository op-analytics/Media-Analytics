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

    def test_frequecy_should_return_400_if_missing_items_in_body(self):
        responseCode = self.client.post(
            self.prefix+'frequency', json={'word': "Jim"}).status_code
        assert responseCode == 400

    def test_frequecy_should_return_202_if_given_all_params(self):
        responseCode = self.client.post(
            self.prefix+'frequency',
            json={
                'word': "Jim",
                'year_from': 1991,
                'year_to': 2000
            }
        ).status_code
        assert responseCode == 202

    def test_frequecy_should_only_return_data_for_given_years(self):
        data_only_for_given_years = True
        year_from = 1991
        year_to = 2000
        response = self.client.post(
            self.prefix+'frequency',
            json={
                'word': "Jim",
                'year_from': year_from,
                'year_to': year_to
            }
        ).get_json()
        for item in response['data']:
            if(int(item['year']) < year_from or int(item['year']) > year_to):
                data_only_for_given_years = False
        assert data_only_for_given_years

    def test_frequency_should_return_zeroed_values_for_words_that_dont_exist(self):
        year_from = 2018
        year_to = 2018
        response = self.client.post(
            self.prefix+'frequency',
            json={
                'word': "The",
                'year_from': year_from,
                'year_to': year_to
            }
        ).get_json()
        # TODO: Change to multiple assert?
        assert response['data'][0]['rank'] == 0

    def test_should_return_years_invalid_if_year_from_after_year_to(self):
        year_from = 2018
        year_to = 2017
        response = self.client.post(
            self.prefix+'frequency',
            json={
                'word': "The",
                'year_from': year_from,
                'year_to': year_to
            }
        ).get_json()

        assert 'year_from' in response['messages'] and 'year_to' in response['messages']
