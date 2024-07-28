const {UserModel,BookModel }= require("../models");

// router.get("/",(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:books
//     })
// })

exports.getAllBooks = async(req,res) =>{
    const books = await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success :false,
            message:"No Book Found :-("
        })
    }else{
    return res.status(200).json({
        success:true,
        data: books
    })
    }
};

exports.getSingleBookById =() =>{};
//module.exports ={getAllBooks,getSingleById};