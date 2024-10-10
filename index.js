document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Validate age
    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55.');
        return;
    }

    // Get existing users from localStorage or create an empty array if none exists
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Create a new user object
    const newUser = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        termsAccepted: termsAccepted
    };

    // Add the new user to the array
    users.push(newUser);

    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Display updated data in the table
    displayUserData();

    // Clear the form
    document.getElementById('registrationForm').reset();
});

function displayUserData() {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; // Clear the table before displaying new data

    // Loop through stored users and create table rows
    storedUsers.forEach(user => {
        const row = `
            <tr>
                <td class="border border-gray-200 px-4 py-2">${user.name}</td>
                <td class="border border-gray-200 px-4 py-2">${user.email}</td>
                <td class="border border-gray-200 px-4 py-2">${user.password}</td>
                <td class="border border-gray-200 px-4 py-2">${user.dob}</td>
                <td class="border border-gray-200 px-4 py-2">${user.termsAccepted}</td>
            </tr>
        `;
        tableBody.innerHTML += row; // Append new rows for each user
    });
}

// Load saved data on page load
window.onload = function() {
    displayUserData();
};
