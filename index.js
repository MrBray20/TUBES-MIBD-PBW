import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import express from 'express';
import path from 'path';
import mysql from 'mysql';
import crypto from 'crypto';

const port = 8080;
const app = express();

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'), 
path.join(__dirname, 'views/Admin'),
path.join(__dirname, 'views/Warga'),
path.join(__dirname, 'views/StafPenjualan')]);
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
//Admin Page
app.get('/homeadmin',async (req,res)=>{
    res.render('homeadmin');
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

//StafPenjualanPage
app.get('/',async (req,res)=>{
    res.render('login');
});
app.get('/homestafpenjualan',async (req,res)=>{
    res.render('homestafpenjualan');
});
app.post('/homestaf',async (req,res)=>{
    res.redirect('homestaf');
});

app.get('/homestaf',async (req,res)=>{
    res.render('homestaf');
});

app.get('/logout',async (req,res)=>{
    res.render('login');
});
app.get('/kecamatan',async (req,res)=>{
    res.render('stafperiodepesanan');
});
app.get('/kelurahan',async (req,res)=>{
    res.render('stafstatuspembayaran');
});

//Warga
app.get('/',async (req,res)=>{
    res.render('login');
});
app.get('/homewarga',async (req,res)=>{
    res.render('homewarga');
});
app.post('/warga',async (req,res)=>{
    res.redirect('warga');
});

app.get('/warga',async (req,res)=>{
    res.render('warga');
});

app.get('/logout',async (req,res)=>{
    res.render('login');
});
app.get('/changepass',async (req,res)=>{
    res.render('changepass');
});
app.get('/beliminyak',async (req,res)=>{
    res.render('beliminyak');
});

var sec = 'admin123'
var hash = crypto.createHash('sha256').update(sec).digest('base64')
console.log(hash);