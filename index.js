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
import { read } from 'fs';
import { render } from 'ejs';

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
    dateStrings: true,
    connectionLimit:10
    // port: 3307
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

const getPerioda = (conn) =>{
    return new Promise((resolve,rejects)=>{
        conn.query('SELECT * FROM periodepemesanan',(err,result)=>{
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
};

const getproduk= (conn)=>{
    return new Promise((resolve,rejects)=>{
        conn.query(`SELECT * FROM kemasanmigor`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

const getuser = (conn,username,pass) =>{
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT id_U ,username, pass,nama, role_u FROM users WHERE username LIKE '${username}' AND pass LIKE '${pass}'`,(err,result)=>{
            if(err){
                rejects(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getuserall = (conn,username,pass) =>{
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT * FROM users `,(err,result)=>{
            if(err){
                rejects(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getiduser = (conn,nama) =>{
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT id_U FROM users WHERE username LIKE '${nama}'`,(err,result)=>{
            if(err){
                rejects(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

const getrw = (conn) =>{
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT * FROM viewrw `,(err,result)=>{
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

const addRw = (conn,norw,namaketua,id_kel,id_u) => {
    return new Promise ((resolve,rejects) =>{
        conn.query(`INSERT INTO rw (no_rw,nama_ketua_rw,id_kel,id_u) VALUES ('${norw}','${namaketua}',${id_kel},${id_u})`,(err,result)=>{
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

const getkecamatan = (conn) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`SELECT * FROM kecamatan `,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getkelurahan = (conn) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`SELECT * FROM kelurahan_data`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        });
    });
};

const deletekec = (conn,id) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`DELETE FROM kecamatan WHERE id_kec = ${id}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            };
        });
    });
};

const deletekel = (conn,nama_kel) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`DELETE FROM kelurahan WHERE nama_kel = '${nama_kel}'`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            };
        });
    });
};

const deleterwbyid = (conn,id) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`DELETE FROM rw WHERE id_kel = ${id}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            };
        });
    });
};

const deleterw = (conn,id) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`DELETE FROM rw WHERE id_u = ${id}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            };
        });
    });
};

const deleteuser = (conn,id) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`DELETE FROM users WHERE id_U = ${id}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            };
        });
    });
};

const deleteproduk = (conn,id_produk) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`DELETE FROM kemasanmigor WHERE id_migor = ${id_produk}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            };
        });
    });
};

const deleteperioda = (conn,id_perioda) =>{
    return new Promise((resolve,rejects) =>{
        conn.query(`DELETE FROM periodepemesanan WHERE id_perioda = ${id_perioda}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            };
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
            res.redirect('homestafpenjualan')
        }
        else if(user[0].role_u==='kepaladinas'){
            res.redirect('homekepdin')
        }
        else if(user[0].role_u==='rw'){
            res.redirect('homerw')
        }
        else if(user[0].role_u==='rt'){
            res.redirect('homert')
        }
        else if(user[0].role_u==='warga'){
            const hashuser = crypto.createHash('sha256').update(username).digest('base64')
            if(hashpass===hashuser){
                res.redirect('changepass')
            }
            else{
                res.redirect('homewarga')
            }
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
});

app.use((req,res,next) =>{
    const authToken = req.cookies['AuthToken']
    req.user = authTokens[authToken];
    next();
})

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

app.get('/homeadmin',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        
        res.render('homeadmin');
    }else{
        res.redirect('/');
    }
});


app.get('/kecamatan',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const conn = await dbConnect();
        const kecamatan = await getkecamatan(conn);
        conn.release();
        res.render('kecamatan',{
            kecamatan:kecamatan
        });
    }else{kelurahan
        res.redirect('/');
    }
});
app.post('/kecamatan',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {kecamatan} = req.body;
        const conn = await dbConnect();
        const user = await addkecamatan(conn,kecamatan);
        conn.release();
        res.redirect('kecamatan');
    }else{
        res.redirect('/');
    }
});

app.get('/addkecamatan',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        res.render('addkecamatan');
    }else{
        res.redirect('/');
    }
});

app.get('/kecamatan/hapus/(:id)',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {id}=req.params
        const conn =await dbConnect();
        const hapueskec = await deletekec(conn,id);
        conn.release();
        res.redirect('/kecamatan');
    }else{
        res.redirect('/');
    }
});

const updateKec = (conn,id_kec,newnama)=>{
    return new Promise((resolve,rejects)=>{
        conn.query(`UPDATE kecamatan SET nama_kec = '${newnama}' WHERE id_kec = ${id_kec}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            };
        });
    });
};

app.get('/kecamatan/edit/(:nama)',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {nama} = req.params
        const conn = await dbConnect();
        const id = await getidKec(conn,nama);
        conn.release();
        res.render('editkecamatan')
    }else{
        res.redirect('/');
    }
});


app.get('/kelurahan',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const conn = await dbConnect();
        const kelurahan = await getkelurahan(conn);
        conn.release();
        res.render('kelurahan',{
            kelurahan:kelurahan
        });
    }else{
        res.redirect('/');
    }
});

app.post('/kelurahan',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
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
    if(req.user && req.user[0].role_u ==='admin'){
        res.render('addkelurahan');
    }else{
        res.redirect('/');
    }
});

app.get('/kelurahan/hapus/(:nama_kel)/',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {nama_kel} = req.params
        const conn = await dbConnect();
        const idkel = await getidkel(conn,nama_kel);
        const hapusrw = await deleterwbyid(conn,idkel[0].id_kel);
        const hapuskel = await deletekel(conn,nama_kel);
        conn.release();
        res.redirect('/kelurahan');
    }else{
        res.redirect('/');
    }
});

app.get('/rw',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const conn = await dbConnect();
        const rw_data = await getrw(conn);
        conn.release();
        res.render('rw',{
            rw_data:rw_data
        });
    }else{
        res.redirect('/');
    }
});
app.get('/addrw',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        res.render('addrw');
    }else{
        res.redirect('/');
    }
});
app.post('/addrw',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {norw,namaketua,username,password,kelurahan} = req.body
        var role = 'rw'
        var pass = password
        var hashpass = crypto.createHash('sha256').update(pass).digest('base64');
        const conn = await dbConnect();
        const id_kel = await getidkel(conn,kelurahan);
        const user = await addUser(conn,username,hashpass,namaketua,role);
        const getid = await getiduser(conn,username);
        const addrw = await addRw(conn,norw,namaketua,id_kel[0].id_kel,getid[0].id_U);
        conn.release();
        res.redirect('rw');
    }else{
        res.redirect('/');
    }
});

app.get('/rw/hapus/(:id_u)',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {id_u}=req.params
        const conn = await dbConnect();
        const hapusrw = await deleterw(conn,id_u);
        conn.release();
        res.redirect('/rw');
    }else{
        res.redirect('/');
    }
});

app.get('/users',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const conn = await dbConnect();
        const users = await getuserall(conn);
        conn.release();
        res.render('users',{
            users:users
        });
    }else{
        res.redirect('/');
    }
});
app.get('/adduser',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        res.render('adduser');
    }else{
        res.redirect('/');
    }
});
app.post('/adduser',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
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

app.get('/users/hapus/(:id_u)',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {id_u}=req.params
        const conn = await dbConnect();
        const hapusrw = await deleteuser(conn,id_u);
        conn.release();
        res.redirect('/users');
    }else{
        res.redirect('/');
    }
});


app.get('/produk',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const conn = await dbConnect();
        const produk = await getproduk(conn);
        conn.release();
        res.render('produk',{
            produk:produk
        });
    }else{
        res.redirect('/');
    }
});
app.get('/addproduk',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
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

app.get('/produk/hapus/(:id_produk)',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {id_produk}=req.params
        const conn = await dbConnect();
        const hapusrw = await deleteproduk(conn,id_produk);
        conn.release();
        res.redirect('/produk');
    }else{
        res.redirect('/');
    }
});

app.get('/perioda',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const conn = await dbConnect();
        const perioda = await getPerioda(conn);
        conn.release();
        res.render('perioda',{
            perioda:perioda
        });
    }else{
        res.redirect('/');
    }
});
app.get('/addperioda',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        res.render('addperioda');
    }else{
        res.redirect('/');
    }
});
app.post('/addperioda',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {namaperiode,tanggalmulai,tanggalberakhir}=req.body
        const conn = await dbConnect();
        const periode = await addPerioda(conn,namaperiode,tanggalmulai,tanggalberakhir);
        conn.release();
        res.redirect('perioda');
    }else{
        res.redirect('/');
    }
});

app.get('/perioda/hapus/(:id_perioda)',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='admin'){
        const {id_perioda}=req.params
        const conn = await dbConnect();
        const perioda = await deleteperioda(conn,id_perioda);
        conn.release();
        res.redirect('/perioda');
    }else{
        res.redirect('/');
    }
});





//StafPenjualan
app.get('/homestafpenjualan',async (req,res)=>{
    res.render('homestafpenjualan');
});
app.post('/homestaf',async (req,res)=>{
    res.redirect('homestaf');
});

app.get('/homestaf',async (req,res)=>{
    res.render('homestaf');
});

app.get('/stafperiodepesanan',async (req,res)=>{
    res.render('stafperiodepesanan');
});
app.get('/stafstatuspembayaran',async (req,res)=>{
    res.render('stafstatuspembayaran');
});

const getminyak = ((conn)=>{
    return new Promise((resolve,rejects)=>{
        conn.query(`SELECT * FROM kemasanmigor`,(err,result)=>{
            if(err){
                rejects(err);
            }else{
                resolve(result);
            }
        })
    })
})


const getperiode = ((conn)=>{
    return new Promise((resolve,rejects)=>{
        conn.query('SELECT * FROM periodepemesanan',(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
})

const updatepass = (conn,id,newpass)=>{
    return new Promise ((resolve,rejects)=>{
        conn.query(`UPDATE users SET pass = '${newpass}' WHERE id_U = ${id}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

const beliminyak =(conn,id_period,nama_migor,jumlah,harga,id_warga)=>{
    return new Promise ((resolve,rejects)=>{
        conn.query(`INSERT INTO pemesanan (id_period,nama_migor,jumlah,harga,id_warga) Values (${id_period},'${nama_migor}','${jumlah}','${harga}','${id_warga}')`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

const getnamaminyak = (conn,id_minyak) =>{
    return new Promise ((resolve,rejects)=>{
        conn.query(`SELECT nama_minyak,harga FROM kemasanmigor WHERE id_migor = ${id_minyak}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

const getidwarga = (conn,id_u) =>{
    return new Promise((resolve,rejects)=>{
        conn.query(`SELECT id_warga FROM warga WHERE id_u = ${id_u}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

const getviewpesanan = (conn,id_u) =>{
    return new Promise((resolve,rejects)=>{
        conn.query(`SELECT * FROM viewpesananwarga WHERE id_u = ${id_u}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

//Warga
app.get('/homewarga',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='warga'){
        const namasaya = req.user[0].nama;
        res.render('homewarga',{
            namasaya
        });
    }else{
        res.redirect('/');
    }
});
app.get('/pesanansaya',async (req,res)=>{
    
    if(req.user && req.user[0].role_u ==='warga'){
        const namasaya = req.user[0].nama;
        const conn = await dbConnect();
        const pesanansaya = await getviewpesanan(conn,req.user[0].id_U)
        console.log(req.user)
        res.render('pesanansaya',{
        pesanansaya,
        namasaya
        });
    }else{
        res.redirect('/');
    }
});

app.get('/warga',async (req,res)=>{
    res.render('warga');
});

app.get('/changepass',async (req,res)=>{
    if (req.user && req.user[0].role_u==="warga") {
        res.render('changepass');
    } else {
        res.redirect('/')
    }
});

app.post('/changepass',async(req,res)=>{
    if (req.user && req.user[0].role_u==="warga") {
        const {password,newpassword}=req.body
        const conn = await dbConnect();
        var hashpass = crypto.createHash('sha256').update(newpassword).digest('base64')
        const uppass = await updatepass(conn,req.user[0].id_U,hashpass);
        conn.release();
        res.redirect('homewarga');
    } else {
        res.redirect('/')
    }
})
app.get('/beliminyak',async (req,res)=>{
    if(req.user && req.user[0].role_u =='warga'){
        const conn = await dbConnect();
        const perioda = await getperiode(conn);
        const minyak = await getminyak(conn);
        conn.release();
        res.render('beliminyak',{
            minyak:minyak,
            perioda:perioda
        });
    }else{
        res.redirect('/')
    }
});

app.get('/formbeli',async(req,res)=>{
    if(req.user && req.user[0].role_u ==='warga'){
        const conn = await dbConnect();
        const perioda = await getperiode(conn);
        const minyak = await getminyak(conn);
        res.render('formbeli',{
        minyak:minyak,
        perioda:perioda
        });
    }else{
        res.redirect('/');
    }
});
    
app.post('/formbeli',async(req,res)=>{
    if(req.user && req.user[0].role_u ==='warga'){
        const{periodevalue,minyakgor,quantity} = req.body;
        const conn = await dbConnect();
        const nama = await getnamaminyak(conn,minyakgor);
        let harga = quantity * nama[0].harga
        const idwarga = await getidwarga(conn,req.user[0].id_U)
        const beli =await beliminyak(conn,periodevalue ,nama[0].nama_minyak,quantity,harga,idwarga[0].id_warga)
        conn.release();
        res.redirect('homewarga');
    }else{
        res.redirect('/');
    }
})

app.post('/beliminyak',async(req,res)=>{
    if (req.user && req.user[0].role_u==="warga") {
        console.log(req.body);
    } else {
        res.redirect('/')
    }
})

const getwarga = (conn,idrt) =>{
    return new Promise ((resolve,rejects)=>{
        conn.query(`SELECT * FROM viewwarga WHERE id_rt = ${idrt}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

const getidrt = (conn,id_u) =>{
    return new Promise ((resolve,rejects)=>{
        conn.query(`SELECT id_rt FROM rt WHERE id_u = ${id_u}`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}

const addwarga = (conn,nama_warga,id_rt,id_u) =>{
    return new Promise ((resolve,rejects)=>{
        conn.query(`INSERT INTO warga (nama_warga,id_rt,id_u) VALUES ('${nama_warga}',${id_rt},${id_u})`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
}


//RT
app.get('/homert',async (req,res)=>{
    if (req.user && req.user[0].role_u === 'rt') {
        const namasaya = req.user[0].nama;
        res.render('homert',{
            namasaya
        });
    } else {
        res.redirect('/')
    }
});
app.get('/akunwarga',async (req,res)=>{
    res.render('akunwarga');
});
app.get('/datawarga',async (req,res)=>{
    
    if (req.user&& req.user[0].role_u==='rt') {
        const namasaya = req.user[0].nama;
        const conn = await dbConnect();
        const idrt = await getidrt(conn,req.user[0].id_U);
        const datawarga = await getwarga(conn,idrt[0].id_rt);
        conn.release();
        res.render('datawarga',{
            datawarga:datawarga,
            namasaya
        });
    } else {
        
    }
});
app.post('/akunwarga',async (req,res)=>{
    if (req.user && req.user[0].role_u==='rt') {
        const role = "warga"
        const {namawarga,username,password} = req.body;
        const conn = await dbConnect();
        var hashpass = crypto.createHash('sha256').update(password).digest('base64');
        const adduser = await addUser(conn,username,hashpass,namawarga,role)
        const idrt = await getidrt(conn,req.user[0].id_U)
        const iduser = await getiduser(conn,username);
        const nambarwarga = await addwarga(conn,namawarga,idrt[0].id_rt,iduser[0].id_U);
        conn.release();
        res.redirect('/datawarga');
    } else {
        res.redirect('/')
    }
});
app.get('/pesananwarga',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='rt'){
        const namasaya = req.user[0].nama;
        res.render('pesananwarga',{
            namasaya
        });
    }else{
        res.redirect('/');
    }
});


//RW

const getidrw = (conn,idrw)=>{
    return new Promise((resolve,rejects)=>{
        conn.query(`SELECT id_rw FROM rw WHERE id_u LIKE '${idrw}'`,(err,result)=>{
            if (err) {
                rejects(err)
            } else {
                resolve(result)
            }
        })
    })
}

const addrt = (conn,no_rt,nama_kepala,id_rw,id_u) =>{
    return new Promise((resolve,rejects)=>{
        conn.query(`INSERT INTO rt (no_rt,nama_kepala_rt,id_rw,id_u) VALUES ('${no_rt}','${nama_kepala}',${id_rw},${id_u})`,(err,result)=>{
            if (err) {
                rejects(err)
            } else {
                resolve(result)
            }
        })
    })
};

const getrt = (conn,idrw) =>{
    return new Promise((resolve,rejects)=>{
        conn.query(`SELECT * FROM viewrt WHERE id_rw = ${idrw}`,(err,result)=>{
            if (err) {
                rejects(err)
            } else {
                resolve(result)
            }
        })
    })
};
app.get('/homerw',async (req,res)=>{
    if(req.user && req.user[0].role_u==='rw'){
        const namasaya = req.user[0].nama;
        res.render('homerw',{
            namasaya
        })
    }else{
        res.redirect('/');
    }
    
});
app.get('/datart',async (req,res)=>{
    if (req.user && req.user[0].role_u === 'rw') {
        const namasaya = req.user[0].nama;
        const conn =await dbConnect();
        const idrw = await getidrw(conn,req.user[0].id_U)
        const datart = await getrt(conn,idrw[0].id_rw);
        conn.release();
        res.render('datart',{
            datart:datart,
            namasaya
        });
    } else {
        res.redirect('/');
    }  
});
app.get('/statusrt',async (req,res)=>{
    const namasaya = req.user[0].nama;
    if(req.user && req.user[0].role_u ==='rw'){
        res.render('statusrt',{
            namasaya
        });
    }else{
        res.redirect('/');
    }
});
app.get('/addrt',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='rw'){
        res.render('addrt');
    }else{
        res.redirect('/');
    }
});
app.post('/addrt',async (req,res)=>{
    if(req.user && req.user[0].role_u ==='rw'){
        const {RT,namaKetua,alamat,username,password} = req.body
        const role = 'rt';
        const conn = await dbConnect();
        var hashpass = crypto.createHash('sha256').update(password).digest('base64')
        const adduser = await addUser(conn,username,hashpass,namaKetua,role);
        const iduser = await getiduser(conn,username);
        const idrw = await getidrw (conn,req.user[0].id_U);
        const nambahrt = await addrt(conn,RT,namaKetua,idrw[0].id_rw,iduser[0].id_U)
        conn.release();
        res.redirect('datart');
    }else{
        res.redirect('/');
    }
});


//KepDinas

app.get('/homekepdin',async (req,res)=>{
    const namasaya = req.user[0].nama;
    res.render('homekepdin',{
        namasaya
    });

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

app.listen(port,()=>{
    console.log('ready!');
});
