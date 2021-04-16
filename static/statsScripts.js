const createTableRow = list => {
    const entryRow = document.createElement('tr');
    for(const item of list){
        const col = document.createElement('td');
        col.appendChild(document.createTextNode(item));
        entryRow.appendChild(col);
    }
    return entryRow;
}
const updateChartsDisplay = entries => {
    const chartDiv= document.querySelector('#timeChart');
    while (chartDiv.firstChild) {
        chartDiv.removeChild(chartDiv.lastChild);
    }
    const chartCanvas = document.createElement('canvas');
    chartDiv.appendChild(chartCanvas);
    const entryTimeData = entries.reduce((acc, entry) => {
        if(acc[entry['entry_type_name']] !== undefined){
            acc[entry['entry_type_name']] += entry['entry_minutes'];
        }else {
            acc[entry['entry_type_name']] = entry['entry_minutes'];
        }
        return acc;
    }, {});

      const data = {
        labels: [
          'Writing',
          'Editing',
          'Planning'
        ],
        datasets: [{
          label: 'Time by Task',
          data: [entryTimeData['writing'], entryTimeData['editing'], entryTimeData['planning']],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

      const config = {
        type: 'pie',
        data: data,
      };
    const myChart = new Chart(
        chartCanvas,
        config
      );
};

const updateStatsDisplay = entries => {
    const statsTableBody = document.querySelector('.stats-data');
    while (statsTableBody.firstChild) {
        statsTableBody.removeChild(statsTableBody.lastChild);
    }
    const fragment = new DocumentFragment();
    for(const entry of entries){
        const tableRow = createTableRow([entry['project_name'], 
                    entry['entry_type_name'], 
                    entry['entry_minutes'], 
                    entry['entry_words'], 
                    entry['entry_datetime']]);
        fragment.appendChild(tableRow);
    }
    statsTableBody.appendChild(fragment);
};

const getInitialEntryData = response => {
	const entries = response;
	updateStatsDisplay(entries);
    updateChartsDisplay(entries);
	
	document.querySelector('#currentProject').addEventListener('change', evt => {
        
		const projectId = evt.target.value;
		if(projectId === 'all'){
			updateStatsDisplay(entries);
            updateChartsDisplay(entries);
		}else {
			const filteredEntries = entries.filter(entry => entry['project_id'] === projectId);
			updateStatsDisplay(filteredEntries);
            updateChartsDisplay(filteredEntries);
		}
	});
};

$.get(`/api/entries`, getInitialEntryData);
