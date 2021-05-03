const { Checkbox, ListItemIcon, ListItemSecondaryAction, ListItemText, Button, MenuItem } = MaterialUI;


const ProjectMenuItem = ({projectData, handleProjectsFilter, selectProject, selectedProjectIDs}) => {

    const handleSelectClick = () => {
        selectProject(projectData);
    }

    const handleToggleClick = () => {
        handleProjectsFilter(projectData['project_id'])
    }

    return (
        <MenuItem key={projectData['project_id']} dense button onClick={handleSelectClick}>
            <ListItemText 
            id={`project-checkbox-${projectData['project_id']}`} 
            primary={projectData['project_name']} />
            <ListItemSecondaryAction
            onClick={handleToggleClick}
            >
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    checked={selectedProjectIDs.has(projectData['project_id'])}
                    tabIndex={-1}
                    />
                </ListItemIcon>
            </ListItemSecondaryAction>
        </MenuItem>
    )
}