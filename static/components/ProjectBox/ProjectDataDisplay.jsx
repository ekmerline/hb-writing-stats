const { Box } = MaterialUI;

const ProjectDataDisplay = ({currentProject, handlePanelChange}) => {

    const classes = useStyles();

    return (
        <React.Fragment>       
            <Box className={classes.projectBoxMiddle}>
                <Box className={classes.projectBoxData}>
                    <Box component="span" fontWeight="fontWeightBold">Description: </Box><Box component="span">{currentProject['project_description']}</Box>
                </Box>
                <Box className={classes.projectBoxData}>
                    <Box component="span" fontWeight="fontWeightBold">Type: </Box><Box component="span">{currentProject['project_type_name']}</Box>
                </Box>
                <Box className={classes.projectBoxData}>
                    <Box component="span" fontWeight="fontWeightBold">Creation Date: </Box><Box component="span">{currentProject['project_create_date']}</Box>
                </Box>
            </Box>
            <Box className={classes.projectBoxBottom}>
                    <Button className={classes.buttonStyles} variant="contained" color="primary" onClick={()=>handlePanelChange(panels.CREATEPROJECT)}>New Project</Button>
                    <Button className={classes.buttonStyles} variant="contained" color="primary" onClick={()=>handlePanelChange(panels.CREATEENTRY)}>New Entry</Button>
            </Box>
        </React.Fragment>
    )
}