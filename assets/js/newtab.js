function $(id) {
    return document.getElementById(id);
}
function create (name, props){
    element = document.createElement(name)

    for (var i in props) {
        element[i] = props[i]
    }

    return element
}
function get(url, nameFunc) {
//ajax
xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        nameFunc(JSON.parse(this.responseText));
        
    }
}

xhttp.open("GET", url, true)
xhttp.send()    
}
function listSurah(res) {
    msgContainer = document.createDocumentFragment()

    for (var i = 0; i < res.hasil.length; i++){
        msgContainer.appendChild(create('option', {
            text: res.hasil[i].nama,
            value: res.hasil[i].nomor,
            id: res.hasil[i].nomor
        }))
    }
    $('listSurah').appendChild(msgContainer)
}

function listAyat(res) {
    $('listAyat').innerHTML = ""
    msgContainer = document.createDocumentFragment()

    for (var i = 1; i <= res.hasil[0].ayat; i++){
        msgContainer.appendChild(create('option', {
            text: i,
            value: i
        }))
    }
    $('listAyat').appendChild(msgContainer)
    $('liastAyat').value = 1
}

function ayat(res) {
    $('ayat').innerHTML = res.ayat.data.ar[0].teks
    $('terjemah').innerHTML = res.ayat.data.id[0].teks
}


window.onload = function() {

$('listSurah').addEventListener('change',function (){
get("https://api.banghasan.com/quran/format/json/surat/"+this.value, listAyat)
})
get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1", ayat)
get("https://api.banghasan.com/quran/format/json/surat", listSurah)
get("https://api.banghasan.com/quran/format/json/surat/1", listAyat)
}