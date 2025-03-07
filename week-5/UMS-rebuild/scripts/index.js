$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
});


const URL = "http://localhost:3000/users"
let btnChange = null;
let userId

window.onload = () => {
    loadTable();
}

// Funtion to create table
function createTable(data) {
    const tableBody = document.getElementById("table");
    data.forEach(data => {
            const tableRow = `
                        <tr>
						<td>${data.id}</td>
                        <td>${data.name.firstName + " " + data.name.lastName}</td>
						<td>${data.email}</td>
						<td>${data.address.houseNumber + ", " + data.address.area + ", " +  data.address.city + ", " + data.address.pin}</td>
						<td>${data.phone}</td>
                        <td>${data.company}</td>
                        <td>${data.website}</td>
                        <td>${data.role}</td>
						<td>
							<a href="#editEmployeeModal" class="edit"data-toggle="modal" onclick = "editUser(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick = "getId(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
                    `
    tableBody.innerHTML += tableRow;

        
    }); 
}


// Function to use data from API to create table
async function loadTable() {
    
    const userData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const filterData = await roleFilter(userData)
    console.log(filterData);

    let tableBody = document.getElementById("table");
    tableBody.innerHTML = "";                                                   // Clear skeleton loader
   
    return createTable(filterData);
}


async function roleFilter(userData) {
    // const userData = await verifyUserPassword();
    const allData = await getUserData();

        
    if (userData[0].role == "Admin") {                                                  //In case of Admin
        let filterData = allData.filter(allData => allData.role !== "Super_Admin");
        return filterData;
        
    } else { if (userData[0].role == "customer") {                                               //In case of customer
        
    } else {       
        return allData;                                                                          //In case of Super_Admin
       
              
    } }
}




// Funtion to get data from API
async function getUserData() {
    try {
        let response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
}