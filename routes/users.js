const express=require("express");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access:Public
 * Parameters:None 
 */

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by ID
 * Access:Public
 * Parameters:Id
 */

router.get("//:id",(req,res)=>{
    const {id} = req.params;

    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message:"User Not Found"
        })
    }
    return res.status(200).json({
        success:true,
        data: user
    })
})

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access:Public
 * Parameters:None
 */

router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;

    const user = users.find((each)=>each.id === id);

    if(user){
        return res.status(404).json({
            success:false,
            message:"A User Already Exists with the Given Id"
        })
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(201).json({
        success:true,
        data:users
    })
    
})

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user by id
 * Access:Public
 * Parameters:id
 */

router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const{data}=req.body;

    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message:"User Not Found"
        })
    };
    const updateUser = users.map((each)=>{
        if(each.id === id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success:true,
        data:updateUser
    })
})

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by id
 * Access:Public
 * Parameters:id
 */

router.delete("/:id",(req,res)=>{
    const {id}=req.params;

    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message:"User Not Found"
        })
    };

    const index = users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json({
        success:true,
        data:users 
    })
})

module.exports = router;