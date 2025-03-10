



export function validateForm() {
    let firstName = (document.getElementById("firstName") as HTMLInputElement).value.trim();
    let lastName = (document.getElementById("lastName") as HTMLInputElement).value.trim();
    let email = (document.getElementById("email") as HTMLInputElement).value.trim();
    let houseNumber = (document.getElementById("houseNumber") as HTMLInputElement).value.trim();
    let area = (document.getElementById("area") as HTMLInputElement).value.trim();
    let city = (document.getElementById("city") as HTMLInputElement).value.trim();
    let pin = (document.getElementById("pin") as HTMLInputElement).value.trim();
    let phone = (document.getElementById("phone") as HTMLInputElement).value.trim();
    let website = (document.getElementById("website") as HTMLInputElement).value.trim();
    let company = (document.getElementById("company") as HTMLInputElement).value.trim();


    let submitButton = document.getElementById("submitBtn") as HTMLButtonElement;


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
        (document.getElementById("fNameError") as HTMLDivElement).textContent = "Invalid Name (Only letters & spaces allowed)";
        isValid = false;
    }

    if (!lastName) {
        $("#lNameError").text("Name required");
    } else    if (!nameRegex.test(lastName)) {
        (document.getElementById("lNameError") as HTMLDivElement).textContent = "Invalid Name (Only letters & spaces allowed)";
        isValid = false;
    }

    if (!email) {
        $("#emailError").text("Email is required");
    } else    if (!emailRegex.test(email)) {
        (document.getElementById("emailError") as HTMLDivElement).textContent = "Invalid Email format (e.g., example@example.com)"
        isValid = false;
    }

    if (!houseNumber) {
        $("#houseNumberError").text("House Number is required");
    } else    if (!houseNumberRegex.test(houseNumber)) {
        (document.getElementById("houseNumberError") as HTMLDivElement).textContent = "Invalid House Number (only letters, numbers, spaces, #/- allowed )";
        isValid = false;
    }

    if (!area) {
        $("#areaError").text("Area/Locality is required");
    } else    if (!areaRegex.test(area)) {
        (document.getElementById("areaError") as HTMLDivElement).textContent = "Invalid (only letters, numbers, spaces, ,.- allowed )";
        isValid = false;
    }
    
    if (!city) {
        $("#cityError").text("City is required");
    } else    if (!cityRegex.test(city)) {
        (document.getElementById("cityError") as HTMLDivElement).textContent = "Invalid city name (only letters and spaces allowed)";
        isValid = false;
    }

    if (!pin) {
        $("#pinError").text("Pin is required");
    } else    if (!pinRegex.test(pin)) {
        (document.getElementById("pinError") as HTMLDivElement).textContent = "Invalid Pincode (6 digits)";
        isValid = false;
    }

    if (!phone) {
        $("#phoneError").text("Phone is required");
    } else    if (!phoneRegex.test(phone)) {
        (document.getElementById("phoneError") as HTMLDivElement).textContent = "Invalid Phone number";
        isValid = false;
    }

    if (!website) {
        $("#websiteError").text("Website is required");
    } else    if (!websiteRegex.test(website)) {
        (document.getElementById("websiteError") as HTMLDivElement).textContent = "Invalid Website (e.g., https://example.com)";
        isValid = false;
    }

    if (!company) {
        $("#companyError").text("Company is required");
    } else    if (!companyRegex.test(company)) {
        (document.getElementById("companyError") as HTMLDivElement).textContent = "Invalid Company Name (Only letters, numbers, &.- allowed)";
        isValid = false;
    }

    submitButton.disabled = !isValid; // Enable/Disable button based on validation
}

export function resetErrors() {
    (document.getElementById("fNameError") as HTMLDivElement).textContent = "";
    (document.getElementById("lNameError") as HTMLDivElement).textContent = "";
    (document.getElementById("emailError") as HTMLDivElement).textContent = "";
    (document.getElementById("houseNumberError") as HTMLDivElement).textContent = "";
    (document.getElementById("areaError") as HTMLDivElement).textContent = "";
    (document.getElementById("cityError") as HTMLDivElement).textContent = "";
    (document.getElementById("pinError") as HTMLDivElement).textContent = "";
    (document.getElementById("phoneError") as HTMLDivElement).textContent = "";
    (document.getElementById("websiteError") as HTMLDivElement).textContent = "";
    (document.getElementById("companyError") as HTMLDivElement).textContent = "";
}