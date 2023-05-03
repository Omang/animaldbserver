const Animal = require('../models/animalModel');
const Owner  = require('../models/ownerModel');
const Vaccination = require('../models/vaccinationModel');

const asyncHandler = require('express-async-handler');



const addAnimal = asyncHandler(async(req, res)=>{

    const {animal_name, animal_chip, 
          animal_breed, animal_type, 
          animal_color, animal_sex, owner_id} = req.body;
    try{
        
       
        const findowner = await Owner.findById(owner_id);

        if(findowner){

            const animal = await Animal.create({
                animal_name: animal_name, animal_chip: animal_chip, 
                animal_breed: animal_breed, animal_type: animal_type, 
                animal_color: animal_color, animal_sex: animal_sex,
                animal_owner: findowner._id.toString()
            });
            
            const updateowner  = await Owner.findByIdAndUpdate(owner_id, {
                $push: {owner_animals: animal._id.toString()}
               }, {new: true});

               res.json(animal);

        }else{

            res.json("create owner first");

        }


        

    }catch(error){

        throw new Error(error);

    }


});
const updateAnimal = asyncHandler(async(req, res)=>{

    const {animal_name, animal_chip, 
        animal_breed, animal_type, 
        animal_color, animal_sex, animal_id} = req.body;
  try{
      

          const animal = await Animal.findByIdAndUpdate(animal_id,{
              animal_name: animal_name, animal_chip: animal_chip, 
              animal_breed: animal_breed, animal_type: animal_type, 
              animal_color: animal_color, animal_sex: animal_sex 
          }, {new: true});

             res.json(animal);


  }catch(error){

      throw new Error(error);

  }


});
const switchAnimal = asyncHandler(async(req, res)=>{
    const {owner_id, new_ownerid} = req.body;
    const {id} = req.params;

    try{

        const current_owner = await Owner.findById(owner_id);
        const new_owner = await Owner.findById(new_ownerid);
        if(current_owner && new_owner){

           const  remove_animal = await Owner.findByIdAndUpdate(owner_id,{
                $pull:{owner_animals: id}
            }, {new: true});
           const add_animal = await Owner.findByIdAndUpdate(new_ownerid, {
            $push:{owner_animals: id}
           }, {new: true});

           res.json(add_animal);
        }

    }catch(error){
        throw new Error(error);
    }

});
const deleteAnimal = asyncHandler(async(req, res)=>{

    const {animal_id} = req.params;
    try{

        deleteanimal = await Animal.findByIdAndDelete(animal_id);
        res.json(deleteanimal);

    }catch(error){
        throw new Error(error);
    }

});
const getAnimal = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    
    try{

        const animal = await Animal.findById(id);
        if(animal.vaccinationdata){
            const animalx = await Animal.findById(id).populate("vaccinationdata");

            res.json(animalx)
        }else{
            
            res.json(animal);
        }

        

    }catch(error){
       throw new Error(error)
    }
});
const getallAnimals = asyncHandler(async(req, res)=>{

    try{

        allanimals = await Animal.find();
        res.json(allanimals);

    }catch(error){
        throw new Error(error);
    }

});

const allowneranimals= asyncHandler(async(req, res)=>{

    const {owner_id} = req.body;

    try{

        const owners_animals = await Owner.findById(owner_id).populate("owner_animals")

        res.json(owners_animals);

    }catch(error){
        throw new Error(error);
    }

});

const addpatientCard = asyncHandler(async(req, res)=>{

    const {animal_id, disease_name, vaccinated, by_name, 
        at_name, vaccinated_on, next_vaccination } = req.body;
    try{
        const find_animal = await Animal.findById(animal_id);
        
        if(find_animal){
            const add_disease = await Vaccination.create({

                disease_name:disease_name, vaccinated:vaccinated, by_name:by_name, 
        at_name:at_name, vaccinated_on:vaccinated_on, next_vaccination:next_vaccination
                
            });
            const link_disease = await Animal.findByIdAndUpdate(animal_id,{
                $push:{vaccinationdata: add_disease._id.toString()}
            }, {new:true});

            res.json(link_disease);
        }

    }catch(error){
        throw new Error(error);
    }

});

const getanimalOwner = asyncHandler(async(req, res)=>{
    const {id} = req.params;
     console.log(id);
    try{

        //const owner = await Animal.findById(id).populate("animal_owner");
       // console.log(owners);
     // var ObjectId = require('mongodb').ObjectID;

      //const oids =  new ObjectId(id);
      const theone = await Owner.find({ "owner_animals": {"$in" : [id]}});
      

      console.log(theone);

      res.json(theone);

        
       

    }catch(error)
    {
     throw new Error(error);
    }
})


module.exports ={addAnimal, updateAnimal, switchAnimal,
                deleteAnimal, getAnimal, getallAnimals, 
                allowneranimals, addpatientCard, getanimalOwner};