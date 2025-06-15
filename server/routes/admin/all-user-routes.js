const express = require('express');
const { getAllClients } = require('../../controllers/admin/all-user-controller'); // adjust path as needed
const { authMiddleware } = require('../../controllers/auth/auth-controller');

const router = express.Router();

// Protect this route so only authenticated users (admins) can access it
router.get('/clients', authMiddleware, getAllClients);

module.exports = router;
