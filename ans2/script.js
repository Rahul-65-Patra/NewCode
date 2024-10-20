// script.js

document.addEventListener('DOMContentLoaded', () => {
    const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    const categoryFilter = document.getElementById('categoryFilter');

    let products = [];

   
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderTable();  
        })
        .catch(error => console.error('Error fetching products:', error));

    function renderTable(filterCategory = '') {
        productsTable.innerHTML = '';
        const filteredProducts = filterCategory ? products.filter(p => p.category === filterCategory) : products;
        filteredProducts.forEach(product => {
            const row = productsTable.insertRow();
            row.insertCell().textContent = product.name;
            row.insertCell().textContent = product.category;
        });
    }
    console.log()

   
    categoryFilter.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        renderTable(selectedCategory);
    });
});
