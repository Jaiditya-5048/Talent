// Handle form submission
// document.getElementById("addUserForm").addEventListener("submit", 
    async function submitForm (event) {
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
    
    
};


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

    resetErrors();

    if (!firstName) {
        $("#fNameError").text("Name required");
    } else  if (!nameRegex.test(firstName)) {
        document.getElementById("fNameError").textContent = "Invalid Name (Only letters & spaces allowed)";
        isValid = false;
    }

    if (!lastName) {
        $("#lNameError").text("Name required");
    } else    if (!nameRegex.test(lastName)) {
        document.getElementById("lNameError").textContent = "Invalid Name (Only letters & spaces allowed)";
        isValid = false;
    }

    if (!email) {
        $("#emailError").text("Email is required");
    } else    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Invalid Email format (e.g., example@example.com)"
        isValid = false;
    }

    if (!houseNumber) {
        $("#houseNumberError").text("House Number is required");
    } else    if (!houseNumberRegex.test(houseNumber)) {
        document.getElementById("houseNumberError").textContent = "Invalid House Number (only letters, numbers, spaces, #/- allowed )";
        isValid = false;
    }

    if (!area) {
        $("#areaError").text("Area/Locality is required");
    } else    if (!areaRegex.test(area)) {
        document.getElementById("areaError").textContent = "Invalid (only letters, numbers, spaces, ,.- allowed )";
        isValid = false;
    }
    
    if (!city) {
        $("#cityError").text("City is required");
    } else    if (!cityRegex.test(city)) {
        document.getElementById("cityError").textContent = "Invalid city name (only letters and spaces allowed)";
        isValid = false;
    }

    if (!pin) {
        $("#pinError").text("Pin is required");
    } else    if (!pinRegex.test(pin)) {
        document.getElementById("pinError").textContent = "Invalid Pincode (6 digits)";
        isValid = false;
    }

    if (!phone) {
        $("#phoneError").text("Phone is required");
    } else    if (!phoneRegex.test(phone)) {
        document.getElementById("phoneError").textContent = "Invalid Phone number";
        isValid = false;
    }

    if (!website) {
        $("#websiteError").text("Website is required");
    } else    if (!websiteRegex.test(website)) {
        document.getElementById("websiteError").textContent = "Invalid Website (e.g., https://example.com)";
        isValid = false;
    }

    if (!company) {
        $("#companyError").text("Company is required");
    } else    if (!companyRegex.test(company)) {
        document.getElementById("companyError").textContent = "Invalid Company Name (Only letters, numbers, &.- allowed)";
        isValid = false;
    }

    submitButton.disabled = !isValid; // Enable/Disable button based on validation
}

function resetErrors() {
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
}