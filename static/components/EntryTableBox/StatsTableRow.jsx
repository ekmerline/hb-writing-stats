const { TableRow, TableCell, Button} = MaterialUI;
const { useState } = React;

const StatsTableRow = ({entryData, deleteEntry, projectsData, entryTypes, updateEntries}) => {

  const [ editDisplay, setEditDisplay ] = useState(false);

  const handleEditDisplay = () => {
    setEditDisplay(!editDisplay);
  }

    return (
        <TableRow>
              {!editDisplay &&
              <EntryTableDisplayRow
              entryData={entryData}
              handleEditDisplay={handleEditDisplay}
              deleteEntry={deleteEntry}
              />
              }
              {editDisplay &&
              <EntryTableEditRow
              currentEntry={entryData}
              projectsData={projectsData}
              entryTypes={entryTypes}
              updateEntries={updateEntries}
              handleEditDisplay={handleEditDisplay}
              />
              }
        </TableRow>
    )
};