from flask import (Flask, jsonify, render_template, request, flash, session,
                   redirect)
from jinja2 import StrictUndefined
from model import connect_to_db
import crud
from datetime import datetime

app = Flask(__name__)

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def homepage():
    """View homepage."""
    is_logged_in = session.get('is_logged_in', False)
    if is_logged_in:
        projects = crud.get_projects_by_user_id(session['user_id'])
        entries = crud.get_entries_by_user_id(session['user_id'])
        return render_template('stats-page.html', 
            is_logged_in=is_logged_in, 
            projects=projects,
            entries=entries)
    else:
        return render_template('homepage.html', is_logged_in=is_logged_in )

@app.route('/login')
def login_page():
    """View login."""
    return render_template('login.html', message='Please log in!')

@app.route('/logout')
def logout():
    session.clear()
    return render_template('homepage.html', is_logged_in=False)

@app.route('/login', methods=['POST'])
def login():
    user_name = request.form.get('user_name')
    password = request.form.get('password')
    user = crud.get_user_by_user_name(user_name)
    msg = ''
    if user is not None:
        if user.password == password:
            session['user_id'] = user.user_id
            session['user_name'] = user.user_name
            return redirect('/')
        else:
            msg = 'Your password was incorrect.'
            return render_template('login.html', message=msg)
    else:
        msg = 'No user with that name found.'
        return render_template('login.html', message=msg)

@app.route('/new-project')
def new_project_page():
    if session.get('is_logged_in', False):
        project_types = crud.get_project_types()
        return render_template('new-project.html', project_types=project_types)
    else:
        return redirect('/')

@app.route('/new-project', methods=['POST'])
def add_new_project():
    user = crud.get_user_by_id(session['user_id'])
    project_type = crud.get_project_type_by_id(request.form.get('projectType'))
    project_name = request.form.get('projectName')
    project_description = request.form.get('projectDescription')
    project_create_date = datetime.now()

    crud.create_project(user=user, 
        project_type=project_type, 
        project_name=project_name, 
        project_description=project_description, 
        project_create_date=project_create_date)
    return redirect('/')

@app.route('/new-entry')
def new_entry_page():
    if session.get('is_logged_in', False):
        return render_template('new-entry.html')
    else:
        return redirect('/')
        
@app.route('/new-entry', methods=['POST'])
def add_new_entry():
    project = crud.get_project_by_id(request.form.get('projectSelect'))
    entry_type = crud.get_entry_type_by_id(request.form.get('entryType'))
    entry_note = request.form.get('entryNote')
    entry_words = request.form.get('entryWords')
    entry_minutes = request.form.get('entryMinutes')
    entry_datetime = datetime.now()

    crud.create_entry(project=project,
                entry_type=entry_type,
                entry_words=entry_words,
                entry_minutes=entry_minutes,
                entry_note=entry_note,
                entry_datetime=entry_datetime)
    return redirect('/')

@app.route('/api/projects')
def get_projects():
    db_projects = crud.get_projects()
    projects_list = []
    for project in db_projects:
        projects_list.append(project.to_dict())
    return jsonify(projects_list)

@app.route('/api/projects/<user_id>')
def get_projects_by_user(user_id):
    db_projects = crud.get_projects_by_user_id(user_id)
    projects_list = []
    for project in db_projects:
        projects_list.append(project.to_dict())
    return jsonify(projects_list)

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
