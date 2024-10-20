
async function fetchApi() 
{
    const response = await fetch("./product.json");
    const data = await response.json();
     
    console.log(data);

    let table;
    let tBody;

    function createTable() 
    {
        table = document.createElement("table");
       
        const tableHeader = `
        <thead>
        <tr>
        <th>Category</th>
        <th>Success</th>
        <th>Name</th>
        </tr>
        </thead>
        `;

        table.innerHTML = tableHeader;
        document.body.appendChild(table);

        tBody = document.createElement("tbody");
        table.appendChild(tBody);
    }

    function updateTable(filteredData) {
        if (!table) {
            createTable();
        }
       
        tBody.innerHTML = '';
        filteredData.forEach(element => {
            const row = document.createElement("tr");
            row.style.backgroundColor = element.success ? "green" : "red";
            row.innerHTML = `
            <td>${element.category}</td>
            <td>${element.success}</td>
            <td>${element.name}</td>
            `;
            tBody.appendChild(row);
        });
    }

    const searchInp = document.querySelector("#search");

    searchInp.addEventListener("input", () => {
        let searchTerm = searchInp.value.toLowerCase();
        const filteredData = data.products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm);
        });

        if (filteredData.length > 0) {
            updateTable(filteredData);
        } else {
            if (table) {
                table.remove();
                table = null;
                tBody = null;
            }
        }
    });
}

fetchApi();
