const express = require('express');
const router = express.Router();

const {createOwner, updateOwner, getOwner, getallOwners, deleteOwner} = require('../controllers/ownerController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/createowner',authMiddleware, createOwner);
router.put('/updateowner', authMiddleware, updateOwner);
router.get('/owner/:id', authMiddleware, getOwner);
router.get('/allowners', authMiddleware, getallOwners);
router.delete('/owner/:id', authMiddleware, deleteOwner);


module.exports = router;