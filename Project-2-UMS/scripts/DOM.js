class Dom {
    // Funtion to create table
    static createTable(data) {
        const tableBody = document.getElementById("table");
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
                            <td>
                                <a href="#editEmployeeModal" class="edit"  data-toggle="modal" data-id=${data.id}})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" data-id=${data.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>
                        `
        tableBody.innerHTML += tableRow;
    
            
        }); 
    }














}