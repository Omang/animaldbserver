const express = require('express');
const router = express.Router();

const {createOrg, getOrg, updateOrg, deleteOrg, getallOrgs} = require('../controllers/orgController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/createorg',authMiddleware, isAdmin, createOrg);
router.get('/getorg/:id', authMiddleware, isAdmin, getOrg);
router.get('/getallorgs', authMiddleware, isAdmin, getallOrgs);
router.put('/updateorg', authMiddleware, isAdmin, updateOrg);
router.delete('/deleteorg', authMiddleware, isAdmin, deleteOrg);

module.exports = router;