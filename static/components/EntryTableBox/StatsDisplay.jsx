const { useHistory } = ReactRouterDOM;
const { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button} = MaterialUI;

const StatsDisplay = ({entriesData, deleteEntry, projectsData, entryTypes, updateEntries}) => {

  
    return (
    <TableContainer>
      <Table aria-label="entry stats table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Project Name</TableCell>
          <TableCell align="right">Entry Notes</TableCell>
            <TableCell align="right">Entry Type</TableCell>
            <TableCell align="right">Minutes</TableCell>
            <TableCell align="right">Words</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entriesData.map(entryData => (
            <StatsTableRow 
            key={entryData['entry_id']}
            entryData={entryData}
            deleteEntry={deleteEntry}
            projectsData={projectsData}
            entryTypes={entryTypes}
            updateEntries={updateEntries}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}