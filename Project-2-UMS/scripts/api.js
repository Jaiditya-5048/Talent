class Api {
    static url = "http://localhost:3000/users/"

    // Funtion to get data from API using FETCH(GET)
    static async getUserData() {
        try {
            let response = await fetch(Api.url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching user data:", error);
            return [];
        }
    }

    // function to delete user and update the database using DELETE
    static async deleteUser(user_id, event) {
        if (event) event.preventDefault(); // Prevent default only if event exists

        console.log(user_id)
        debugger

        try {
            let response = await fetch(Api.url + user_id, { method: "DELETE" });

            if (response.ok) {
                console.log(`User with ID ${user_id} deleted successfully.`);
                loadTable();                                                    // Refresh the table after deletion
            } else {
                console.error(`Failed to delete user: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    // function to add user to database using PUT
    static async addUser(user_id, event) {
        if (event) event.preventDefault();

        fetch(Api.url + user_id, { method: "PUT" });
        let json = await response.json();
        return json;
    }

    // This function is used to add new user to database using API
    static async postData(userData) {
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log("User added successfully!");
                document.getElementById("userForm").reset();                    // Clear form // put this into dom class
                document.getElementById("submitBtn").disabled = true;           // Disable submit button again // put this into dom class
                loadTable(); // Refresh table
            } else {
                console.error("Failed to add user:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

}



// Api.getUserData().then(data => console.log(data)); // Fetch users

// Api.deleteUser(1); // Delete user with ID 1

// Api.updateUser(2, { name: "New Name", email: "new@example.com" }); // Update user with ID 2

// Api.postData({ name: "John Doe", email: "john@example.com" }); // Add a new user
