const express=require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access:Public
 * Parameters:None 
 */
router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get single book by ID
 * Access:Public
 * Parameters:Id
 */

router.get("/:id",(req,res)=>{
    const {id} = req.params;

    const book = books.find((each)=>each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message:"Book Not Found"
        })
    }
    return res.status(200).json({
        success:true,
        data: book
    })
})

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access:Public
 * Parameters:None
 */

router.get("/issued/by-user",(req,res)=>{
    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    })

    const issuedBooks =[];

    userWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id === each.issuedBook)

        book.issuedBy=each.name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;

        issuedBooks.push(book);
    })

    if(issuedBooks.length === 0)
        return res.status(404).json({
        success: false,
        message:"No books issued yet",
    });

    return res.status(200).json({
        success:true,
        data:issuedBooks
    })


})

/**
 * Route: /books
 * Method: POST
 * Description: Create a new book
 * Access:Public
 * Parameters:None
 */

router.post("/",(req,res)=>{
    const {id,name,author,genre,price,publisher} = req.body;

    const book = books.find((each)=>each.id === id);

    if(book){
        return res.status(404).json({
            success:false,
            message:"Book Already Exists with the Given Id"
        })
    }
    books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    });
    return res.status(201).json({
        success:true,
        data:books
    })
    
})

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book by id
 * Access:Public
 * Parameters:id
 */

router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const{data}=req.body;

    const book = books.find((each)=>each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message:"Book does not exist for given ID"
        })
    };
    const updateData = books.map((each)=>{
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
        data:updateData
    })
})



module.exports = router; 