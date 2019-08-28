import pytest

from app import create_app


class TestNLPRoutes(object):
    # Put any setup code in this method
    @classmethod
    def setup_class(self):
        self.app = create_app("config.Testing")
        self.prefix = "/timeline/"
        self.client = self.app.test_client()

    # Put any cleanup code in this method
    @classmethod
    def teardown_class(self):
        pass

    def test_frequecy_should_return_400_if_missing_items_in_body(self):
        self.client.post(
            self.prefix + "frequency", json={"word": "Jim"}
        ).status_code == 400

    def test_frequecy_should_return_202_if_given_all_params(self):
        assert (
            self.client.post(
                self.prefix + "frequency",
                json={"words": ["Jim"], "year_from": 1991, "year_to": 2000},
            ).status_code
            == 202
        )

    def test_frequecy_should_only_return_data_for_given_years(self):
        year_from = 1991
        year_to = 2000
        response = self.client.post(
            self.prefix + "frequency",
            json={"words": ["Jim"], "year_from": year_from, "year_to": year_to},
        ).get_json()
        assert all(
            int(item["year"]) >= year_from and int(item["year"] <= year_to)
            for item in response["data"][0]["data"]
        )

    def test_frequency_should_return_zeroed_values_for_words_that_dont_exist(self):
        year_from = 0
        year_to = 3000
        response = self.client.post(
            self.prefix + "frequency",
            json={"words": ["The"], "year_from": year_from, "year_to": year_to},
        ).get_json()
        assert response["data"][0]["data"][0]["rank"] == 0
        assert response["data"][0]["data"][0]["wordCount"] == 0
        assert response["data"][0]["data"][0]["wordFreq"] == 0

    def test_should_return_year_range_invalid_if_year_from_after_year_to(self):
        year_from = 2018
        year_to = 2017
        response = self.client.post(
            self.prefix + "frequency",
            json={"words": ["The"], "year_from": year_from, "year_to": year_to},
        ).get_json()

        assert "year_from" in response["messages"]
        assert "year_to" in response["messages"]
