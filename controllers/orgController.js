const Org = require('../models/orgModel');

const asyncHandler = require('express-async-handler');

const createOrg = asyncHandler(async(req, res)=>{

    const {org_name, org_description} = req.body;

    try{

        findfirst = await Org.findOne({org_name:org_name});
        if(!findfirst){
           addorg = await Org.create({
            org_name: org_name,
            org_description: org_description
           });
           res.json(addorg);
        }else{
            res.json('org exsits');
        }

    }catch(error){
        throw  new Error(error);
    }

});
const getOrg = asyncHandler(async(req, res)=>{
    const {id} = req.params;

    try{
        theorg = await Org.findById(id).populate('org_users');
        res.json(theorg);

    }catch(error){
        throw new Error(error);
    }
});

const updateOrg = asyncHandler(async(req, res)=>{

   // const {id} = req.params;
    
    const {id, org_name, org_description} = req.body;
    try{

        findid = await Org.findByIdAndUpdate(id, {
            org_name: org_name,
            org_description: org_description
        },{
            new: true
          });

          res.json(findid);


    }catch(error){
        throw new Error(error);

    }

});

const deleteOrg = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    try{
        deletedorg = await Org.findByIdAndDelete(id);

        res.json(deletedorg)

    }catch(error){
        throw new Error(error);
    }

});
const getallOrgs = asyncHandler(async(req, res)=>{
   try{
     const getallorg = await Org.find();
      
      res.json(getallorg);

     }catch(error){ 
     throw new Error(error);
    }
});

module.exports ={createOrg, getOrg, updateOrg, deleteOrg, getallOrgs};