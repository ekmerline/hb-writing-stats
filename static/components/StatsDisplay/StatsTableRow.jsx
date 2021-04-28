const { useHistory } = ReactRouterDOM;
const { TableRow, TableCell, Button} = MaterialUI;

const StatsTableRow = ({entryData, selectEntry}) => {

    let history = useHistory();
    
    const onClick = () => {
        selectEntry(entryData);
        history.push('/edit-entry');
    }

    return (
        <TableRow>
              <TableCell component="th" scope="row">
                {entryData['project_name']}
              </TableCell>
              <TableCell align="right">{entryData['entry_type_name']}</TableCell>
              <TableCell align="right">{entryData['entry_minutes']}</TableCell>
              <TableCell align="right">{entryData['entry_words']}</TableCell>
              <TableCell align="right">{entryData['entry_datetime']}</TableCell>
              <TableCell align="right">
                <Button
                onClick={onClick}>
                Edit
                </Button>
              </TableCell>
        </TableRow>
    )
};