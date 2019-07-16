from pymongo import MongoClient


class MoviesDB:
    client = None

    def __init__(self):
        self.db = self.db_client.movies_app

    @property
    def db_client(self):
        if not self.client:
            self.client = MongoClient()
        return self.client
