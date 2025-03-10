const express=require('express');
const Port=3500;
const app=express();
const cors=require('cors');
app.use(cors())
app.use(express.json())
const books=require('./novels.js')

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.get('/books',(req,res)=>{
    res.json(books)
})
app.get('/books/:id',(req,res)=>{
    const bookdId=parseInt(req.params.id);
    console.log('bookdId',bookdId);
    const book=books.find(book=>book.id===bookdId);
    if(!book){
        res.status(404).json({message:'Novel not found'})
    }
    else{
        res.json(books);
    }
    // res.json(books)
})

app.put('/books/:id',(req,res)=>{
    console.log(req.body);
    const bookdId=parseInt(req.params.id);
    console.log('bookdId',bookdId);
    const bookIndex=books.findIndex(book=>book.id===bookdId);
    if(bookIndex===-1){
        res.status(404).json({message:'Novel not found'})
    }
    else{
        books[bookIndex]={id:bookdId,...req.body};

        res.json(books[bookIndex])
    }
    // res.json(books)
})
app.delete('/books/:id',(req,res)=>{
    // console.log(req);
    let delid=parseInt(req.params.id);
    let bookindex=books.findIndex(data=>data.id===delid);
    if(-1!==bookindex){
        books.splice(bookindex,1);
        res.json(books);
    }
    else{
        res.status(404).json({message:'book not find'});
    }

})
app.listen(Port,()=>{
    console.log("server is running at port 3500");
})













