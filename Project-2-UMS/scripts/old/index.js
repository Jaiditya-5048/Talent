let ID

// let user = [{
//     name = userName

// }]



// copied to table
// $(document).ready(function () {
//     // Activate tooltip
//     $('[data-toggle="tooltip"]').tooltip();
// });

// window.onload = () => {
//     loadTable();
// }


// Funtion to get data from API // copied to class API
// async function getUserData() {
//     let response = await fetch('http://localhost:3000/users');
//     let json = await response.json();
//     return json;
// }

// Function to use data from API to create table  // copied to table.js
// async function loadTable() {
//     let data = await getUserData()
//     // console.log(data);
//     return createTable(data);
// }

// funtion to get ID
function getId(id) {
    ID = id;
    return console.log("getUserID ="+ ID);
}








// function to add user and update the database
// add user func copied to classs
// async function addUser(ID,event) {
//     fetch(`http://localhost:3000/users/${ID}`,{method: "PUT"});    //`http://localhost:3000/users/${ID}`
//     let json = await response.json();
//     // console.log(json);
//     return json;
// }

// ADD user modal
// function addUser() {
// const name = document.querySelector(".name");
// const email = document.querySelector(".email");
// const address = document.querySelector(".address");
// const phone = document.querySelector(".phone");
// const company = document.querySelector(".company");
// const website = document.querySelector(".website");
// const userName = name.value;
// const userEmail = email.value;
// const userAddress = address.value;
// const userPhone = phone.value;
// const userCompany = company.value;
// const userWebsite = website.value;
// }

// function addUser() {
//     const userInfo = getElementById("addEmployeeModal").innerText
// }

// function addUser() {
//     const form = document.getElementById("addUser");
//     const submitter = document.querySelector("button[value=save]");
//     const formData = new FormData(form, submitter);

//     // const output = document.getElementById("output");

//     for (const [key, value] of formData) {
//       output.textContent += `${key}: ${value}\n`;
//     }
//     console.log(Object.fromEntries(formData));
// }

// function to delete user and update the database // copied to class API
async function deleteUser(ID, event) {
    event.preventDefault();
        await fetch(`http://localhost:3000/users/${ID}`,{method: "DELETE"});    //`http://localhost:3000/users/${ID}`
        let json = await response.json();
        return ID = null;
}



async function deleteUser(user_id,event) {
    if (event) event.preventDefault(); // Prevent default only if event exists

    console.log(user_id)
    
    try {
        const response = await fetch(`http://localhost:3000/users/${user_id}`, {method: "DELETE"});

        if (response.ok) {
            console.log(`User with ID ${user_id} deleted successfully.`);
            if (typeof loadTable === "function") {
                loadTable(); // Refresh the table after deletion
            }
        } else {
            console.error(`Failed to delete user: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}


// Funtion to create table // copied to class DOM
function createTable(data) {
    const tableBody = document.getElementById("table");
    data.forEach(data => {
            const tableRow = `
                        <tr>
						<td>${data.id}</td>
                        <td>${data.name}</td>
						<td>${data.email}</td>
						<td>${data.address.suite + ", " + data.address.street + ", " +  data.address.city}</td>
						<td>${data.phone}</td>
                        <td>${data.company.name}</td>
                        <td>${data.website}</td>
						<td>
							<a href="#editEmployeeModal" class="edit" data-toggle="modal" data-id=${data.id}"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-id=${data.id}"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
                    `
    tableBody.innerHTML += tableRow;

        
    }); }




























///////////////////////////////////////////////
// 	// Select/Deselect checkboxes
// 	var checkbox = $('table tbody input[type="checkbox"]');
// 	$("#selectAll").click(function(){
// 		if(this.checked){
// 			checkbox.each(function(){
// 				this.checked = true;
// 			});
// 		} else{
// 			checkbox.each(function(){
// 				this.checked = false;
// 			});
// 		}
// 	});
// 	checkbox.click(function(){
// 		if(!this.checked){
// 			$("#selectAll").prop("checked", false);
// 		}
// 	});w