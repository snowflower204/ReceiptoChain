module.exports = function(db) {
    const express = require('express');
    const router = express.Router();

    // GET all receipts
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Receipts', (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(results);
        });
    });

    // POST a new receipt
    router.post('/', (req, res) => {
        const { TransactionID, QRcode, Status, Hash, PreviousHash } = req.body;
        db.query('INSERT INTO Receipts (TransactionID, QRcode, Status, Hash, PreviousHash) VALUES (?, ?, ?, ?, ?)',
            [TransactionID, QRcode, Status, Hash, PreviousHash],
            (err, results) => {
                if (err) return res.status(500).send(err);
                res.status(201).json({ id: results.insertId, TransactionID, QRcode, Status });
            });
    });

    return router;
};
