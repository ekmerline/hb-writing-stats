const { useState } = React;
const { useHistory } = ReactRouterDOM;

const CreateEntry = ({entryTypes, updateEntries, projectsData}) => {
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
            updateEntries(data['new_data']);
            history.push('/');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
       <EntryForm
       onSubmit={createNewEntry}
       onChange={onChange}
       entryTypes={entryTypes}
       projectsData={projectsData}
       entry_minutes={entry_minutes}
       entry_words={entry_words}
       entry_type_id={entry_type_id}
       entry_note={entry_note}
       project_id={project_id}
       buttonText={"Create Project"}
       >
       </EntryForm>
    )
}