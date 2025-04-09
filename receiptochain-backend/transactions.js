module.exports = function(db) {
    const express = require('express');
    const router = express.Router();

    // GET all transactions
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Transactions', (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(results);
        });
    });

    // POST a new transaction
    router.post('/', (req, res) => {
        const { UserID, Amount, PaymentMethod } = req.body;
        db.query('INSERT INTO Transactions (UserID, Amount, PaymentMethod) VALUES (?, ?, ?)',
            [UserID, Amount, PaymentMethod], 
            (err, results) => {
                if (err) return res.status(500).send(err);
                res.status(201).json({ id: results.insertId, UserID, Amount, PaymentMethod });
            });
    });

    return router;
};
