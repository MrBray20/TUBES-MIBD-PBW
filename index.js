import express from 'express';
import path from 'path';
import mysql from 'mysql';

const port = 8080;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('public')));

app.get('/',async (req,res)=>{
    res.render('login');
});

app.post('/homeadmin',async (req,res)=>{
    res.redirect('homeadmin');
});

app.get('/homeadmin',async (req,res)=>{
    res.render('homeadmin');
});

app.get('/logout',async (req,res)=>{
    res.render('login');
});

app.get('/bandungbarat',async (req,res)=>{
    res.render('adminkecamatan');
});
app.get('/cisarua',async (req,res)=>{
    res.render('adminkelurahan');
});
app.get('/kecamatan',async (req,res)=>{
    res.render('adminkecamatandata');
});
app.get('/kelurahan',async (req,res)=>{
    res.render('adminkelurahandata');
});

app.get('/rw',async (req,res)=>{
    res.render('adminrw');
});
app.get('/users',async (req,res)=>{
    res.render('users');
});
app.get('/produk',async (req,res)=>{
    res.render('produk');
});
app.get('/perioda',async (req,res)=>{
    res.render('perioda');
});
app.get('/addkecamatan',async (req,res)=>{
    res.render('addkecamatan');
});
app.get('/adminkecamatandata',async (req,res)=>{
    res.redirect('adminkecamatan');
});
app.post('/adminkecamatandata',async (req,res)=>{
    res.redirect('adminkecamatan');
});
app.post('/kecamatan',async (req,res)=>{
    res.redirect('kecamatan');
});
app.get('/addkelurahan',async (req,res)=>{
    res.render('addkelurahan');
});
app.post('/kelurahan',async (req,res)=>{
    res.redirect('kelurahan');
});
app.get('/addrw',async (req,res)=>{
    res.render('addrw');
});
app.post('/addrw',async (req,res)=>{
    res.redirect('rw');
});
app.listen(port,()=>{
    console.log('ready!');
});