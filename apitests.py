from unittest import TestCase
from server import app
from flask import json

class TestProject(TestCase):
    """Flask tests."""

    def setUp(self):
        """Stuff to do before every test."""

        # Get the Flask test client
        self.client = app.test_client()
        app.secret_key = "dev"
        # Show Flask errors that happen during tests
        app.config['TESTING'] = True

    def test_create_project(self):
        result = self.client.post("/api/projects/7c51628b-ef40-4881-9d8c-6af53262ab9f",
                                  json={"project_name": "TEST_project_name",
                                        "project_description": "TEST_project_description",
                                        "project_type_id": "812fcc23-60ba-45d6-9ab6-99278209aa2b"})
        #data = result.get_json()
        print(result)
        #self.assertIn("message", data)
        #self.assertIn("success", data["message"])

    # def test_get_projects_list(self):
    #     result = self.client.get("/api/projects/7c51628b-ef40-4881-9d8c-6af53262ab9f")
    #     data = result.get_json()
    #     self.assertIn("TEST_project_name", data)

    # def test_update_project(self):
    #     result = self.client.put("/api/project/9ba1bcda-a21a-4203-8565-46937b9ffaad", 
    #                               json={"project_name": "Test Test"})
    #     data = result.get_json()
    #     self.assertIn("data", data)
    #     self.assertIn("Test Test", data["data"]["project_name"])

    
    # def test_delete_project(self):
    #     result = self.client.delete("/api/project/1ec037e5-b7bd-4f80-961a-3064e643e1c7")
    #     data = result.get_json()
    #     self.assertIn("message", data)
    #     self.assertIn("success", data.get("message"))

if __name__ == "__main__":
    import unittest

    unittest.main()