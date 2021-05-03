const { Box, Button, Menu, MenuItem } = MaterialUI;
const { useState } = React;

const ProjectOptionsMenu = ({currentProject, deleteProject, handlePanelChange}) => {

    const panels = {
        PROJECTDATA: 'Project Data Display',
        EDITPROJECT: 'Edit Project',
        CREATEPROJECT: 'Create Project',
        CREATEENTRY: 'Create Entry'
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleDeleteClick = () => {
        //delete here
        //also add some sort of confirmation
        setAnchorEl(null);
        deleteProject(currentProject);
    };

    const handleEditClick = () => {
        setAnchorEl(null);
        handlePanelChange(panels.EDITPROJECT);
    };    

    const handleClose = () => {
        setAnchorEl(null);
      };
    return (
    <Box>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        ...
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Del</MenuItem>
        </Menu>
    </Box>
    )
}