const express=require('express')
const app=express()
const mysql=require('mysql2')
const cors=require('cors')
//require("dotenv").config()


const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'soumik',
    database:'emp_db'
})
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{

    res.send("hello from express")
})
app.post('/create',(req,res)=>{
    const emp_name=req.body.emp_name
    const emp_age=req.body.emp_age
    const emp_position=req.body.emp_position
    const emp_salary=req.body.emp_salary
    db.query('INSERT INTO emp_table(emp_name, emp_age, emp_position, emp_salary) VALUES(?,?,?,?);', 
    [emp_name, emp_age, emp_position, emp_salary], (err, result)=>{
        if(err) console.log(err)
        else res.send("Values Inserted")
    })
})

app.get('/getemp',(req,res)=>{

    db.query('SELECT * FROM emp_table;', (err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })

    
})


app.put('/updatenam',(req,res)=>{
    const id=req.body.id
    const emp_nam=req.body.emp_name
    db.query("UPDATE emp_table SET emp_name=? WHERE id=?;",[emp_nam, id], (err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.put('/updateage',(req,res)=>{
    const id=req.body.id
    const emp_age=req.body.emp_age
    db.query("UPDATE emp_table SET emp_age=? WHERE id=?;",[emp_age, id], (err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.put('/updatepos',(req,res)=>{
    const id=req.body.id
    const emp_pos=req.body.emp_position
    db.query("UPDATE emp_table SET emp_position=? WHERE id=?;",[emp_pos, id], (err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.put('/updatesal',(req,res)=>{
    const id=req.body.id
    const emp_sal=req.body.emp_sal
    db.query("UPDATE emp_table SET emp_salary=? WHERE id=?;",[emp_sal, id], (err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})


//delete
app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id
    db.query("DELETE FROM emp_table WHERE id=?;", id,(err, result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
    
})
app.listen(process.env.PORT || 5000,()=>{
    console.log("App running on server")
})