// script.js

document.addEventListener('DOMContentLoaded', () => {
    const playersTable = document.getElementById('playersTable').getElementsByTagName('tbody')[0];
    const selectedCount = document.getElementById('selectedCount');

    let players = [];

    // Fetch data from players.json
    fetch('players.json')
        .then(response => response.json())
        .then(data => {
            players = data;
            renderTable();
        })
        .catch(error => console.error('Error fetching players:', error));

    function renderTable() {
        playersTable.innerHTML = '';
        players.forEach((player, index) => {
            const row = playersTable.insertRow();
            row.className = player.isselected ? 'selected' : '';
            row.dataset.index = index;

            row.insertCell().textContent = player.name;
            row.insertCell().textContent = player.country;

            row.addEventListener('click', () => handleRowClick(index));
        });
        updateSelectedCount();
    }

    function handleRowClick(index) {
        const player = players[index];
        player.isselected = !player.isselected;
        renderTable();
    }

    function updateSelectedCount() {
        const count = players.filter(player => player.isselected).length;
        selectedCount.textContent = `Selected Players: ${count}`;
    }
});
