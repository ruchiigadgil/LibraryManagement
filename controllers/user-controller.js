const {UserModel,BookModel }= require("../models");
//Random message

exports.getAllUsers = async(req,res) =>{
    const users = await UserModel.find();

    if(users.length === 0){
        return res.status(404).json({
            success :false,
            message:"No User Found :-("
        })
    }else{
    return res.status(200).json({
        success:true,
        data: users
    })
    }
};

exports.getSingleUserById = async(req,res)=>{
    const {id}=req.params;

    const user=await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User Not Found"
        })
    }

    return res.status(200).json({
        success:true,
        data:user 
    })
};

exports.addNewUser = async(req,res)=>{
    const {data} = req.body;
    if(!data)
        return res.status(404).json({
    success: false,
    message: "No data provided :-(",
    })

    await UserModel.create(data);

    const allUsers = await UserModel.find()

    return res.status(201).json({
        success:true,
        data:allUsers
    })
    
}

exports.updateUserById = async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const updatedUser = await UserModel.findOneAndUpdate(
        {
            _id: id,
        },
            data ,
        {
            new: true
        })

    return res.status(200).json({
        success:true,
        data:updatedUser
    })
    
}

exports.deleteUser = async(req,res)=>{
    const {id} = req.params;

    const user= await UserModel.deleteOne({
        _id:id
    })

    if(!user)
        return res.status(404).json({
          success: false,
          message:"User Not Found :-(",  
    
    })

    return res.status(202).json({
        success:true,
        message: " User Deleted Successfully :-)",
    })
}

exports.getSubscriptionDetailsById = async(req,res)=>{
    const {id}=req.params; 
    // const user= users.find((each)=>each.id === id);
    // const user = await UserModel.find({
    //     _id:id
    // })
    const user = await UserModel.findById(id)
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

}