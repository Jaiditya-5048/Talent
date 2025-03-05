"use strict";
// export let btnChange : boolean | null
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "Admin";
    Roles["EMPLOYEE"] = "Employee";
    Roles["CUSTOMER"] = "Customer";
})(Roles || (Roles = {}));
class User {
    constructor(id, name, email, password, address, phone, company, website, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.company = company;
        this.website = website;
        this.role = role;
    }
}
