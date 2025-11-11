document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return;
    }

    fetch('http://localhost:3000/addContactData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Mesaj trimis cu succes!');
        } else {
            alert('Eroare: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('A apărut o eroare la trimiterea mesajului.');
    });
});