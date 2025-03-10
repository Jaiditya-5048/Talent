"use strict";
// import {User} from "./types"
// const URL_MAIN:string = "http://localhost:3000/users/"
// let btnChange: boolean | null;
// To change the value of submit button and form hearder to ADD
const userFormBtn = document.getElementById("addUserBtn");
userFormBtn.addEventListener("click", function () {
    const modalHeader = document.getElementById("modalHeader");
    modalHeader.innerText = "Add Employee";
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.value = "ADD";
});
class Table {
    // Funtion to create table
    createTable(data) {
        const tableBody = document.getElementById("table");
        data.forEach(data => {
            const tableRow = `
                        <tr>
						<td>${data.id}</td>
                        <td>${data.name.firstName + " " + data.name.lastName}</td>
						<td>${data.email}</td>
						<td>${data.address.houseNumber + ", " + data.address.area + ", " + data.address.city + ", " + data.address.pin}</td>
						<td>${data.phone}</td>
                        <td>${data.company}</td>
                        <td>${data.website}</td>
                        <td>${data.role}</td>
						<td>
							<a href="#editEmployeeModal" class="edit"data-toggle="modal" onclick = "editUser(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
							<a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick = "getId(${data.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
                    `;
            tableBody.innerHTML += tableRow;
        });
    }
}
