const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const {registerSuperuser, loginUser, addUser, profileUser,  
    updateUser, logout, updatePassword, getaUser, deleteaUser, blockUser, unblockUser, getallUser} = require('../controllers/authController');
//const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register_super', registerSuperuser);
router.post('/login', loginUser);
router.post('/adduser', authMiddleware, isAdmin, addUser);
router.get('/profile', profileUser);
router.put('/updateuser', authMiddleware, updateUser);
router.get('/getauser/:id', authMiddleware, getaUser);
router.get('/getallusers', authMiddleware, isAdmin, getallUser);
router.put('/blockuser/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblockuser/:id', authMiddleware, isAdmin, unblockUser);
router.put('/updatepassword', authMiddleware, updatePassword);
router.delete('/deleteuser/:id', authMiddleware, isAdmin, deleteaUser);
router.post('/logout', logout);


module.exports = router;