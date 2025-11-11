document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/loghin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('sessionId', data.sessionId);
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('welcomeMessage').style.display = 'block';

            fetch('http://localhost:3000/getContactData')
            .then(response => response.json())
            .then(contactData => {
                if (contactData.success) {
                    const contactContainer = document.getElementById('contactData');
                    localStorage.setItem('contacts', JSON.stringify(contactData.contacts)); // adaugare areay in local storage
                    contactData.contacts.forEach(contact => {
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.innerHTML = `
                            <p><strong>Name:</strong> ${contact.name}</p>
                            <p><strong>Email:</strong> ${contact.email}</p>
                            <p><strong>Message:</strong> ${contact.message}</p>
                            <hr>
                        `;
                        contactContainer.appendChild(card);
                    });
                } else {
                    console.error(contactData.message);
                }
            })
            .catch(error => console.error('Error fetching contact data:', error));
        } else {
            // alert('Invalid username or password');
            window.location.href = '404.html';
        }
    })
    .catch(error => console.error('Error logging in:', error));
});


//logout button
document.getElementById('logoutButton').addEventListener('click', function(event) {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('contacts');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('welcomeMessage').style.display = 'none';
    document.getElementById('contactData').innerHTML = '';
});