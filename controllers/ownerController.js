const Owner = require('../models/ownerModel');

const asyncHandler = require('express-async-handler');



const createOwner = asyncHandler(async(req, res)=>{

    const {first_name, last_name, email, gender, mobile, plot_num, street_map} = req.body;
    try{
        const loginUserId = req?.user?._id;
        const owner = await Owner.create({
            first_name: first_name, last_name: last_name, email:email, gender: gender, mobile:mobile,
            address:{plot_num: plot_num, street_map: street_map},
            created_by: loginUserId 
        });
     res.json(owner);

    }catch(error){
        throw new Error(error);
    }

});

const updateOwner = asyncHandler(async(req, res)=>{

    
    const {owner_id, first_name, last_name, email, gender, mobile, plot_num, street_map } = req.body;
    try{
        const loginUserId = req?.user?._id;
        const owner = await Owner.findByIdAndUpdate(owner_id, {
            first_name: first_name, last_name: last_name, email:email, gender: gender, mobile:mobile,
            address:{plot_num: plot_num, street_map: street_map},
            updated_by: loginUserId 
        },{new: true});
        res.json(owner);

    }catch(error){
        throw new Error(error);
    }

});

const getOwner = asyncHandler(async(req, res)=>{

    const {id} = req.params;
    console.log(id);

    try{
        const owner = await Owner.findById(id);
        if(owner.owner_animals){
            const ownerx = await Owner.findById(id).populate("owner_animals");
            res.json(ownerx);
        }else{
            res.json(owner);
        }
        
        
    }catch(error){
        throw new Error(error);
    }

});

const getallOwners = asyncHandler(async(req, res)=>{
         
    const loginUserId = req?.user?._id;
    try{
        
     const allowners = await Owner.find({created_by:loginUserId});

     res.json(allowners);

    }catch(error){
        throw new Error(error);
    }

});

const deleteOwner = asyncHandler(async(req, res)=>{

    const {owner_id} = req.params;

    try{
        const deleteditem = await Owner.findByIdAndDelete(owner_id);
        res.json(deleteditem);

    }catch(error){
        throw new Error(error);
    }

});


module.exports = {createOwner, updateOwner, getOwner, getallOwners, deleteOwner};