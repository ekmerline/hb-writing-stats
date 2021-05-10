const { useState } = React;
const { TextField, Button, FormControl, InputLabel, Select, MenuItem  } = MaterialUI;

const EditEntry = ({entryTypes, updateEntries, projectsData, currentEntry}) => {
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

    const updateEntry = async () => {
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
       <EntryForm
       onSubmit={updateEntry}
       onChange={onChange}
       entryTypes={entryTypes}
       projectsData={projectsData}
       entry_minutes={entry_minutes}
       entry_words={entry_words}
       entry_type_id={entry_type_id}
       entry_note={entry_note}
       project_id={project_id}
       buttonText={"Edit Entry"}
       />
    )
}