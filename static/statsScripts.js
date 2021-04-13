const updateStatsDisplay = entries => {
    const statsDiv = document.querySelector('.stats-data');
    while (statsDiv.firstChild) {
        statsDiv.removeChild(statsDiv.lastChild);
    }
    const fragment = new DocumentFragment();
    for(const entry of entries){
        const entryDiv = document.createElement('div');
        entryDiv.appendChild(document.createTextNode(entry['entry_note']));
        fragment.appendChild(entryDiv);
    }
    statsDiv.appendChild(fragment);
};

const getInitialEntryData = response => {
	const entries = response;
	updateStatsDisplay(entries);
	
	document.querySelector('#currentProject').addEventListener('change', evt => {
        
		const projectId = evt.target.value;
		if(projectId === 'all'){
			updateStatsDisplay(entries);
		}else {
			const filteredEntries = entries.filter(entry => entry['project_id'] === projectId);
			updateStatsDisplay(filteredEntries);
		}
	});
};

$.get(`/api/entries`, getInitialEntryData);
