const { useState } = React;


const EditProject = ({projectTypes, updateProjectsData, currentProject, handlePanelChange}) => {

    const [projectData, setProjectData] = useState({
        project_id: currentProject['project_id'],
        project_name: currentProject['project_name'],
        project_description: currentProject['project_description'],
        project_type_id: currentProject['project_type_id']
    });

    const { project_id, project_name, project_description, project_type_id } = projectData;

    const onChange = e => {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        })
    };

    const updateProject = async () => {
        const newProject = {
            project_name: project_name,
            project_description: project_description,
            project_type_id: project_type_id
        }
        fetch(`http://localhost:5000/api/project/${project_id}`, {
        method: 'PUT', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
        })
        .then(response => response.json())
        .then(data => {
            updateProjectsData(data['data']);
            handlePanelChange(panels.PROJECTDATA);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
        <Box>
            <ProjectForm
            onSubmit={updateProject}
            project_name={project_name}
            project_description={project_description}
            project_type_id={project_type_id}
            projectTypes={projectTypes}
            onChange={onChange}
            buttonText={"Save Edits"}
            >
            </ProjectForm>
        </Box>
    )
}