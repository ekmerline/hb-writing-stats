const { useState } = React;
const { Button, Dialog, DialogActions, DialogContent, DialogContentText, Box } = MaterialUI;

const ConfirmDeleteDialog = ({dialogText, deleteItem, url}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleDelete = () => {
        setOpen(false);

            fetch(url, {
            method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                //ooh damn, need to going to set panel to another project
                deleteItem(data['data']);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
      };

      const classes = useStyles();

      return (
        <React.Fragment>
          <Button onClick={handleClickOpen} className={classes.editDeleteButtons}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    
}