const { useHistory } = ReactRouterDOM;
const { TableRow, TableCell, Button} = MaterialUI;

const StatsTableRow = ({entryData, selectEntry, deleteEntry}) => {

    let history = useHistory();
    
    const handleEditClick = () => {
        selectEntry(entryData);
        history.push('/edit-entry');
    }

    const handleDeleteClick = () => {
      fetch(`http://localhost:5000/api/entry/${entryData['entry_id']}`, {
          method: 'DELETE'
          })
          .then(response => response.json())
          .then(data => {
              deleteEntry(data['data']);
              history.push('/');
          })
          .catch((error) => {
              console.error('Error:', error);
          });;
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
                onClick={handleEditClick}>
                Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                onClick={handleDeleteClick}>
                Del
                </Button>
              </TableCell>
        </TableRow>
    )
};