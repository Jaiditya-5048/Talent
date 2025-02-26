$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
});


const URL = "http://localhost:3000/users"
let btnChange = null;
let userId;

window.onload = () => {
    loadTable();
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

// To change the value of submit button to ADD
document.getElementById("addUserBtn").addEventListener("click", function(){
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.value = "ADD";
    return btnChange = true;
})

// To clear the form in modal when closed using the cross button
document.getElementById('cancelBtn').addEventListener('click', function () {
    document.getElementById('addUserForm').reset();
});

// function to delete user and update the database
async function deleteUser(ID, event) {
    event.preventDefault();
    try {
        let response = await fetch(`${URL}/${ID}`, { method: "DELETE" });
        if (!response.ok) throw new Error(`Failed to delete user: ${response.status}`);
        console.log(`User ${ID} deleted successfully.`);
        loadTable(); // Refresh table after deletion
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

// function to get a single user
async function getSingleUser(ID) {
    try{
        let response = await fetch (`http://localhost:3000/users/${ID}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json()
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }   
}

// This function is used to prefill the modal form on edit
async function editUser(id) {

    let userData = await getSingleUser(id);
    let myModal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
    myModal.show();
    document.getElementById("firstName").value = userData.name.firstName;
    document.getElementById("lastName").value = userData.name.lastName;
    document.getElementById("email").value = userData.email;
    document.getElementById("houseNumber").value = userData.address.houseNumber;
    document.getElementById("area").value = userData.address.area;
    document.getElementById("city").value = userData.address.city;
    document.getElementById("pin").value = userData.address.pin;
    document.getElementById("phone").value = userData.phone;
    document.getElementById("company").value = userData.company;
    document.getElementById("website").value = userData.website;

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.value = "EDIT";
   
    btnChange = false;
    userId = id
}

// Handle form submission
document.getElementById("addUserForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let houseNumber = document.getElementById("houseNumber").value.trim();
    let area = document.getElementById("area").value.trim();
    let city = document.getElementById("city").value.trim();
    let pin = document.getElementById("pin").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let company = document.getElementById("company").value.trim();
    let website = document.getElementById("website").value.trim();

    let userData;
    
    if (btnChange === true) {             //Add user

        userData = { 
            id : Date.now() + Math.random(),
            name : {
                firstName : firstName.charAt(0).toUpperCase() + firstName.slice(1) ,
                lastName : lastName.charAt(0).toUpperCase() + lastName.slice(1)
            }, 
            email,
            address : {
                houseNumber,
                area,
                city,
                pin
            },
            phone,
            company,
            website 
        };
    

        postData(userData);
        return btnChange = null;
    }
    else{

        userData = {            //edit user
            id : userId,
            name : {
                firstName : firstName.charAt(0).toUpperCase() + firstName.slice(1) ,
                lastName : lastName.charAt(0).toUpperCase() + lastName.slice(1)
            }, 
            email,
            address : {
                houseNumber,
                area,
                city,
                pin
            },
            phone,
            company,
            website 
        };

        putData(userData);
        debugger

        userId = null;   
        debugger
        return btnChange = null;
    }
    
    
});

// This function is used to replace data in database using API
async function putData(userData) {
    try {
        debugger
        const response = await fetch(`${URL}/${userData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            console.log("Updated user successfully!");
            document.getElementById("userForm").reset(); // Clear form
            document.getElementById("submitBtn").disabled = true; // Disable submit button again
            loadTable(); // Refresh table
        } else {
            console.error("Failed to update user:", response.status);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


// This function is used to add new user to database using API
async function postData(userData) {
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
						<td>
							<a href="#editEmployeeModal" class="edit" onclick = "editUser(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick = "getId(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
                    `
    tableBody.innerHTML += tableRow;

        
    }); 
}


function validateForm() {
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let houseNumber = document.getElementById("houseNumber").value.trim();
    let area = document.getElementById("area").value.trim();
    let city = document.getElementById("city").value.trim();
    let pin = document.getElementById("pin").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let website = document.getElementById("website").value.trim();
    let company = document.getElementById("company").value.trim();
    let submitButton = document.getElementById("submitBtn");

    let nameRegex = /^[a-zA-Z\s]{3,15}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let houseNumberRegex = /^[a-zA-Z0-9\s#/-]+$/;
    let areaRegex = /^[a-zA-Z0-9\s,.-]+$/;
    let cityRegex = /^[a-zA-Z\s]+$/;
    let pinRegex = /^\d{6}$/;
    let phoneRegex = /^[6789]\d{9}$/;
    let websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    let companyRegex = /^[a-zA-Z0-9\s&.-]+$/;

    let isValid = true;

    document.getElementById("fNameError").textContent = "";
    document.getElementById("lNameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("houseNumberError").textContent = "";
    document.getElementById("areaError").textContent = "";
    document.getElementById("cityError").textContent = "";
    document.getElementById("pinError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("websiteError").textContent = "";
    document.getElementById("companyError").textContent = "";

    if (!firstName || !nameRegex.test(firstName)) {
        document.getElementById("fNameError").textContent = "Invalid Name (Only letters & spaces allowed)";
        isValid = false;
    }

    if (!lastName || !nameRegex.test(lastName)) {
        document.getElementById("lNameError").textContent = "Invalid Name (Only letters & spaces allowed)";
        isValid = false;
    }

    if (!email || !emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Invalid Email format (e.g., example@example.com)"
        isValid = false;
    }

    if (!houseNumber || !houseNumberRegex.test(houseNumber)) {
        document.getElementById("houseNumberError").textContent = "Invalid House Number (only letters, numbers, spaces, #/- allowed )";
        isValid = false;
    }

    if (!area || !areaRegex.test(area)) {
        document.getElementById("areaError").textContent = "Invalid (only letters, numbers, spaces, ,.- allowed )";
        isValid = false;
    }

    
    if (!city || !cityRegex.test(city)) {
        document.getElementById("cityError").textContent = "Invalid city name (only letters and spaces allowed)";
        isValid = false;
    }

    if (!pin || !pinRegex.test(pin)) {
        document.getElementById("pinError").textContent = "Invalid Pincode (6 digits)";
        isValid = false;
    }

    if (!phone || !phoneRegex.test(phone)) {
        document.getElementById("phoneError").textContent = "Invalid Phone number";
        isValid = false;
    }

    if (!website || !websiteRegex.test(website)) {
        document.getElementById("websiteError").textContent = "Invalid Website (e.g., https://example.com)";
        isValid = false;
    }

    if (!company || !companyRegex.test(company)) {
        document.getElementById("companyError").textContent = "Invalid Company Name (Only letters, numbers, &.- allowed)";
        isValid = false;
    }

    submitButton.disabled = !isValid; // Enable/Disable button based on validation
}



//////////////////// validations ////////////////////

////////////// Email //////////////
// // Function to validate email format using regex
// function validateEmail(email) {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(email);
// }

// // Event listener for email input validation
// document.getElementById("email").addEventListener("input", function () {
//     let email = this.value;
//     let emailError = document.getElementById("emailError");
//     let submitBtn = document.getElementById("submitBtn");

//     if (!validateEmail(email)) {
//         emailError.style.display = "inline"; // Show error
//         isValid = false
//         // submitBtn.disabled = true; // Disable button
//     } else {
//         emailError.style.display = "none"; // Hide error
//         // submitBtn.disabled = false; // Enable button
//     }
// });

// ////////////// Name //////////////

// function validateName(name) {
//     const nameRegex = /[A-Za-z]{3,30}/;
//     return nameRegex.test(name);
// }

// // Event listener for firstName input validation
// document.getElementById("firstName").addEventListener("input", function () {
//     let name = this.value;
//     let nameError = document.getElementById("fNameError");
//     let submitBtn = document.getElementById("submitBtn");

//     if (!validateName(name)) {
//         nameError.style.display = "inline"; // Show error
//         // submitBtn.disabled = true; // Disable button
//     } else {
//         nameError.style.display = "none"; // Hide error
//         // submitBtn.disabled = false; // Enable button
//     }
// });

// // Event listener for lastName input validation
// document.getElementById("lastName").addEventListener("input", function () {
//     let name = this.value;
//     let nameError = document.getElementById("lNameError");
//     let submitBtn = document.getElementById("submitBtn");

//     if (!validateName(name)) {
//         nameError.style.display = "inline"; // Show error
//         // submitBtn.disabled = true; // Disable button
//     } else {
//         nameError.style.display = "none"; // Hide error
//         // submitBtn.disabled = false; // Enable button
//     }
// });
