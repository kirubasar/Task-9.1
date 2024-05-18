let currentPage = 1; 

function paginate(data, itemsPerPage) {
    let pages = [];
    for(let i = 0; i < data.length; i += itemsPerPage){
        pages.push(data.slice(i, i + itemsPerPage));
    }
    return pages;
}

let itemsPerPage = 10;
let API_URL = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";

const req = new XMLHttpRequest();
req.open("GET", API_URL);
req.send();
req.onload = function() {
    let data = JSON.parse(req.response);
    let page = paginate(data, itemsPerPage);
    let description = document.createElement('p');
    description.id = 'description';
    description.textContent = 'The lists here';
    document.body.appendChild(description);
    let tableContainer = document.createElement('div');
    tableContainer.className = 'table-responsive';
    
    let table = document.createElement('table');
    table.classList.add("table", "table-bordered");
   table.setAttribute('id', 'table');
    tableContainer.appendChild(table);
    
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ['ID', 'Name', 'Email'].forEach(text => {
        let th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    function displayPage(pageNumber) {
       tbody.innerHTML = '';
        page[pageNumber - 1].forEach(item => {
            let row = document.createElement('tr');
            [item.id, item.name, item.email].forEach(text => {
                let td = document.createElement('td');
                td.textContent = text;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
    }
    
    displayPage(currentPage);
    document.body.appendChild(tableContainer);
    
    

    
    let paginationContainer = document.createElement('div');
    paginationContainer.id = 'buttons';
    paginationContainer.className = 'd-flex justify-content-center';
    document.body.appendChild(paginationContainer);

    function setupPagination() {
        let pageCount = Math.floor(data.length / itemsPerPage);
        let previousButton = document.createElement('button');
        previousButton.textContent = 'Previous';
        previousButton.addEventListener('click', () => {
          if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
          }
        });
        paginationContainer.appendChild(previousButton);

        for (let i = 1; i <= pageCount; i++) {
          let button = document.createElement('button');
          button.textContent = i;
          button.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
          });
          paginationContainer.appendChild(button);
        }
        let nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
          if (currentPage < pageCount) {
            currentPage++;
            displayPage(currentPage);
          }
        });
        paginationContainer.appendChild(nextButton);
    }
    setupPagination();
    
}