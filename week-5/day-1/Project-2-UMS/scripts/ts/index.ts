import {User, Roles } from "./types"
import { createTable } from "./DOM";
import bootstrap from "bootstrap";
// import { allDataFunc } from "./api";

const URL_MAIN:string = "http://localhost:3000/users/"

const handleAPI =async ()  => {
    const response = await callAPI(URL_MAIN,'GET')
    console.log("response from API =>" , response)
}

handleAPI()
// Function to use data from API to create table
export async function loadTable() {
    
    const dataInSessionStorage = sessionStorage.getItem("loggedInUser");
    const userData: User[] = dataInSessionStorage ? JSON.parse(dataInSessionStorage) : null;

    const filterData: User[] = await roleFilter(userData)
    console.log(filterData);

    let tableBody = document.getElementById("table") as HTMLTableElement;
    tableBody.innerHTML = ""; // Clear skeleton loader
   
    // console.log(userData);
    return createTable(filterData);
}


async function roleFilter(userData: User[]) {
    // const userData = await verifyUserPassword();
    const allData: User[] = await allDataFunc();
    const userRole = userData[0]?.role
        
    if (userRole == Roles.SUPER_ADMIN) {                                                  //In case of Admin
        let filterData = allData.filter(allData => allData.role !== Roles.SUPER_ADMIN);

        return filterData;
    } else { if (userData[0].role == Roles.CUSTOMER) {                                               //In case of customer
        return userData;
    } else {       
        return allData;                                                                          //In case of Super_Admin
       
              
    } }
}


// This function is used to prefill the modal form on edit
async function editUser(id) {

    let userData = await getSingleUser(id);
   
        const Modal = new bootstrap.Modal(document.getElementById("addEmployeeModal"), {
            backdrop: 'static',
            keyboard: false // Prevent closing with Esc key
        });
    
        Modal.show(); // Show the modal

    document.getElementById("firstName").value = userData.name.firstName;
    document.getElementById("lastName").value = userData.name.lastName;
    document.getElementById("email").value = userData.email;
    document.getElementById("houseNumber").value = userData.address.houseNumber;
    document.getElementById("area").value = userData.address.area;
    document.getElementById("city").value = userData.address.city;
    document.getElementById("pin").value = userData.address.pin;
    document.getElementById("phone").value = userData.phone;
    document.getElementById("role").value = userData.role;
    document.getElementById("company").value = userData.company;
    document.getElementById("website").value = userData.website;

    const modalHeader = document.getElementById("modalHeader");
    modalHeader.innerText = "Edit Employee Data"

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.value = "EDIT";
   
    btnChange = false;
    userId = id
}
