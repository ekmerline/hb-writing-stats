from model import db, User, Project, Entry, Project_Type, Entry_Type, connect_to_db
import logging
from sqlalchemy.exc import SQLAlchemyError

logger = logging.getLogger(__name__)

### USER ###
def create_user(user_name, email, password):
    try:
        user = User(user_name=user_name, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        new_user = User.query.filter(User.user_name == user_name).first()
        return {"message": "succcess", "data": {"user_id": f"{new_user.user_id}", "user_name": f"{new_user.user_name}"}}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Delete failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}

def get_users():
    return User.query.all()

def get_user_by_id(user_id):
    try:
        user = User.query.get(user_id)
        {"message": "succcess", "data": user.to_dict()}
    except SQLAlchemyError as e:
        return {"message": "error", "data": {"exception": str(e)}}

def get_user_by_user_name(user_name):
    try:
        return User.query.filter(User.user_name == user_name).first()
    except SQLAlchemyError as e:
        return {"message": "error", "data": {"exception": str(e)}}

def update_user(user_id, new_data):
    try:
        User.query.filter_by(user_id=user_id).update(new_data)
        db.session.commit()
        return {"message": "succcess", "data": User.query.get(user_id).to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Update failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}


def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        for project in user.projects:
            for entry in project.entries:
                db.session.delete(entry)
            db.session.delete(project)
        db.session.delete(user)
        db.session.commit()
        return {"message": "succcess", "data": user.to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Delete failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}

### PROJECT ###
def create_project(user, project_type, project_name, project_description, project_create_date):
    try:
        project = Project(user=user,
                    project_type=project_type,
                    project_name=project_name,
                    project_description=project_description,
                    project_create_date=project_create_date)

        db.session.add(project)
        db.session.commit()
        return {"message": "succcess", "data": project.to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Create project failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}


def get_project_by_id(project_id):
    try:
        return {"message": "succcess", "data": Project.query.get(project_id).to_dict()}
    except SQLAlchemyError as e:
        logger.error(f"Get project by id failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}

def get_projects_by_user_id(user_id):
    try:
        projects = Project.query.filter(Project.user_id == user_id).all()
        latest_entry = Entry.query.filter(Entry.project.has(user_id = user_id)).order_by(Entry.entry_datetime.desc()).first()
        projects_list = []
        for project in projects:
            if project.project_id == latest_entry.project_id:
                projects_list.insert(0, project.to_dict())
            else:
                projects_list.append(project.to_dict())
        return projects_list
    except SQLAlchemyError as e:
        logger.error(f"Get projects by uer id failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}

def update_project(project_id, new_data):
    try:
        Project.query.filter_by(project_id=project_id).update(new_data)
        db.session.commit()
        return {"message": "succcess", "data": Project.query.get(project_id).to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Update project failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}

def delete_project(project_id):
    try:
        project = Project.query.get(project_id)
        for entry in project.entries:
            db.session.delete(entry)
        db.session.delete(project)
        db.session.commit()
        return {"message": "succcess", "data": project.to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Delete project failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}

### ENTRY ###

def get_entry_by_id(entry_id):
    try:
        return {"message": "succcess", "data": Entry.query.get(entry_id).to_dict()}
    except SQLAlchemyError as e:
        return {"message": "error", "data": {"exception": str(e)}}

def get_entries_by_user_id(user_id):
    try:
        entries = Entry.query.filter(Entry.project.has(user_id = user_id)).order_by(Entry.entry_datetime.desc()).all()
        entries_list = []
        for entry in entries:
            entries_list.append(entry.to_dict())
        return entries_list
    except SQLAlchemyError as e:
        return {"message": "error", "data": {"exception": str(e)}}

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
    try:
        Entry.query.filter_by(entry_id=entry_id).update(new_data)
        db.session.commit()
        return {"message": "success", "data": Entry.query.get(entry_id).to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Create failed. Exception: {e}")
        return {"message": "error", "data": {"exception": str(e)}}
    

def delete_entry(entry_id):
    try:
        entry = Entry.query.get(entry_id)
        db.session.delete(entry)
        db.session.commit()
        return {"message": "success", "data": entry.to_dict()}
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f'Delete failed. Exception: {e}')
        return {"message": "error", "data": {"exception": str(e)}}


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