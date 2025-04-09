const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '12345',
    database: 'db_receipt'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const receiptRoutes = require('./routes/receipts');

// Use routes
app.use('/api/users', userRoutes(db));
app.use('/api/transactions', transactionRoutes(db));
app.use('/api/receipts', receiptRoutes(db));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
