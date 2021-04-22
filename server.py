from flask import (Flask, jsonify, render_template, request, session,
                   redirect)
from jinja2 import StrictUndefined
from model import connect_to_db
import crud
from datetime import datetime
import json

app = Flask(__name__)

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def index():
    """View index."""
    return render_template('index.html')

@app.route('/login')
def login_redirect():
    """Redirect login"""
    return redirect('/')

@app.route('/new-entry')
def new_entry_redirect():
    """Redirect new entry"""
    return redirect('/')

@app.route('/new-project')
def new_project_redirect():
    """Redirect new project"""
    return redirect('/')
###  ENDPOINTS ####

### USER ###

@app.route('/api/login', methods=['POST'])
def login_user():
    """Logs user in."""
    login_data = json.loads(request.data)
    user_name = login_data['user_name']
    password = login_data['password']
    user = crud.get_user_by_user_name(user_name)
    if user is not None:
        if user.password == password:
            session['user_id'] = user.user_id
            #session['user_name'] = user.user_name
            return jsonify({'message': 'Success', 'user_id': f'{user.user_id}', 'user_name': f'{user.user_name}'})
        else:
            return jsonify({'message': 'Your password was incorrect.'})
    else:
        return jsonify({'message': 'No user was found with that name.'})

@app.route('/api/users', methods=['POST'])
def register_user():
    """Registers a new user."""
    user_data = json.loads(request.data)
    user = crud.create_user(user_data['user_name'], user_data['email'], user_data['password'])
    new_user = crud.get_user_by_id(user.user_id)
    if new_user:
        return jsonify({'message': 'Success', 'data': f'${new_user.to_dict()}'})
    else:
        return jsonify({'message': 'Error'})

@app.route('/api/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    """Updates user."""
    new_data = json.loads(request.data)
    updated_user = crud.update_user(user_id, new_data)
    return jsonify(updated_user.to_dict())

@app.route('/api/user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Deletes user."""
    return jsonify(crud.delete_user(user_id))


### PROJECT ###

@app.route('/api/projects')
def get_projects_by_user():
    """Gets list of projects for the logged in user."""
    db_projects = crud.get_projects_by_user_id(session['user_id'])
    projects_list = []
    for project in db_projects:
        projects_list.append(project.to_dict())
    return jsonify(projects_list)

@app.route('/api/project', methods=['POST'])
def add_project():
    """Creates a new project."""
    project_data = json.loads(request.data)
    user = crud.get_user_by_id(session['user_id'])
    #user = crud.get_user_by_id(user_id)
    project_type = crud.get_project_type_by_id(project_data['project_type_id'])
    if user and project_type:
        project = crud.create_project(user=user, 
            project_type=project_type, 
            project_name=project_data['project_name'], 
            project_description=project_data['project_description'], 
            project_create_date=datetime.now())
        return jsonify({'message': 'success', 'new_data': project.to_dict()})
    else:
        if not user and not project_type:
            return jsonify({'message': 'User and project_type not found.'})
        elif not project_type:
            return jsonify({'message': 'Project_type not found.'})
        else:
            return jsonify({'message': 'User not found.'})
    

@app.route('/api/project/<project_id>', methods=['PUT'])
def update_project(project_id):
    """Updates project."""
    new_data = json.loads(request.data)
    updated_project = crud.update_project(project_id, new_data)
    return jsonify(updated_project.to_dict())

@app.route('/api/project/<project_id>', methods=['DELETE'])
def delete_project(project_id):
    """Deletes project."""
    return jsonify(crud.delete_project(project_id))

### ENTRY ###

@app.route('/api/entry', methods=['POST'])
def add_entry():
    """Creates a new entry."""
    entry_data = request.get_json()
    new_entry = crud.create_entry(project_id=entry_data['project_id'],
                    entry_type_id=entry_data['entry_type_id'],
                    entry_words=entry_data['entry_words'],
                    entry_minutes=entry_data['entry_minutes'],
                    entry_note=entry_data['entry_note'],
                    entry_datetime=datetime.now())
    return new_entry

@app.route('/api/entries')
def get_entries_by_user():
    """Gets list of entries for the logged in usereturn jsonify({'message': 'Success!', 'new_data': project.to_dict()})r."""
    db_entries = crud.get_entries_by_user_id(session['user_id'])
    entries_list = []
    for entry in db_entries:
        entries_list.append(entry.to_dict())
    return jsonify(entries_list)

@app.route('/api/entry/<entry_id>', methods=['PUT'])
def update_entry(entry_id):
    """Updates entry."""
    new_data = json.loads(request.data)
    updated_entry = crud.update_entry(entry_id, new_data)
    return jsonify(updated_entry.to_dict())

@app.route('/api/entry/<entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    """Deletes entry."""
    crud.delete_entry(entry_id)

### ENTRY TYPE ###
@app.route('/api/entry-types')
def get_entry_types():
    """Gets list of entry types."""
    db_entry_types = crud.get_entry_types()
    entry_types_list = []
    for entry_type in db_entry_types:
        entry_types_list.append(entry_type.to_dict())
    return jsonify(entry_types_list)

@app.route('/api/entry-type', methods=['POST'])
def add_entry_type():
    """Add a new entry type."""
    entry_type_data = json.loads(request.data)
    crud.create_entry_type(entry_type_data['entry_type_name'])
    return jsonify({'message': 'Success!'})

@app.route('/api/entry_type/<entry_type_id>', methods=['PUT'])
def update_entry_type(entry_type_id):
    """Updates entry_type."""
    new_data = json.loads(request.data)
    updated_entry_type = crud.update_entry_type(entry_type_id, new_data)
    return jsonify(updated_entry_type.to_dict())

@app.route('/api/entry_type/<entry_type_id>', methods=['DELETE'])
def delete_entry_type(entry_type_id):
    """Deletes entry_type."""
    return jsonify(crud.delete_entry_type(entry_type_id))

### PROJECT TYPE ###
@app.route('/api/project-types')
def get_projects_types():
    """Gets list of project types."""
    db_project_types = crud.get_project_types()
    project_types_list = []
    for project_type in db_project_types:
        project_types_list.append(project_type.to_dict())
    return jsonify(project_types_list)

@app.route('/api/project-type', methods=['POST'])
def add_project_type():
    """Add a new project type."""
    project_type_data = json.loads(request.data)
    crud.create_project_type(project_type_data['project_type_name'])
    return jsonify({'message': 'Success!'})

@app.route('/api/project_type/<project_type_id>', methods=['PUT'])
def update_project_type(project_type_id):
    """Updates project_type."""
    new_data = json.loads(request.data)
    updated_project_type = crud.update_project_type(project_type_id, new_data)
    return jsonify(updated_project_type.to_dict())

@app.route('/api/project_type/<project_type_id>', methods=['DELETE'])
def delete_project_type(project_type_id):
    """Deletes project_type."""
    return jsonify(crud.delete_project_type(project_type_id))

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
    session.clear()
