const asyncHandler = require('express-async-handler');
const { constants } = require('../constants');
const Contact = require('../models/contactModel');
// @desc get all contacts
// @path GET /api/contacts
// @access public
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// @desc get contact
// @path GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw Error('Contact not found');
    }
    res.status(200).json(contact);
});

// @desc create contact
// @path POST /api/contacts/
// @access public
const createContact = asyncHandler(async (req, res) => {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
        res.status(constants.VALIDATION_FAILED);
        throw Error('All fields are required');
    }
    const contact = await Contact.create({ email, phone, name });
    res.status(200).json(contact);
});

// @desc edit contact
// @path PUT /api/contacts/:id
// @access public
const editContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw Error('Contact not found');
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedContact);
});

// @desc delete contact
// @path DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw Error('Contact not found');
    }
    await Contact.findByIdAndRemove(id);
    res.status(200).json(contact);
});

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    editContact,
    deleteContact,
};
