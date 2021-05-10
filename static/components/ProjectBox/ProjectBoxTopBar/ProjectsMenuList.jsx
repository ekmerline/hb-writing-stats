const { useState } = React;
const {  Button, Menu, Box } = MaterialUI;

const ProjectsMenuList = ({
    projectsData, 
    handleProjectsFilter, 
    selectProject, 
    selectedProjectIDs, 
    currentProject,
    handleProjectsFillerAll
}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    return (
    <Box component="span" flexGrow={1}>
        <Button 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick}
        >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/></svg>
        </Button>
        <Box component="span" >{currentProject['project_name']}</Box>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
        <Box>
        <MenuItem dense button onClick={() => handleProjectsFillerAll(true)} className={classes.projectMenuItem}>
            <ListItemText 
            id={`checkProjects`} 
            primary={"Check All"} />
        </MenuItem>
        </Box>
        <Box>
        <MenuItem dense button onClick={() => handleProjectsFillerAll(false)} className={classes.projectMenuItem}>
            <ListItemText 
            id={`uncheckProjects`} 
            primary={"Uncheck All"} />
        </MenuItem>
        </Box>
            {projectsData.map((projectData) => (
                <Box
                key={projectData['project_id']}
                >
                    <ProjectMenuItem
                    selectedProjectIDs={selectedProjectIDs}
                    selectProject={selectProject}
                    handleProjectsFilter={handleProjectsFilter}
                    projectData={projectData}
                    currentProject={currentProject}
                    />
                </Box>

                ))}
        </Menu>
    </Box>
    )
}

