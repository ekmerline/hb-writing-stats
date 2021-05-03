const { TableRow, TableCell } = MaterialUI;


const EntryTableDisplayRow = ({entryData, handleEditDisplay}) => {

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
                <Button
                onClick={() => handleEditDisplay(true)}>
                Edit
                </Button>
              </TableCell>
            </React.Fragment>
    )
};