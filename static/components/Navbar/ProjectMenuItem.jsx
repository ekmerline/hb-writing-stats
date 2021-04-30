const { Checkbox, ListItemIcon, ListItemSecondaryAction, ListItemText, Button, MenuItem } = MaterialUI;
const { useHistory } = ReactRouterDOM;

const ProjectMenuItem = ({projectData, handleToggle, selectProject, selectedProjectIDs, deleteProject}) => {
    let history = useHistory();

    const handleEditClick = () => {
        selectProject(projectData);
        history.push('/edit-project');
    }

    const handleToggleClick = () => {
        handleToggle(projectData['project_id'])
    }

    const handleDeleteClick = () => {
        fetch(`http://localhost:5000/api/project/${projectData['project_id']}`, {
            method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                deleteProject(data['data']);
                history.push('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });;
    }
    return (
        <MenuItem key={projectData['project_id']} dense button onClick={handleToggleClick}>
            <ListItemIcon>
                <Checkbox
                edge="start"
                checked={selectedProjectIDs.has(projectData['project_id'])}
                tabIndex={-1}
                />
            </ListItemIcon>
            <ListItemText id={`project-checkbox-${projectData['project_id']}`} primary={projectData['project_name']} />
            <ListItemSecondaryAction>
                <Button edge="end" aria-label="edit" onClick={handleEditClick}>
                    <span>Edit</span>
                </Button>
                <Button edge="end" aria-label="edit" onClick={handleDeleteClick}>
                    <span>Delete</span>
                </Button>
            </ListItemSecondaryAction>
        </MenuItem>
    )
}