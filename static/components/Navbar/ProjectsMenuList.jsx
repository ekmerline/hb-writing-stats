

const ProjectMenuItem = ({}) => {
    return (
        <MenuItem key={projectData['project_id']} dense button onClick={() => handleToggle(projectData['project_id'])}>
            <ListItemIcon>
                <Checkbox
                edge="start"
                checked={selectedProjectIDs.has(projectData['project_id'])}
                tabIndex={-1}
                />
            </ListItemIcon>
            <ListItemText id={`project-checkbox-${projectData['project_id']}`} primary={projectData['project_name']} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => selectedProjectEdit(projectData['project_id'])}>
                    <span>Edit</span>
                </IconButton>
            </ListItemSecondaryAction>
        </MenuItem>
    )
}