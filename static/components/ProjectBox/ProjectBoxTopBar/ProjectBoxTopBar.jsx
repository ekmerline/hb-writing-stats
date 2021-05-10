const { Box } = MaterialUI;



const ProjectBoxTopBar = ({
    projectsData, 
    handleProjectsFilter, 
    selectProject,
    selectedProjectIDs,
    currentProject,
    deleteProject,
    handlePanelChange,
    handleProjectsFillerAll
}) => {

    const handleEditClick = () => {
        handlePanelChange(panels.EDITPROJECT);
    };

    const deleteDialogText = `Are you sure you want to delete this project? 
    Please note this will delete all associated entries and cannot be undone.`

    const deleteURL = `http://localhost:5000/api/project/${currentProject['project_id']}`
    
    const classes = useStyles();
    return (
        <Box className={classes.projectBoxTop}>
            <ProjectsMenuList
            handleProjectsFillerAll={handleProjectsFillerAll}
            projectsData={projectsData}
            handleProjectsFilter={handleProjectsFilter}
            selectProject={selectProject}
            selectedProjectIDs={selectedProjectIDs}
            currentProject={currentProject}
            />
            <EditDeleteButtons
            handleEditClick={handleEditClick}
            deleteItem={deleteProject}
            deleteDialogText={deleteDialogText}
            deleteURL={deleteURL}
            />
         </Box>
    )
}