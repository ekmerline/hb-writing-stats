const { useState } = React;
const { useHistory } = ReactRouterDOM;

const CreateProject = ({projectTypes, updateProjects}) => {
    let history = useHistory();
    const [projectData, setProjectData] = useState({
        project_name: '',
        project_description: '',
        project_type_id: ''
    });

    const { project_name, project_description, project_type_id } = projectData;

    const onChange = e => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        })
    };

    const createNewProject = async () => {
        const newProject = {
            project_name: project_name,
            project_description: project_description,
            project_type_id: project_type_id
        }
        fetch('http://localhost:5000/api/project', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
        })
        .then(response => response.json())
        .then(data => {
            updateProjects(data['new_data']);
            history.push('/');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
        <ProjectForm
        onSubmit={createNewProject}
        project_name={project_name}
        project_description={project_description}
        project_type_id={project_type_id}
        projectTypes={projectTypes}
        onChange={onChange}
        >
        </ProjectForm>
    )
}