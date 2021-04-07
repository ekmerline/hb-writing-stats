from flask import (Flask, jsonify, render_template, request, flash, session,
                   redirect)
from jinja2 import StrictUndefined
from model import connect_to_db
import crud

app = Flask(__name__)

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def homepage():
    """View homepage."""
    return render_template('homepage.html', message='Welcome!')

@app.route('/login')
def login_page():
    """View login."""
    return render_template('login.html', message='Please log in!')

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
