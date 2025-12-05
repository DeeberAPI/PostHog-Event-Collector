const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let events = [];

// Endpoint to collect events
app.post('/event', (req, res) => {
    const event = req.body;
    if (!event.name) {
        return res.status(400).json({ error: 'Event must have a name' });
    }
    events.push(event);

    // Optional: save events to a file
    fs.writeFileSync('events.json', JSON.stringify(events, null, 2));

    res.json({ status: 'Event received', event });
});

// Endpoint to get all events
app.get('/events', (req, res) => {
    res.json(events);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
