const { TableCell, TextField, Button } = MaterialUI;
const { useState } = React;

const EntryTableEditRow = ({currentEntry, projectsData, entryTypes, updateEntries, handleEditDisplay}) => {

    const [entryData, setEntryData] = useState({
        entry_id: currentEntry['entry_id'],
        entry_minutes: currentEntry['entry_minutes'],
        entry_words: currentEntry['entry_words'],
        entry_type_id: currentEntry['entry_type_id'],
        entry_note: currentEntry['entry_note'],
        project_id: currentEntry['project_id']
    });

    const { entry_id, entry_minutes, entry_words, entry_type_id, entry_note, project_id} = entryData;

    const onChange = e => {
        const { name, value } = e.target;
        setEntryData({
            ...entryData,
            [name]: value
        })
    };

    const updateEntry = () => {
        const newEntry = {
            entry_minutes: entry_minutes,
            entry_words: entry_words,
            entry_type_id: entry_type_id,
            entry_note: entry_note,
            project_id: project_id
        }
        fetch(`http://localhost:5000/api/entry/${entry_id}`, {
        method: 'PUT', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
        })
        .then(response => response.json())
        .then(data => {
            updateEntries(data['data']);
            handleEditDisplay(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
            <React.Fragment>
                <TableCell component="th" scope="row">
                    <ProjectsDropdown
                    projectsData={projectsData}
                    project_id={project_id}
                    onChange={onChange}
                    />
                </TableCell>
                <TableCell align="right">
                    <TextField
                    required
                    multiline
                    name="entry_note"
                    label="Entry Note"
                    rows={5}
                    placeholder="Entry Note"
                    value={entry_note}
                    onChange={e => onChange(e)}
                    />
                </TableCell>
                <TableCell align="right">
                    <EntryTypeDropdown
                    entryTypes={entryTypes}
                    entry_type_id={entry_type_id}
                    onChange={onChange}
                    />
                </TableCell>
                <TableCell align="right">
                <TextField 
                    required 
                    type="number"
                    name="entry_minutes"
                    label="Entry Minutes" 
                    value={entry_minutes} 
                    onChange={e => onChange(e)}
                />
                    </TableCell>
                <TableCell align="right">
                <TextField 
                    required 
                    type="number"
                    name="entry_words"
                    label="Entry Words" 
                    value={entry_words} 
                    onChange={e => onChange(e)}
                />
                    </TableCell>
                <TableCell align="right">{entryData['entry_datetime']}</TableCell>
                <TableCell align="right">
                <Button
                onClick={updateEntry}>
                Save
                </Button>
              </TableCell>
            </React.Fragment>
    )
};