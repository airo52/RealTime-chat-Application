const express = require('express');
const socketio = require('socket.io');
const mysql = require('mysql');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const router = require('./router');
const http = require('http');
const {addUser,getUser,getUsersInRoom,removeUser} = require('./users.js');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
 
app.use(cors({credentials: true, origin: 'http://localhost:4000'}));
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'tony',
    database:'nodejschat'
    
});

app.get('/User',(req,res)=>{
    const {phone} =req.query;
    const SELECT = `SELECT avatar FROM users WHERE phone = ${phone}`;
     con.query(SELECT,(err,rows)=>{
         if(err){
             console.log(err);
         }
         res.send(rows[0].avatar);
     })
})

app.get('/Users',(req,res)=>{
    const {phone} =req.query;
    const users = `SELECT * FROM users WHERE phone !='${phone}'`;

    con.query(users,(err,rows)=>{
         if(err){
             console.log(err);
         }
         else{
             res.send(rows);
         }
    })
})

app.get('/Login',(req,res)=>{
    const {username,password}=req.query;
    //res.send(username);
    //console.log(username,password);


    con.query('SELECT * FROM users WHERE username=?',username,function(err,rows){
        if(err){
            con.end;
            console.log(err);
        }
        if(!rows.length){
            res.send('NO user FOUND');
            

        }
        if(rows.length){
        
            if(password,rows[0].password !== password){
                res.send('wrong password');
            }else{
                return res.json({
                    feedback:'logged',phone:rows[0].phone,
                
             });

            }

        }
        
    });

});


io.on('connection',(socket) =>{
   // console.log('we have anew connection!!');
   socket.on('joins',({name,room},callback) =>{

    const {error,user}=addUser({id:socket.id,name,room});
    if(error) return callback(error);

    //console.log()
    //socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`});
   // socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined`});
    socket.join(user.room);
    
    callback();

   });

    socket.on('typing',(selectedUser,rroom)=>{
       // io.to(selectedUser).emit('typing',{rroom});
        //socket.broadcast.to(selectedUser).emit('message',{user:'admin',text:`typing`});
    })

    socket.on('typingStop',(selectedUser,rroom)=>{
        io.to(selectedUser).emit('stoped',{rroom});
    })
    socket.on('live',(user,loged)=>{
        const find = getUser(user);
            if(find){
                const feed='online';
                io.to(loged).emit('mes',{feed:feed});
            //console.log(find.room);
            }else{
                const feed='offline';
                io.to(loged).emit('mes',{feed:feed});
            //console.log('ofline');
            }
    
    })
   socket.on('sendMessage',(message,to,from,callback) =>{
       //const user = getUser(socket.id); 
        io.to(to).emit('message',{receiver:to,sender:from,text:message});
        io.to(from).emit('message',{receiver:to,sender:from,text:message});
        const insert = `INSERT INTO messagee (receiver,sender,text) VALUES ('${to}','${from}','${message}');`
        
         con.query(insert,(err,result)=>{
             if(err){
                 console.log(err);
             }
             else{
                 //console.log('inserted');
             }
         })
         callback();

   })
   
   


   app.get('/message',(req,res)=>{
       const {user} = req.query;
    // {logeDuser,friend} = req.query;
    const SELECT = `SELECT * FROM messagee`;
     con.query(SELECT,(err,rows)=>{
        if(err){
            console.log(err);
        }
              
     res.send(rows)
          
     })
})     


socket.on('disconnect',()=>{
 const user = removeUser(socket.id);
 if(user){
 io.to(user.room).emit('message',{text:`${user.name} has left !`}); 
       }
})
})


app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
