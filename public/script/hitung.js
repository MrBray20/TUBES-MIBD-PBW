
const tombolhitung = document.querySelector('input[type="button"')
tombolhitung.addEventListener('click',()=>{
    var tabel = document.getElementById("harga");
    for(var i = 1; i < tabel.rows.length-1 ; i ++){
        let hasiltotal = 0;
        let harga = tabel.rows[i].cells[2].firstChild.value;
        let jumlah = tabel.rows[i].cells[3].firstChild.value;
        hasiltotal = hasiltotal + parseInt(harga) * parseInt(jumlah)
        let show = tabel.rows[i].cells[4].innerHTML=hasiltotal
    }
    let totalseluruh = 0
    for(var i = 1; i < tabel.rows.length-1 ; i ++){
        let harga = tabel.rows[i].cells[4].innerHTML;
        totalseluruh = totalseluruh + parseInt(harga) 
    }
    let show = document.querySelector("td#hasiljumlah").innerHTML=totalseluruh
})