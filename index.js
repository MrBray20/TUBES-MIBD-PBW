import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import express from 'express';
import path, { resolve } from 'path';
import mysql from 'mysql';
import crypto from 'crypto';
import multer from 'multer';
import session from 'express-session';
import cookiePerser from 'cookie-parser'
import { rejects } from 'assert';

const port = 8080;
const app = express();
app.use(cookiePerser());
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'), 
path.join(__dirname, 'views/Admin'),
path.join(__dirname, 'views/Warga'),
path.join(__dirname, 'views/RT'),
path.join(__dirname, 'views/RW'),
path.join(__dirname, 'views/KepDinas'),
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

const addPerioda = (conn,nama,tanggalmulai,tanggalberakhir) =>{
    return new Promise ((resolve,rejects) =>{
        conn.query(`INSERT INTO periodepemesanan (nama_perioda,tanggal_mulai,tanggal_berakhir) VALUES ('${nama}','${tanggalmulai}','${tanggalberakhir}')`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

const addProduk = (conn,nama,harga) =>{
    return new Promise ((resolve,rejects)=>{
        conn.query(`INSERT INTO kemasanmigor (nama_minyak,harga) VALUES ('${nama}','${harga}')`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        });
    });
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

const addUser = (conn,username,password,nama,role_u) => {
    return new Promise ((resolve, rejects) => {
        conn.query(`INSERT INTO users (username,pass,nama,role_u) VALUES ('${username}','${password}','${nama}','${role_u}')`,(err,result) =>{
            if(err){
                rejects(err);
            }else{
                resolve(result);
            }
        })
    })
}

const addRw = (conn,norw,namaketua,id_kel) => {
    return new Promise ((resolve,rejects) =>{
        conn.query(`INSERT INTO rw (no_rw,nama_ketua_rw,id_kel) VALUES ('${norw}','${namaketua}',${id_kel})`,(err,result)=>{
            if(err){
                rejects(err);
            }else{
                resolve(result);
            }
        })
    })
}

const addkecamatan = (conn,nama_kec) => {
    return new Promise((resolve, rejects) =>{
        conn.query(`INSERT INTO kecamatan (nama_kec) VALUES ('${nama_kec}')`,(err, result) =>{
            if(err){
                rejects(err);
            }else{
                resolve(result);
            }
        });
    });
};

const addkelurahan = (conn,nama_kel,id_kec) => {
    return new Promise((resolve, rejects) =>{
        conn.query(`INSERT INTO kelurahan (nama_kel,id_kec) VALUES ('${nama_kel}',${id_kec})`,(err, result) =>{
            if(err){
                rejects(err);
            }else{
                resolve(result);
            }
        });
    });
};

const getidKec = (conn,nama_kec) =>{
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT id_kec FROM kecamatan WHERE nama_kec LIKE '${nama_kec}'`,(err, result) =>{
            if(err){
                rejects(err);
            }else{
                resolve(result);
            }
        });
    });
};

const getidkel = (conn,nama_kel) =>{
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT id_kel FROM kelurahan WHERE nama_kel LIKE '${nama_kel}'`,(err, result) =>{
            if(err){
                rejects(err);
            }else{
                resolve(result);
            }
        });
    });
};

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
        else if(user[0].role_u==='staf'){
            res.redirect('homestaf')
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
        const {kecamatan} = req.body;
        console.log(req.body);
        const conn = await dbConnect();
        const user = await addkecamatan(conn,kecamatan);
        conn.release();
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
        const {kelurahan,kecamatan} = req.body;
        const conn = await dbConnect();
        const id_kec = await getidKec(conn,kecamatan);
        const user = await addkelurahan(conn,kelurahan,id_kec[0].id_kec);
        conn.release();
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
        const {norw,namaketua,username,password,kelurahan} = req.body
        var role = 'rw'
        var pass = password
        var hashpass = crypto.createHash('sha256').update(pass).digest('base64');
        const conn = await dbConnect();
        const id_kel = await getidkel(conn,kelurahan);
        const user = await addUser(conn,username,hashpass,namaketua,role);
        const addrw = await addRw(conn,norw,namaketua,id_kel[0].id_kel);
        conn.release();
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
        const {nama,username,password,role}=req.body
        const conn = await dbConnect();
        var sec = password;
        var hashpass = crypto.createHash('sha256').update(sec).digest('base64')
        const user = await addUser(conn,username,hashpass,nama,role);
        conn.release();
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
        const {namaproduk,harga} = req.body
        const conn = await dbConnect();
        const produk = await addProduk(conn,namaproduk,harga);
        conn.release();
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
        const {namaperiode,tanggalmulai,tanggalberakhir}=req.body
        const conn = await dbConnect();
        const periode = await addPerioda(conn,namaperiode,tanggalmulai,tanggalberakhir);
        conn.release();
        res.redirect('perioda');
    }else{
        res.redirect('/');
    }
});

app.get('/addrt',async (req,res)=>{
    if(req.user){
        res.render('addrt');
    }else{
        res.redirect('/');
    }
});
app.post('/addrt',async (req,res)=>{
    if(req.user){
        res.redirect('datart');
    }else{
        res.redirect('/');
    }
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

//RT
app.get('/',async (req,res)=>{
    res.render('login');
});
app.get('/homert',async (req,res)=>{
    res.render('homert');
});
app.get('/akunwarga',async (req,res)=>{
    res.render('akunwarga');
});
app.get('/datawarga',async (req,res)=>{
    res.render('datawarga');
});
app.get('/pesananwarga',async (req,res)=>{
    res.render('pesananwarga');
});

//RW
app.get('/',async (req,res)=>{
    res.render('login');
});
app.get('/homerw',async (req,res)=>{
    res.render('homerw');
});
app.get('/datart',async (req,res)=>{
    res.render('datart');
});
app.get('/statusrt',async (req,res)=>{
    res.render('statusrt');
});

//KepDinas
app.get('/',async (req,res)=>{
    res.render('login');
});
app.get('/homekepdin',async (req,res)=>{
    res.render('homekepdin');
});
app.get('/rekapitulasirw',async (req,res)=>{
    res.render('rekapitulasirw');
});
app.get('/rekapitulasikec',async (req,res)=>{
    res.render('rekapitulasikec');
});
app.get('/rekapitulasikel',async (req,res)=>{
    res.render('rekapitulasikel');
});
app.get('/grafikrw',async (req,res)=>{
    res.render('grafikrw');
});
app.get('/grafikkec',async (req,res)=>{
    res.render('grafikkec');
});
app.get('/grafikkel',async (req,res)=>{
    res.render('grafikkel');
});

var sec = 'staf123'
var hash = crypto.createHash('sha256').update(sec).digest('base64')
console.log(hash);