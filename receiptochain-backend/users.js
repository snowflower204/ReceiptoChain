module.exports = function(db) {
    const express = require('express');
    const router = express.Router();

    // GET all users
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Users', (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(results);
        });
    });

    // GET a single user by ID
    router.get('/:id', (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM Users WHERE UserID = ?', [id], (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).send('User not found');
            res.status(200).json(results[0]);
        });
    });

    // POST a new user
    router.post('/', (req, res) => {
        const { Name, Email, Password, Role } = req.body;
        db.query('INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)', 
            [Name, Email, Password, Role], 
            (err, results) => {
                if (err) return res.status(500).send(err);
                res.status(201).json({ id: results.insertId, Name, Email, Role });
        });
    });

    // PUT (update) a user by ID
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const { Name, Email, Password, Role } = req.body;
        db.query('UPDATE Users SET Name = ?, Email = ?, Password = ?, Role = ? WHERE UserID = ?',
            [Name, Email, Password, Role, id], 
            (err, results) => {
                if (err) return res.status(500).send(err);
                res.status(200).json({ id, Name, Email, Role });
            });
    });

    // DELETE a user by ID
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM Users WHERE UserID = ?', [id], (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).send('User deleted successfully');
        });
    });

    return router;
};
