import {User, Roles} from "./types"
import { createTable } from "./DOM";
import { allDataFunc } from "./api";





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
