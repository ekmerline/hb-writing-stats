import unittest
import server
from model import db, connect_to_db
from seeddatabase import example_data
import os

class FlaskTests(unittest.TestCase):

    def setUp(self):
        """Code to run before every test."""

        self.client = server.app.test_client()
        server.app.config['TESTING'] = True

        os.system('dropdb testdbwriting')
        os.system('createdb testdbwriting')

        # Connect to test database
        connect_to_db(server.app, "postgresql:///testdbwriting")

        # Create tables and add sample data
        db.create_all()
        example_data()

    def test_homepage(self):
        """Can we reach the homepage?"""

        result = self.client.get("/")
        self.assertIn(b"Welcome to Writing Stats!", result.data)

    def test_not_logged_in(self):
        """Does login show for users who aren't logged in?"""

        result = self.client.get("/")
        self.assertIn(b"Login", result.data)




if __name__ == "__main__":
    unittest.main()
