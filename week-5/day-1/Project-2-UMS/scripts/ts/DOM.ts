import {User} from "./types"





// Funtion to create table
export function createTable(data : User[]) {
    const tableBody = document.getElementById("table") as HTMLTableElement;
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
                        <td>${data.role}</td>
						<td>
							<a href="#editEmployeeModal" class="edit"data-toggle="modal" onclick = "editUser(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick = "getId(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
                    `
    tableBody.innerHTML += tableRow;

        
    }); 
}


// To change the value of submit button and form hearder to ADD
const userFormBtn = document.getElementById("addUserBtn") as HTMLFormElement;
userFormBtn.addEventListener("click", function(){


    const modalHeader = document.getElementById("modalHeader") as HTMLHeadingElement;
    modalHeader.innerText = "Add Employee"

    const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
    submitBtn.value = "ADD";
    globalThis.btnChange = true;
})

