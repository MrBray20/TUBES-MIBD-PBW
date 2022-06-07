import express from 'express';
import path from 'path';
import mysql from 'mysql';
import crypto from 'crypto';
import multer from 'multer';
import session from 'express-session';
import cookiePerser from 'cookie-parser'

const port = 8080;
const app = express();
app.use(cookiePerser());
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

const generateAuthToken = () =>{
    return crypto.randomBytes(30).toString('hex');
}
const authTokens = {};

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

const getuser = (conn,username,pass) =>{
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT username, pass, role_u FROM users WHERE username LIKE '${username}' AND pass LIKE '${pass}'`,(err,result)=>{
            if(err){
                rejects(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

app.get('/',async (req,res)=>{
    res.render('login');
});

app.post('/home',async (req,res)=>{
    const{username ,password} = req.body
    const conn = await dbConnect();
    const hashpass = crypto.createHash('sha256').update(password).digest('base64')
    const user = await getuser(conn,username,hashpass);
    conn.release();
    if(user.length>0){
        const authToken = generateAuthToken();
        authTokens[authToken]=user
        res.cookie('AuthToken',authToken);
        if (user[0].role_u==='admin') {
            res.redirect('homeadmin')
        }
        else{
            res.redirect('/');
        }
    }
    else{
        console.log('tidak ad')
    }

    
});

app.use((req,res,next) =>{
    const authToken = req.cookies['AuthToken']
    req.user = authTokens[authToken];
    next();
})

app.get('/homeadmin',async (req,res)=>{
    if(req.user){
        res.render('homeadmin');
    }else{
        res.redirect('/');
    }
});

app.get('/logout',async (req,res)=>{
    const cookie = req.cookies;
    for (var i in cookie) {
        if (!cookie.hasOwnProperty(i)) {
            continue;
        }
        res.cookie(i, '',{expires: new Date(0)});
    }
    res.redirect('/');

});

app.get('/kecamatan',async (req,res)=>{
    if(req.user){
        res.render('kecamatan');
    }else{
        res.redirect('/');
    }
});
app.post('/kecamatan',async (req,res)=>{
    if(req.user){
        res.redirect('kecamatan');
    }else{
        res.redirect('/');
    }
});

app.get('/addkecamatan',async (req,res)=>{
    if(req.user){
        res.render('addkecamatan');
    }else{
        res.redirect('/');
    }
});

app.get('/kelurahan',async (req,res)=>{
    if(req.user){
        res.render('kelurahan');
    }else{
        res.redirect('/');
    }
});
app.post('/kelurahan',async (req,res)=>{
    if(req.user){
        res.redirect('kelurahan');
    }else{
        res.redirect('/');
    }
});
app.get('/addkelurahan',async (req,res)=>{
    if(req.user){
        res.render('addkelurahan');
    }else{
        res.redirect('/');
    }
});


app.get('/rw',async (req,res)=>{
    if(req.user){
        res.render('rw');
    }else{
        res.redirect('/');
    }
});
app.get('/addrw',async (req,res)=>{
    if(req.user){
        res.render('addrw');
    }else{
        res.redirect('/');
    }
});
app.post('/addrw',async (req,res)=>{
    if(req.user){
        res.redirect('rw');
    }else{
        res.redirect('/');
    }
});


app.get('/users',async (req,res)=>{
    if(req.user){
        res.render('users');
    }else{
        res.redirect('/');
    }
});
app.get('/adduser',async (req,res)=>{
    if(req.user){
        res.render('adduser');
    }else{
        res.redirect('/');
    }
});
app.post('/adduser',async (req,res)=>{
    if(req.user){
        res.redirect('users');
    }else{
        res.redirect('/');
    }
});


app.get('/produk',async (req,res)=>{
    if(req.user){
        res.render('produk');
    }else{
        res.redirect('/');
    }
});
app.get('/addproduk',async (req,res)=>{
    if(req.user){
        res.render('addproduk');
    }else{
        res.redirect('/');
    }
});
app.post('/addproduk',async (req,res)=>{
    if(req.user){
        res.redirect('produk');
    }else{
        res.redirect('/');
    }
});


app.get('/perioda',async (req,res)=>{
    if(req.user){
        res.render('perioda');
    }else{
        res.redirect('/');
    }
});
app.get('/addperioda',async (req,res)=>{
    if(req.user){
        res.render('addperioda');
    }else{
        res.redirect('/');
    }
});
app.post('/addperioda',async (req,res)=>{
    if(req.user){
        res.redirect('perioda');
    }else{
        res.redirect('/');
    }
});


app.listen(port,()=>{
    console.log('ready!');
});


// var sec = 'admin123'
// var hash = crypto.createHash('sha256').update(sec).digest('base64')
// console.log(hash);