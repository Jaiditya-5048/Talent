const URL = "http://localhost:3000/users";

window.onload = () => {
    renderLogin();
}

document.getElementById("registerSwitchBtn").addEventListener("click", function () {
    const CardBody = document.getElementById("CardBody");
    CardBody.innerHTML = "";
    renderRegister();
})

document.getElementById("loginSwitchBtn").addEventListener("click", function () {
    const CardBody = document.getElementById("CardBody");
    CardBody.innerHTML = ""
    renderLogin();
})

function renderLogin() {
    const CardBody = document.getElementById("CardBody");
    const loginCard = `<div class="card-body">
              
               <form id="loginForm">

                <div class="card-header text-center text-primary display-5">
                    Login
                </div>

                <div class="form-group">

                    <div class="form-label">
                    <label class= "text-primary ">Email</label>
                    </div>

                    <input type="email" id="email" class="form-control email" required>
                    <div id="emailError" class="error"></div>
                </div>

                <div class="form-group" id="passwordGroup">

                    <div class="form-label">
                    <label class= "text-primary">Password</label>
                    </div>

                    <input type="password" id="password" class="form-control password" autocomplete="on" required>
                    <div id="passwordError" class="error"></div>
                </div>
                <div>
                    <a href="#" class="card-link d-none">Forget password</a> 
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
        <div class="">
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
                        <div id="passwordError" class="text-danger"></div>
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
                            <button type="submit" class="btn btn-success btn-lg" id="submitBtn" disabled onclick="submitLoginForm(event)">Add</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>`

    CardBody.innerHTML = registerCard;
}