const { useState } = React;
const { useHistory } = ReactRouterDOM;

const EditProject = ({projectTypes, updateProjectsData, projectsData}) => {
    let history = useHistory();
    const [projectData, setProjectData] = useState({
        project_id: '',
        project_name: '',
        project_description: '',
        project_type_id: ''
    });

    const { project_id, project_name, project_description, project_type_id } = projectData;

    const onChange = e => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        })
    };

    const onProjectChange = e => {
        const currentProject = projectsData.filter(project => project['project_id'] === e.target.value)
        setProjectData({
            project_id: currentProject['project_id'],
            project_name: currentProject['project_name'],
            project_description: currentProject['project_description'],
            project_type_id: currentProject['project_type_id']
        })
    }

    const updateProject = async () => {
        const newProject = {
            project_name: project_name,
            project_description: project_description,
            project_type_id: project_type_id
        }
        fetch(`http://localhost:5000/api/project/${currentProjectID}`, {
        method: 'PUT', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
        })
        .then(response => response.json())
        .then(data => {
            updateProjectsData(data['new_data']);
            history.push('/');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
        <Box>
        <div>
         <FormControl style={{minWidth: 200}}>
                    <InputLabel id="project-label">Project</InputLabel>
                    <Select
                    labelId="project-label"
                    value={project_id}
                    name="project_id"
                    onChange={e => onProjectChange(e)}
                    >
                    {projectsData.map((projectData, index) => 
                        <MenuItem 
                        key={index} 
                        value={projectData['project_id']}>
                            {projectData['project_name']}
                        </MenuItem>
                    )}
                    </Select>
                </FormControl>
            </div>
        <ProjectForm
        onSubmit={updateProject}
        project_name={project_name}
        project_description={project_description}
        project_type_id={project_type_id}
        projectTypes={projectTypes}
        onChange={onChange}
        >
        </ProjectForm>
        </Box>

    )
}