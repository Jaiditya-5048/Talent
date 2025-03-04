import {User , Roles, Name, Address} from "./types";
import { postData , putData } from "./api";


// Handle form submission
// document.getElementById("addUserForm").addEventListener("submit", 
async function submitForm (event: SubmitEvent) {
    event.preventDefault(); // Prevent default form submission


    const firstName = (document.getElementById("firstName") as HTMLInputElement).value.trim();
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value.trim();
    
    const name : Name = {
        firstName : firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName : lastName.charAt(0).toUpperCase() + lastName.slice(1)
    };

    const houseNumber = ((document.getElementById("houseNumber") as HTMLInputElement).value.trim());
    const area = (document.getElementById("area") as HTMLInputElement).value.trim();
    const city = (document.getElementById("city") as HTMLInputElement).value.trim();
    const pin = parseInt((document.getElementById("pin") as HTMLInputElement).value.trim(), 10);
    
    const address : Address = {
        houseNumber : houseNumber,
        area: area,
        city: city,
        pin: pin
    }

   
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
   
    const phone = parseInt((document.getElementById("phone") as HTMLInputElement).value.trim(), 10);
    const company = (document.getElementById("company") as HTMLInputElement).value.trim();
    const website = (document.getElementById("website") as HTMLInputElement).value.trim();

    const roleValue = (document.getElementById("roles") as HTMLInputElement).value.trim();
    const role = Object.values(Roles).includes(roleValue as Roles) ? (roleValue as Roles) : Roles.CUSTOMER;

    // const userData : User;
    
    if (btnChange === true) {             //Add user

        const userData : User = { 
            id : Date.now() + Math.random(),
            name, 
            email,
            password,
            address,
            phone,
            company,
            website,
            role
        };
    

        postData(userData);
        globalThis.btnChange = null;
    }
    else{

        if(userId === null) {console.log("error")}
        else {

        const userData : User = {            //edit user
            id : userId,
            name,
            email,
            password,
            address,
            phone,
            company,
            website,
            role
        };

        putData(userData);
        // debugger

        userId = null;   
        // debugger
        let btnChange = null;
    }
    
    
};}
