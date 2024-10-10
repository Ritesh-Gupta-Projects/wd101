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
    if (age < 18 || age > 55) {
        alert('Age should be between 18 and 55.');
        return;
    }
    const userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        termsAccepted: termsAccepted
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    displayUserData();
    document.getElementById('registrationForm').reset();
});

function displayUserData() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        const user = JSON.parse(storedData);
        const tableBody = document.querySelector('#userTable tbody');
        tableBody.innerHTML = `
            <tr>
                <td class="border border-gray-200 px-4 py-2">${user.name}</td>
                <td class="border border-gray-200 px-4 py-2">${user.email}</td>
                <td class="border border-gray-200 px-4 py-2">${user.password}</td>
                <td class="border border-gray-200 px-4 py-2">${user.dob}</td>
                <td class="border border-gray-200 px-4 py-2">${user.termsAccepted}</td>
            </tr>
        `;
    }
}

