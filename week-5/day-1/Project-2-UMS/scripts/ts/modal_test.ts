// Define Types
// type Name = {
//     firstName: string;
//     lastName: string;
// };

// type Address = {
//     houseNumber: string;
//     area: string;
//     city: string;
//     pin: number;
// };

// enum Roles {
//     ADMIN = "Admin",
//     EMPLOYEE = "Employee",
//     CUSTOMER = "Customer"
// }

// class User {
//     id: number;
//     name: Name;
//     email: string;
//     password: string;
//     address: Address;
//     phone: number;
//     company: string;
//     website: string;
//     role: Roles;

//     constructor(
//         id: number,
//         name: Name,
//         email: string,
//         password: string,
//         address: Address,
//         phone: number,
//         company: string,
//         website: string,
//         role: Roles
//     ) {
//         this.id = id;
//         this.name = name;
//         this.email = email;
//         this.password = password;
//         this.address = address;
//         this.phone = phone;
//         this.company = company;
//         this.website = website;
//         this.role = role;
//     }
// }

// Class for Managing User Form Operations
class UserForm {
    private modal: bootstrap.Modal;
    private userId: number | null = null; // Determines Add/Edit action

    constructor() {
        const modalElement = document.getElementById("addEmployeeModal") as HTMLElement;
        this.modal = new bootstrap.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false
        });

        this.setupFormSubmitHandler();
    }

    // **Populate Form for Editing**
    async editUser(id: number) {
        const userData = await getSingleUser(id);
        if (!userData) {
            console.error("User not found!");
            return;
        }

        this.userId = id; // Store user ID (null means "Add", non-null means "Edit")

        // Populate form fields
        (document.getElementById("firstName") as HTMLInputElement).value = userData.name.firstName;
        (document.getElementById("lastName") as HTMLInputElement).value = userData.name.lastName;
        (document.getElementById("email") as HTMLInputElement).value = userData.email;
        (document.getElementById("houseNumber") as HTMLInputElement).value = userData.address.houseNumber;
        (document.getElementById("area") as HTMLInputElement).value = userData.address.area;
        (document.getElementById("city") as HTMLInputElement).value = userData.address.city;
        (document.getElementById("pin") as HTMLInputElement).value = String(userData.address.pin);
        (document.getElementById("phone") as HTMLInputElement).value = String(userData.phone);
        (document.getElementById("role") as HTMLInputElement).value = userData.role;
        (document.getElementById("company") as HTMLInputElement).value = userData.company;
        (document.getElementById("website") as HTMLInputElement).value = userData.website;

        // Update modal UI
        (document.getElementById("modalHeader") as HTMLElement).innerText = "Edit Employee Data";
        (document.getElementById("submitBtn") as HTMLInputElement).value = "EDIT";

        this.modal.show(); // Show modal
    }

    // **Extract User Data from Form**
    private getUserFromForm(): User {
        const firstName = (document.getElementById("firstName") as HTMLInputElement).value.trim();
        const lastName = (document.getElementById("lastName") as HTMLInputElement).value.trim();
        const name: Name = {
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1)
        };

        const houseNumber = (document.getElementById("houseNumber") as HTMLInputElement).value.trim();
        const area = (document.getElementById("area") as HTMLInputElement).value.trim();
        const city = (document.getElementById("city") as HTMLInputElement).value.trim();
        const pin = parseInt((document.getElementById("pin") as HTMLInputElement).value.trim(), 10);
        const address: Address = { houseNumber, area, city, pin };

        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value.trim();

        const phone = parseInt((document.getElementById("phone") as HTMLInputElement).value.trim(), 10);
        const company = (document.getElementById("company") as HTMLInputElement).value.trim();
        const website = (document.getElementById("website") as HTMLInputElement).value.trim();

        const roleValue = (document.getElementById("roles") as HTMLInputElement).value.trim();
        const role = Object.values(Roles).includes(roleValue as Roles) ? (roleValue as Roles) : Roles.CUSTOMER;

        return new User(
            this.userId ?? Date.now() + Math.random(), // If `userId` is null, create a new ID
            name,
            email,
            password,
            address,
            phone,
            company,
            website,
            role
        );
    }

    // **Handle Form Submission (Add or Edit)**
    private async handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const userData = this.getUserFromForm();

        if (this.userId === null) {
            // Add new user
            await postData(userData);
        } else {
            // Edit existing user
            await putData(userData);
            this.userId = null; // Reset userId after edit
        }

        this.modal.hide(); // Close the modal
    }

    // **Setup Event Listener for Form Submission**
    private setupFormSubmitHandler() {
        const form = document.getElementById("addUserForm") as HTMLFormElement;
        form.addEventListener("submit", (event) => this.handleSubmit(event));
    }
}

// **Instantiate the UserForm class**
const usrForm = new UserForm();


