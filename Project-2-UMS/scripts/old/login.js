const URL = "http://localhost:3000/users";



window.onload = () => {
    renderLogin();
}

function renderLogin() {
    const CardBody = document.getElementById("CardBody");
    const loginCard = `<div class="card-body">
              <h5 class="login">Login</h5>
               <form id="loginForm">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" class="form-control email" required>
                    <div id="emailError" class="error"></div>
                </div>
                <div class="form-group" id="passwordGroup">
                    <label>Password</label>
                    <input type="password" id="password" class="form-control password" autocomplete="on" required>
                    <div id="passwordError" class="error"></div>
                </div>
                <div>
                    <a href="#" class="card-link">Forget password</a> 
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="button" id = "loginBtn" onclick = "verifyUser(event)">login</button>
                </div>
               </form>
                
            </div>`
    CardBody.innerHTML = loginCard;
}

// funtion to render the registration card
function renderRegister() {
    const CardBody = document.getElementById("CardBody");
    const registerCard = `      
        <div class="container-fluid mt-5">
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Register</h4>
            </div>
            <div class="card-body">
                <form id="addUserForm">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label>First Name</label>
                            <input type="text" id="firstName" class="form-control name" required oninput="validateForm()" onblur="validateForm()">
                            <div id="fNameError" class="text-danger"></div>
                        </div>
                        <div class="form-group col-md-6">
                            <label>Last Name</label>
                            <input type="text" id="lastName" class="form-control name" required oninput="validateForm()" onblur="validateForm()">
                            <div id="lNameError" class="text-danger"></div>
                        </div>
                    </div>
    
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="email" class="form-control email" required oninput="validateForm()" onblur="validateForm()">
                        <div id="emailError" class="text-danger"></div>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="password" class="form-control password" autocomplete="on" required oninput="validateForm()" onblur="validateForm()">
                        <div id="password" class="text-danger"></div>
                    </div>
    
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label>House Number</label>
                            <input type="text" class="form-control" id="houseNumber" required oninput="validateForm()" onblur="validateForm()">
                            <div id="houseNumberError" class="text-danger"></div>
                        </div>
                        <div class="form-group col-md-6">
                            <label>Area/Locality</label>
                            <input type="text" class="form-control" id="area" required oninput="validateForm()" onblur="validateForm()">
                            <div id="areaError" class="text-danger"></div>
                        </div>
                    </div>
    
                    <div class="row">
                        <div class="form-group col-md-8">
                            <label>City</label>
                            <input type="text" class="form-control" id="city" required oninput="validateForm()" onblur="validateForm()">
                            <div id="cityError" class="text-danger"></div>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Pincode</label>
                            <input type="text" class="form-control" id="pin" required oninput="validateForm()" onblur="validateForm()">
                            <div id="pinError" class="text-danger"></div>
                        </div>
                    </div>
    
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" id="phone" class="form-control phone" required oninput="validateForm()" onblur="validateForm()">
                        <div id="phoneError" class="text-danger"></div>
                    </div>
    
                    <div class="form-group">
                        <label>Company</label>
                        <input type="text" id="company" class="form-control company" required oninput="validateForm()" onblur="validateForm()">
                        <div id="companyError" class="text-danger"></div>
                    </div>
    
                    <div class="form-group">
                        <label>Website</label>
                        <input type="text" id="website" class="form-control website" required oninput="validateForm()" onblur="validateForm()">
                        <div id="websiteError" class="text-danger"></div>
                    </div>
    
                    <div class="row justify-content-end">
                        <div class="col-md-4" id="cancelBtnDiv">
                            <button type="button" id="cancelBtn" class="btn btn-secondary btn-lg">Cancel</button>
                        </div>
                        <div class="col-md-4" id="submitBtnDiv">
                            <button type="submit" class="btn btn-success btn-lg" id="submitBtn" disabled onclick="submitForm()">Add</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>`

    CardBody.innerHTML = registerCard;
}


document.getElementById("registerSwitchBtn").addEventListener("click", function (event) {
    event.preventDefault();
    renderRegister();
})

document.getElementById("loginSwitchBtn").addEventListener("click", function (event) {
    event.preventDefault();
    renderLogin();
})

// trigger on login button used to very user
async function verifyUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    try {
        const userData = await getSingleUser(email);
        // console.log("Fetched User Data:", userData)

        if (userData.length === 1) {
            // console.log("User email found:", userData);
            document.getElementById("emailError").textContent = ""
            $("#passwordGroup").css("display", "block");
            verifyUserPassword(email, password)
        } else {
            document.getElementById("emailError").textContent = "No user found";
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }

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




async function verifyUserPassword(email, password) {
    if (!password) {
        return false;
    } else {
        try {
            const userData = await getSingleUser(email, password);
            if (userData.length === 1) {
                console.log("User logged in:" , userData[0].email , ", User role:" , userData[0].role);
                sessionStorage.setItem("loggedInUser", JSON.stringify(userData))
                window.location.replace('index.html' , '_blank');
            document.getElementById("passwordError").textContent = ""
            } else {
                document.getElementById("passwordError").textContent = "Invalid Password";
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
}



// function to get a single user
async function getSingleUser(email, password = null) {
    try {
        let params = { email: email };
        if (password) params.password = password;

        let response = await fetch(URL + "?" + new URLSearchParams(params));  //new URLSearchParams(params) ;; params is an object and URLSearchParams is a function that converts the object into valid URL query parameters
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json()
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
}
// fetch('https://example.com?' + new URLSearchParams({
//     foo: 'value',
//     bar: 2,
// }).toString())