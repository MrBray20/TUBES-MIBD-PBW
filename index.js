import express from 'express';
import path from 'path';
import mysql from 'mysql';
import crypto from 'crypto';

const port = 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('public')));

const pool = mysql.createPool({
    user:'root',
    password:'',
    database:'tubesmibdpbw',
    host:'localhost',
    connectionLimit:10
});

const dbConnect = () =>{
    return new Promise((resolve,rejects)=>{
        pool.getConnection((err,conn)=>{
            if(err){
                rejects(err);
            }
            else{
                resolve(conn);
            }
        })
    })
}

const getuser = (conn,username,passs) =>{
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT username, password`)
    })
}

app.get('/',async (req,res)=>{
    res.render('login');
});

app.post('/home',async (req,res)=>{
    const{username ,password} = req.body

    const hashpass = crypto.createHash('sha256').update(password).digest('base64')
    console.log(hashpass)

    res.redirect('home');
});

app.get('/home',async (req,res)=>{
    res.render('home');
});

app.get('/logout',async (req,res)=>{
    res.render('login');
});

app.get('/kecamatan',async (req,res)=>{
    res.render('kecamatan');
});
app.post('/kecamatan',async (req,res)=>{
    res.redirect('kecamatan');
});
app.get('/addkecamatan',async (req,res)=>{
    res.render('addkecamatan');
});

app.get('/kelurahan',async (req,res)=>{
    res.render('kelurahan');
});
app.post('/kelurahan',async (req,res)=>{
    res.redirect('kelurahan');
});
app.get('/addkelurahan',async (req,res)=>{
    res.render('addkelurahan');
});


app.get('/rw',async (req,res)=>{
    res.render('rw');
});
app.get('/addrw',async (req,res)=>{
    res.render('addrw');
});
app.post('/addrw',async (req,res)=>{
    res.redirect('rw');
});


app.get('/users',async (req,res)=>{
    res.render('users');
});
app.get('/adduser',async (req,res)=>{
    res.render('adduser');
});
app.post('/adduser',async (req,res)=>{
    res.redirect('users');
});


app.get('/produk',async (req,res)=>{
    res.render('produk');
});
app.get('/addproduk',async (req,res)=>{
    res.render('addproduk');
});
app.post('/addproduk',async (req,res)=>{
    res.redirect('produk');
});


app.get('/perioda',async (req,res)=>{
    res.render('perioda');
});
app.get('/addperioda',async (req,res)=>{
    res.render('addperioda');
});
app.post('/addperioda',async (req,res)=>{
    res.redirect('perioda');
});


app.listen(port,()=>{
    console.log('ready!');
});


var sec = 'admin123'
var hash = crypto.createHash('sha256').update(sec).digest('base64')
console.log(hash);