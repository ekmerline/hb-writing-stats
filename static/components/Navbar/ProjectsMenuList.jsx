const { useState } = React;
const {  Button, Menu } = MaterialUI;

const ProjectsMenuList = ({projectsData, handleToggle, selectProject, selectedProjectIDs, deleteProject}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };


    return (
    <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Projects
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
            {projectsData.map((projectData) => (
                <div
                key={projectData['project_id']}
                >
                    <ProjectMenuItem
                    selectedProjectIDs={selectedProjectIDs}
                    selectProject={selectProject}
                    handleToggle={handleToggle}
                    projectData={projectData}
                    deleteProject={deleteProject}
                    />
                </div>

                ))}
        </Menu>
    </div>
    )
}

