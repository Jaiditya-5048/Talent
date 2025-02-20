
$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
});

window.onload = () => {
    loadTable();
}


// Funtion to get data from API
async function getUserData() {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let json = await response.json();
    // console.log(json);
    return json;
}

// Function to use data from API to create table
async function loadTable() {
    let data = await getUserData()
    // console.log(data);
    return createTable(data);
}

// Funtion to create table
function createTable(data) {
    const tableBody = document.getElementById("table")
    data.forEach(element => {
        const tableRow = createEle("tr", null, null);
        const dataId = createEle("td", element.id, null);
        const dataName = createEle("td", element.name, null);
        const dataEmail = createEle("td", element.email, null);
        const dataAddress = createEle("td", `${element.address.suite}, ${element.address.street},  ${element.address.city}` , null);
        const dataPhone = createEle("td", element.phone, null);
        const dataCompany = createEle("td", element.company.name, null);
        const dataWebsite = createEle("td", element.website, null);
        
        const btnCell = document.createElement("td");
        btnCell.innerHTML = `  <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
				                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
				            `
                            
        tableBody.appendChild(tableRow);
        tableRow.appendChild(dataId);
        tableRow.appendChild(dataName);
        tableRow.appendChild(dataEmail);
        tableRow.appendChild(dataAddress);
        tableRow.appendChild(dataPhone);
        tableRow.appendChild(dataCompany);
        tableRow.appendChild(dataWebsite);
        tableRow.appendChild(btnCell);
        
    });
}

// Funtion to create element
function createEle(type, innerText, func) {
    const element = document.createElement(type);
    // // element.classList.add(...classList);
    element.innerText = innerText;
    // if (type = "button")
    //     // element.addEventListener("click", func);
    return element;
}







// function createTable(data) {
//         const tableRow = createElement("tr", null, null , null);
//         const dataId = createElement("td", null, data.id, null);
//         const dataName = createElement("td", null, data.name, null);
//         const dataEmail = createElement("td", null, data.email, null);
//         const dataAddress = createElement("td", null, data.address.suite, null);
//         const dataPhone = createElement("td", null, data.phone, null);
//         const dataCompany = createElement("td", null, data.company.name, null);
//         const dataWebsite = createElement("td", null, data.website, null);
//         document.getElementById("table").appendChild(tableRow);
//         tableRow.appendChild(dataId);
//         tableRow.appendChild(dataName);
//         tableRow.appendChild(dataEmail);
//         tableRow.appendChild(dataAddress);
//         tableRow.appendChild(dataPhone);
//         tableRow.appendChild(dataCompany);
//         tableRow.appendChild(dataWebsite);
//     }



//  getUserData().then((data) => console.log(data));
// createTable();



// This function is used to create the elements dynamically
// This function executes the function getFromLocal and then uses that data to create elements
// function createList() {
//     const list = document.getElementById("list");
//     let taskFromLocal = getFromLocal();    //get data from function getFromlocal and stores in taskFromLocal
//     // console.log(taskFromLocal);
//     taskFromLocal.forEach((task) => {
//       const taskDiv = createElement("div", ["task-div" , "position-relative"], null , null);
//       const taskElement = createElement("p", ["form-control", "border-0", "list-item", "bg-transparent"], task.description, null);
//       const editButton = createElement("button", ["btn", "btn-warning", "btn-md" , "ebtn"], "E", null);  //() => editTask(task.id)
//       const deleteButton = createElement("button", ["btn", "btn-danger", "btn-md" , "dbtn"], "D", () => deleteTask(task.id)); //() => deleteTask(task.id)
//       taskDiv.appendChild(editButton);
//       taskDiv.appendChild(deleteButton);
//       taskDiv.appendChild(taskElement)
//       list.appendChild(taskDiv);
//     });
//   }






///////////////////////////////////////////////
// 	// Select/Deselect checkboxes
// 	var checkbox = $('table tbody input[type="checkbox"]');
// 	$("#selectAll").click(function(){
// 		if(this.checked){
// 			checkbox.each(function(){
// 				this.checked = true;
// 			});
// 		} else{
// 			checkbox.each(function(){
// 				this.checked = false;
// 			});
// 		}
// 	});
// 	checkbox.click(function(){
// 		if(!this.checked){
// 			$("#selectAll").prop("checked", false);
// 		}
// 	});w