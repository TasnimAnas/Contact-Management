const express = require('express');

const router = express.Router();
const {
    getAllContacts,
    getContact,
    createContact,
    editContact,
    deleteContact,
} = require('../controllers/contactController');

router.route('/').get(getAllContacts).post(createContact);

router.route('/:id').get(getContact).delete(deleteContact).put(editContact);
module.exports = router;
