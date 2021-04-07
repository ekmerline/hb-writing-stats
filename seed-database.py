import os
from datetime import datetime
import math
import crud
import model
import server

os.system('dropdb testwritingstats')
os.system('createdb testwritingstats')

model.connect_to_db(server.app)
model.db.create_all()

seed_users = [
    {
        'user_name': 'HatCat',
        'email': 'hatcat@catmail.net',
        'password': 'meowmeowmeow'
    },
    {
        'user_name': 'SquirrelWhirl',
        'email': 'whoosh@acornmail.net',
        'password': 'digfrolicclimb'
    }
]

seed_project_types = ['fiction', 'nonfiction']

seed_entry_types = ['writing', 'editing', 'planning']

seed_quantity_types = ['words', 'minutes', 'pages']

seed_projects = [
    {
        'project_name': 'Super Awesome Novel',
        'project_description': 'My exceptional work of literature.',
        'project_create_date': datetime(2020, 5, 17, 10, 30)
    },
    {
        'project_name': 'Mediocre Blog Post',
        'project_description': "It's a living.",
        'project_create_date': datetime(2020, 4, 1, 17, 30)
    },
    {
        'project_name': 'Spiffy Short Story',
        'project_description': "My best work yet!",
        'project_create_date': datetime(2020, 1, 1, 13, 15)
    }
]

seed_entries = [
    {
        'entry_quantity': 500,
        'entry_note': 'Did some great work',
        'entry_datetime': datetime(2021, 1, 1, 13, 15)
    },
    {
        'entry_quantity': 100,
        'entry_note': 'Awesome job.',
        'entry_datetime': datetime(2021, 3, 1, 11, 10)
    },
    {
        'entry_quantity': 50,
        'entry_note': 'Not quite what I wanted.',
        'entry_datetime': datetime(2021, 4, 1, 9, 0)
    },
    {
        'entry_quantity': 200,
        'entry_note': 'Fix later.',
        'entry_datetime': datetime(2021, 2, 12, 14, 45)
    },
    {
        'entry_quantity': 70,
        'entry_note': 'Uhhhh',
        'entry_datetime': datetime(2021, 1, 16, 19, 11)
    },
    {
        'entry_quantity': 65,
        'entry_note': 'Winning!',
        'entry_datetime': datetime(2021, 4, 6, 10, 0)
    }
]

users_in_db = []
quantity_types_in_db = []
entry_types_in_db = []
project_types_in_db = []

for user in seed_users:
    db_user = crud.create_user(
        user['user_name'],
        user['email'],
        user['password']
    )
    users_in_db.append(db_user)

for project_type in seed_project_types:
    db_project_type = crud.create_project_type(project_type)
    project_types_in_db.append(db_project_type)

for entry_type in seed_entry_types:
    db_entry_type = crud.create_entry_type(entry_type)
    entry_types_in_db.append(db_entry_type)

for quantity_type in seed_quantity_types:
    db_quantity_type = crud.create_quantity_type(quantity_type)
    quantity_types_in_db.append(db_quantity_type)


db_project1 = crud.create_project(
    users_in_db[0],
    project_types_in_db[0],
    seed_projects[0]['project_name'],
    seed_projects[0]['project_description'],
    seed_projects[0]['project_create_date']
    )
db_project2 = crud.create_project(
    users_in_db[1],
    project_types_in_db[1],
    seed_projects[1]['project_name'],
    seed_projects[1]['project_description'],
    seed_projects[1]['project_create_date']
    )
db_project3 = crud.create_project(
    users_in_db[0],
    project_types_in_db[0],
    seed_projects[2]['project_name'],
    seed_projects[2]['project_description'],
    seed_projects[2]['project_create_date']
    )

projects_in_db = [db_project1, db_project2, db_project3]

for i in range(len(seed_entries)):
    crud.create_entry(
        projects_in_db[math.floor(i/2)],
        entry_types_in_db[math.floor(i/2)],
        quantity_types_in_db[math.floor(i/2)],
        seed_entries[i]['entry_quantity'],
        seed_entries[i]['entry_note'],
        seed_entries[i]['entry_datetime']
    )