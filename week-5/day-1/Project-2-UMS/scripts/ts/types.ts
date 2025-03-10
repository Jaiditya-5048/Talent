


// export let btnChange : boolean | null

// export let btnChange: boolean | null; 
// export let userId: number | null; 
// export const URL_MAIN: string;

type Name =  {
        firstName: string,
        lastName: string
}

type Address = {
houseNumber: string,
area: string,
city: string,
pin: number
}


enum Roles {
ADMIN = 'Admin',
CUSTOMER = 'Customer',
SUPER_ADMIN = 'Super-Admin'
}

type User = {
id: number,
name: Name,
email: string,
password: string,
address: Address,
phone: number,
company: string,
website: string,
role: Roles,
}


// type Name = {
//         firstName: string;
//         lastName: string;
// };
    
// type Address = {
//         houseNumber: string;
//         area: string;
//         city: string;
//         pin: number;
// };
    
// enum Roles {
//         ADMIN = "Admin",
//         EMPLOYEE = "Employee",
//         CUSTOMER = "Customer"
// }
    
// class User {
//         id: number;
//         name: Name;
//         email: string;
//         password: string;
//         address: Address;
//         phone: number;
//         company: string;
//         website: string;
//         role: Roles;
    
//         constructor(
//             id: number,
//             name: Name,
//             email: string,
//             password: string,
//             address: Address,
//             phone: number,
//             company: string,
//             website: string,
//             role: Roles
//         ) {
//             this.id = id;
//             this.name = name;
//             this.email = email;
//             this.password = password;
//             this.address = address;
//             this.phone = phone;
//             this.company = company;
//             this.website = website;
//             this.role = role;
//         }
// }