const express=require("express");
const {users} = require("../data/users.json");

const router = express.Router();
const {UserModel,BookModel }= require("../models");

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

router.get("/:id",(req,res)=>{
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


/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all usubscription details by Id
 * Access:Public
 * Parameters:Id
 */

router.get("/subscription-details/:id",(req,res)=>{
    const {id}=req.params; 
    const user= users.find((each)=>each.id === id);
    if(!user)
        return res.status(404).json({
            success:true,
            message:"User not Found",
        })

        const getDateInDays=(data = "") => {
            let date;
            if(data === ""){
                date=new Date();
            }else{
                date=new Date(data)
            }
            let days = Math.floor(date / (1000 * 60 * 60 * 24));
            return days;
        }

        const subscriptionType = (date)=>{
            if(user.subscriptionType === "Basic"){
                date=date+90
            }else if(user.subscriptionType === "Standard"){
                date=date+180
            }else if(user.subscriptionType === "Premium"){
                date=date+365
            }
            return date;
        }
        //Jan 1, 1970 UTC // milliseconds
        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate = getDateInDays(user.subscriptionDate);
        let subscriptionExpiration = subscriptionType(subscriptionDate)

        const data={
    ...user,
    subscriptionExpired : subscriptionExpiration < currentDate,
    daysLeftForExpiration:
    subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration -currentDate,
    fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 :0 

    }
    return res.status(200).json({
        success:true,
        data,
    })
})




module.exports = router;