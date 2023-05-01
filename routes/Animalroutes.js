const express = require('express');
const router = express.Router();

const {addAnimal, updateAnimal, switchAnimal, deleteAnimal, getAnimal,
     getallAnimals, addpatientCard, getanimalOwner} = require('../controllers/animalsController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/addanimal', authMiddleware, addAnimal);
router.put('/update_animal', authMiddleware, updateAnimal);
router.put('/switchanimal/:id', authMiddleware, switchAnimal);
router.get('/getanimal/:id', authMiddleware, getAnimal);
router.get('/getallanimals', getallAnimals);
router.get('/getanimalowner/:id', getanimalOwner);
router.put('/addpatientcard', authMiddleware, addpatientCard);

module.exports = router;