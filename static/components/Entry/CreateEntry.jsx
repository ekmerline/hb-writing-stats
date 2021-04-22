const { useState } = React;
const { useHistory } = ReactRouterDOM;
const { TextField, Button, FormControl, InputLabel, Select, MenuItem  } = MaterialUI;

const CreateEntry = ({entryTypes, updateEntriesData, projectsData}) => {
    let history = useHistory();
    const [entryData, setEntryData] = useState({
        entry_minutes: 0,
        entry_words: 0,
        entry_type_id: '',
        entry_note: '',
        project_id: ''
    });

    const { entry_minutes, entry_words, entry_type_id, entry_note, project_id} = entryData;

    const onChange = e => {
        const { name, value } = e.target;
        setEntryData({
            ...entryData,
            [name]: value
        })
    };

    const createNewEntry = async () => {
        const newEntry = {
            entry_minutes: entry_minutes,
            entry_words: entry_words,
            entry_type_id: entry_type_id,
            entry_note: entry_note,
            project_id: project_id
        }
        fetch('http://localhost:5000/api/entry', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
        })
        .then(response => response.json())
        .then(data => {
            updateEntriesData(data['new_data']);
            history.push('/');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
        <form>
            <div>
                <TextField 
                    required 
                    type="number"
                    name="entry_minutes"
                    label="Entry Minutes" 
                    value={entry_minutes} 
                    onChange={e => onChange(e)}
                />
            </div>
            <div>
                <TextField 
                    required 
                    type="number"
                    name="entry_words"
                    label="Entry Words" 
                    value={entry_words} 
                    onChange={e => onChange(e)}
                />
            </div>
            <div>
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
            </div>
            <div>
                <FormControl style={{minWidth: 200}}>
                    <InputLabel id="entry-type-label">Entry Type</InputLabel>
                    <Select
                    labelId="entry-type-label"
                    value={entry_type_id}
                    name="entry_type_id"
                    onChange={e => onChange(e)}
                    >
                    {entryTypes.map((entryType, index) => 
                        <MenuItem 
                        key={index} 
                        value={entryType['entry_type_id']}>
                            {entryType['entry_type_name']}
                        </MenuItem>
                    )}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl style={{minWidth: 200}}>
                    <InputLabel id="project-label">Project</InputLabel>
                    <Select
                    labelId="project-label"
                    value={project_id}
                    name="project_id"
                    onChange={e => onChange(e)}
                    >
                    {projectsData.map((projectData, index) => 
                        <MenuItem 
                        key={index} 
                        value={projectData['project_id']}>
                            {projectData['project_name']}
                        </MenuItem>
                    )}
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={createNewEntry}>
                        Create Entry
                </Button>
            </div>

        </form>
    )
}