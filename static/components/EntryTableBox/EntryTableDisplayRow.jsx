const { TableRow, TableCell } = MaterialUI;


const EntryTableDisplayRow = ({entryData, handleEditDisplay, deleteEntry}) => {

    const deleteURL = `http://localhost:5000/api/entry/${entryData['entry_id']}`;

    const deleteDialogText = `Are you sure you want to delete this entry?`;


    return (
            <React.Fragment>
                <TableCell component="th" scope="row">
                    {entryData['project_name']}
                </TableCell>
                <TableCell align="right">{entryData['entry_note']}</TableCell>
                <TableCell align="right">{entryData['entry_type_name']}</TableCell>
                <TableCell align="right">{entryData['entry_minutes']}</TableCell>
                <TableCell align="right">{entryData['entry_words']}</TableCell>
                <TableCell align="right">{entryData['entry_datetime']}</TableCell>
                <TableCell align="right">
                <EditDeleteButtons
                deleteItem={deleteEntry}
                handleEditClick={handleEditDisplay}
                deleteDialogText={deleteDialogText}
                deleteURL={deleteURL}
                />
              </TableCell>
            </React.Fragment>
    )
};