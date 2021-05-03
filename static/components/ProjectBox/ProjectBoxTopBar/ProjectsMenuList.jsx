const { useState } = React;
const {  Button, Menu, Box } = MaterialUI;

const ProjectsMenuList = ({
    projectsData, 
    handleProjectsFilter, 
    selectProject, 
    selectedProjectIDs, 
    currentProject
}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
    <Box>
        <Button 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick}>
        {currentProject['project_name']}
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
            {projectsData.map((projectData) => (
                <Box
                key={projectData['project_id']}
                >
                    <ProjectMenuItem
                    selectedProjectIDs={selectedProjectIDs}
                    selectProject={selectProject}
                    handleProjectsFilter={handleProjectsFilter}
                    projectData={projectData}
                    />
                </Box>

                ))}
        </Menu>
    </Box>
    )
}

