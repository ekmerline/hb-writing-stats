const { Box } = MaterialUI;

const ProjectDataDisplay = ({currentProject}) => {

    return (
        <Box>       
            <Box>
                <Box>
                    <Box component="span">Description: </Box><Box component="span">{currentProject['project_description']}</Box>
                </Box>
                <Box>
                    <Box component="span">Type: </Box><Box component="span">{currentProject['project_type_name']}</Box>
                </Box>
                <Box>
                    <Box component="span">Creation Date: </Box><Box component="span">{currentProject['project_create_date']}</Box>
                </Box>
            </Box>
        </Box>
    )
}