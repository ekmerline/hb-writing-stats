const { Checkbox, ListItemIcon, ListItemSecondaryAction, ListItemText, Button, MenuItem } = MaterialUI;


const ProjectMenuItem = ({projectData, handleProjectsFilter, selectProject, selectedProjectIDs, currentProject}) => {

    const handleSelectClick = () => {
        selectProject(projectData);
    }

    const handleToggleClick = () => {
        handleProjectsFilter(projectData['project_id'])
    }

    // const itemColor = () => {
    //     if(currentProject['project_id'] === projectData['project_id']){
    //         return 'primary.light';
    //     }
    //     return 'white'
    // }

    const classes = useStyles();

    return (
        <MenuItem key={projectData['project_id']} dense button onClick={handleSelectClick} className={classes.projectMenuItem}>
            <ListItemText 
            id={`project-checkbox-${projectData['project_id']}`} 
            primary={projectData['project_name']} />
            <ListItemSecondaryAction
            onClick={handleToggleClick}
            >
                <ListItemIcon styles={{minWidth: '0px'}}>
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