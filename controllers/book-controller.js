const {UserModel,BookModel }= require("../models");
const IssuedBook = require("../dtos/book-dto");
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

exports.getSingleBookById = async(req,res)=>{
    const {id}=req.params;

    const book=await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book Not Found"
        })
    }

    return res.status(200).json({
        success:true,
        data:book 
    })
}

exports.getAllIssuedBooks= async(req,res)=>{
    // const userWithIssuedBooks = users.filter((each)=>{
    //     if(each.issuedBook) return each;
    // })

    const users=await UserModel.find({
        issuedBook:{$exists:true},
    }).populate("issuedBook")
    // const issuedBooks =[];

    // userWithIssuedBooks.forEach((each)=>{
    //     const book = books.find((book)=>book.id === each.issuedBook)

    //     book.issuedBy=each.name;
    //     book.issuedDate=each.issuedDate;
    //     book.returnDate=each.returnDate;

    //     issuedBooks.push(book);
    // })

    const issuedBooks = users.map((each)=> new IssuedBook(each));
    if(issuedBooks.length === 0)
        return res.status(404).json({
        success: false,
        message:"No books issued yet",
    });

    return res.status(200).json({
        success:true,
        data:issuedBooks
    })
}

exports.addNewBook = async(req,res)=>{
    const {data} = req.body;
    if(!data)
        return res.status(404).json({
    success: false,
    message: "No data provided :-(",
    })

    await BookModel.create(data);

    const allBooks = await BookModel.find()

    return res.status(201).json({
        success:true,
        data:allBooks
    })
    
}

exports.updateBookById = async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    // const book = books.find((each)=>each.id === id);
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            _id: id,
        },
            data ,
        {
            new: true
        })

    if(!book){
        return res.status(404).json({
            success: false,
            message:"Book does not exist for given ID"
        })
    };
    // const updateData = books.map((each)=>{
    //     if(each.id === id){
    //         return {
    //             ...each,
    //             ...data,
    //         }
    //     }
    //     return each;
    // })
    return res.status(200).json({
        success:true,
        data:updateBook
    })
    
}


//module.exports ={getAllBooks,getSingleById};