const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/addContactData', (req, res) => {
    const { name, email, message } = req.body;

    let contacts = [];
    if (fs.existsSync('contact.json')) {
        const data = fs.readFileSync('contact.json');
        contacts = JSON.parse(data);
    }

    contacts.push({ name, email, message });

    fs.writeFileSync('contact.json', JSON.stringify(contacts, null, 2));

    console.log('Contact Data:', { name, email, message });

    res.json({ success: true, message: 'Contact data received successfully' });
});


app.post('/loghin', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        const sessionId = new Date().getTime().toString();
        res.json({ success: true, sessionId });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.get('/getContactData', (req, res) => {
    const contactsFilePath = 'contact.json';

    if (fs.existsSync(contactsFilePath)) {
        const data = fs.readFileSync(contactsFilePath, 'utf-8');
        const contacts = JSON.parse(data);
        res.json({ success: true, contacts });
    } else {
        res.status(404).json({ success: false, message: 'No contact data found' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
