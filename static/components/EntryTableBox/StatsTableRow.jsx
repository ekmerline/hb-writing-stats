const { TableRow, TableCell, Button} = MaterialUI;
const { useState } = React;

const StatsTableRow = ({entryData, deleteEntry, projectsData, entryTypes, updateEntries}) => {

  const [ editDisplay, setEditDisplay ] = useState(false);

    const handleDeleteClick = () => {
      fetch(`http://localhost:5000/api/entry/${entryData['entry_id']}`, {
          method: 'DELETE'
          })
          .then(response => response.json())
          .then(data => {
              deleteEntry(data['data']);
          })
          .catch((error) => {
              console.error('Error:', error);
          });;
  }

  const handleEditDisplay = displayBool => {
    setEditDisplay(displayBool);
  }

    return (
        <TableRow>
              {!editDisplay &&
              <EntryTableDisplayRow
              entryData={entryData}
              handleEditDisplay={handleEditDisplay}
              />
              }
              {editDisplay &&
              <EntryTableEditRow
              entryData={entryData}
              projectsData={projectsData}
              entryTypes={entryTypes}
              updateEntries={updateEntries}
              handleEditDisplay={handleEditDisplay}
              />
              }
              <TableCell align="right">
                <Button
                onClick={handleDeleteClick}>
                Del
                </Button>
              </TableCell>
        </TableRow>
    )
};