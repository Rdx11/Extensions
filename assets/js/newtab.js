function $(id) {
    return document.getElementById(id);
}
function get(url) {
//ajax
xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        res = JSON.parse(this.responseText);
        $('ayat').innerHTML = res.ayat.data.ar[0].teks


    }
}

xhttp.open("GET", url, true)
xhttp.send()    
}



get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1")