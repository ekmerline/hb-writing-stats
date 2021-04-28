const { useHistory } = ReactRouterDOM;
const { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button} = MaterialUI;

const StatsDisplay = ({entriesData, selectEntry}) => {

  
    return (
    <TableContainer>
      <Table aria-label="entry stats table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Project Name</TableCell>
            <TableCell align="right">Entry Type</TableCell>
            <TableCell align="right">Minutes</TableCell>
            <TableCell align="right">Words</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Edit/Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entriesData.map(entryData => (
            <StatsTableRow 
            key={entryData['entry_id']}
            entryData={entryData}
            selectEntry={selectEntry}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}