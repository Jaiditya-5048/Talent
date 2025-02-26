$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
});

window.onload = () => {
    loadTable();
}

// Funtion to get data from API
async function getUserData() {
    try {
        let response = await fetch('http://localhost:3000/users');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
}

// Function to use data from API to create table
async function loadTable() {
    let data = await getUserData()
    // console.log(data);
    return createTable(data);
}

// funtion to get ID
function getId(id) {
    ID = id;
    return console.log("getUserID ="+ ID);
}

// function to delete user and update the database
async function deleteUser(ID, event) {
    event.preventDefault();
    try {
        let response = await fetch(`http://localhost:3000/users/${ID}`, { method: "DELETE" });
        if (!response.ok) throw new Error(`Failed to delete user: ${response.status}`);
        console.log(`User ${ID} deleted successfully.`);
        loadTable(); // Refresh table after deletion
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

// Handle form submission with validation
document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let hosueNumber = document.getElementById("houseNumber").value
    let area = document.getElementById("area").value;
    let city = document.getElementById("city").value;
    let pin = document.getElementById("pin").value;
    let phone = document.getElementById("phone").value;
    let company = document.getElementById("company").value;
    let website = document.getElementById("website").value;

    let isValid = true

    if (!validateEmail(email)) {
        alert("Invalid email format!");
        isValid = false;
        return;
    }

    if (!validateName(firstName)) {
        alert("Invalid First name!");
        isValid = false;
        return;
    }

    if (!validateName(lastName)) {
        alert("Invalid Last name!");
        isValid = false;
        return;
    }

    if (isValid) {
        submitBtn.disabled = false; // Enable button
        let userData = { 
            id : Date.now() + Math.random(),
            name : {
                firstName,
                lastName
            }, 
            email,
            address : {
                hosueNumber,
                area,
                city,
                pin
            },
            phone,
            company,
            website };
    }

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            console.log("User added successfully!");
            document.getElementById("userForm").reset(); // Clear form
            document.getElementById("submitBtn").disabled = true; // Disable submit button again
            loadTable(); // Refresh table
        } else {
            console.error("Failed to add user:", response.status);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});





// Funtion to create table
function createTable(data) {
    const tableBody = document.getElementById("table");
    data.forEach(data => {
            const tableRow = `
                        <tr>
						<td>${data.id}</td>
                        <td>${data.firstName + " " + data.lastName}</td>
						<td>${data.email}</td>
						<td>${data.address.hosueNumber + ", " + data.address.area + ", " +  data.address.city + ", " + data.address.pin}</td>
						<td>${data.phone}</td>
                        <td>${data.company}</td>
                        <td>${data.website}</td>
						<td>
							<a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick = "getId(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick = "getId(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
                    `
    tableBody.innerHTML += tableRow;

        
    }); 
}




//////////////////// validations ////////////////////

////////////// Email //////////////
// Function to validate email format using regex
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Event listener for email input validation
document.getElementById("email").addEventListener("input", function () {
    let email = this.value;
    let emailError = document.getElementById("emailError");
    let submitBtn = document.getElementById("submitBtn");

    if (!validateEmail(email)) {
        emailError.style.display = "inline"; // Show error
        isValid = false
        // submitBtn.disabled = true; // Disable button
    } else {
        emailError.style.display = "none"; // Hide error
        // submitBtn.disabled = false; // Enable button
    }
});

////////////// Name //////////////

function validateName(name) {
    const nameRegex = /[A-Za-z]{3,30}/;
    return nameRegex.test(name);
}

// Event listener for firstName input validation
document.getElementById("firstName").addEventListener("input", function () {
    let name = this.value;
    let nameError = document.getElementById("fNameError");
    let submitBtn = document.getElementById("submitBtn");

    if (!validateName(name)) {
        nameError.style.display = "inline"; // Show error
        // submitBtn.disabled = true; // Disable button
    } else {
        nameError.style.display = "none"; // Hide error
        // submitBtn.disabled = false; // Enable button
    }
});

// Event listener for lastName input validation
document.getElementById("lastName").addEventListener("input", function () {
    let name = this.value;
    let nameError = document.getElementById("lNameError");
    let submitBtn = document.getElementById("submitBtn");

    if (!validateName(name)) {
        nameError.style.display = "inline"; // Show error
        // submitBtn.disabled = true; // Disable button
    } else {
        nameError.style.display = "none"; // Hide error
        // submitBtn.disabled = false; // Enable button
    }
});
