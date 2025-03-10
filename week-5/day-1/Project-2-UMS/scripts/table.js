$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
});

window.onload = () => {
    loadTable();
}


// Function to use data from API to create table
async function loadTable() {
    let data = await Api.getUserData()
    let tableBody = document.getElementById("table");
    tableBody.innerHTML = ""; // Clear skeleton loader
    Dom.createTable(data);
}

