const updateStatsDisplay = response => {
    const statsDiv = document.querySelector('.stats-data');
    while (statsDiv.firstChild) {
        statsDiv.removeChild(statsDiv.lastChild);
    }
    const fragment = new DocumentFragment();
    for(const entry of response){
        const entryDiv = document.createElement('div');
        entryDiv.appendChild(document.createTextNode(entry['entry_note']));
        fragment.appendChild(entryDiv);
    }
    statsDiv.appendChild(fragment);
};

document.querySelector('#currentProject').addEventListener('change', evt => {
    const projectId = evt.target.value;
    $.post(`/api/entries/${projectId}`, updateStatsDisplay);
});

$.post(`/api/entries/all`, updateStatsDisplay);


