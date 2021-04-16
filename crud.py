from model import db, User, Project, Entry, Project_Type, Entry_Type, connect_to_db
import logging
from sqlalchemy.exc import SQLAlchemyError

logger = logging.getLogger(__name__)

### USER ###
def create_user(user_name, email, password):

    user = User(user_name=user_name, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user

def get_users():
    return User.query.all()

def get_user_by_id(user_id):
    return User.query.get(user_id)

def get_user_by_user_name(user_name):
    return User.query.filter(User.user_name == user_name).first()

def update_user(user_id, new_data):
    User.query.filter_by(user_id=user_id).update(new_data)
    db.session.commit()
    return User.query.get(user_id)

def delete_user(user_id):
    user = User.query.get(user_id)
    for project in user.projects:
        for entry in project.entries:
            db.session.delete(entry)
        db.session.delete(project)
    db.session.delete(user)
    db.session.commit()
    return User.query.get(user_id)
    

### PROJECT ###
def create_project(user, project_type, project_name, project_description, project_create_date):

    project = Project(user=user,
                  project_type=project_type,
                  project_name=project_name,
                  project_description=project_description,
                  project_create_date=project_create_date)

    db.session.add(project)
    db.session.commit()

    return project

def get_projects():
    return Project.query.all()

def get_project_by_id(project_id):
    return Project.query.get(project_id)

def get_projects_by_user_id(user_id):
    return Project.query.filter(Project.user_id == user_id).all()

def update_project(project_id, new_data):
    Project.query.filter_by(project_id=project_id).update(new_data)
    db.session.commit()
    return Project.query.get(project_id)

def delete_project(project_id):
    project = Project.query.get(project_id)
    for entry in project.entries:
        db.session.delete(entry)
    db.session.delete(project)
    db.session.commit()
    return Project.query.get(project_id)


### ENTRY ###

def get_entries():
    return Entry.query.all()

def get_entry_by_id(entry_id):
    return Entry.query.get(entry_id)

def get_entries_by_user_id(user_id):
    return Entry.query.filter(Entry.project.has(user_id = user_id)).order_by(Entry.entry_datetime.desc()).all()

def get_entries_by_project_id(project_id):
    return Entry.query.filter(Entry.project_id == project_id).all()

def create_entry(project_id, entry_type_id, entry_words, entry_minutes, entry_note, entry_datetime):

    try:
        project = get_project_by_id(project_id)
        entry_type = get_entry_type_by_id(entry_type_id)
        entry = Entry(project=project,
                    entry_type=entry_type,
                    entry_words=entry_words,
                    entry_minutes=entry_minutes,
                    entry_note=entry_note,
                    entry_datetime=entry_datetime)
        db.session.add(entry)
        db.session.commit()
        return {"message": "success", "data": entry.to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Create failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}

def update_entry(entry_id, new_data):
    Entry.query.filter_by(entry_id=entry_id).update(new_data)
    db.session.commit()
    return Entry.query.get(entry_id)

def delete_entry(entry_id):
    try:
        entry = Entry.query.get(entry_id)
        db.session.delete(entry)
        db.session.commit()
        return {"message": "success", "data": entry.to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f'Delete failed. Exception: {e}')
        return {"message": "error", "data": entry.to_dict()}


### PROJECT TYPE ###
def create_project_type(project_type_name):

    project_type = Project_Type(project_type_name=project_type_name)

    db.session.add(project_type)
    db.session.commit()

    return project_type

def get_project_types():
    return Project_Type.query.all()

def get_project_type_by_id(project_type_id):
    return Project_Type.query.get(project_type_id)

def update_project_type(project_type_id, new_data):
    Project_Type.query.filter_by(project_type_id=project_type_id).update(new_data)
    db.session.commit()
    return Project_Type.query.get(project_type_id)

def delete_project_type(project_type_id):
    project_type = Project_Type.query.get(project_type_id)
    print(db.session.delete(project_type))
    db.session.commit()


### ENTRY TYPE ###
def create_entry_type(entry_type_name):

    entry_type = Entry_Type(entry_type_name=entry_type_name)

    db.session.add(entry_type)
    db.session.commit()

    return entry_type

def get_entry_types():
    return Entry_Type.query.all()

def get_entry_type_by_id(entry_type_id):
    return Entry_Type.query.get(entry_type_id)

def update_entry_type(entry_type_id, new_data):
    Entry_Type.query.filter_by(entry_type_id=entry_type_id).update(new_data)
    db.session.commit()
    return Entry_Type.query.get(entry_type_id)

def delete_entry_type(entry_type_id):
    entry_type = Entry_Type.query.get(entry_type_id)
    db.session.delete(entry_type)
    db.session.commit()
    return Entry_Type.query.get(entry_type_id)

if __name__ == '__main__':
    from server import app
    connect_to_db(app)