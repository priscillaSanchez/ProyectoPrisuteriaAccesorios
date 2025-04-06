const listaAccesorios=document.querySelector('#listaAccesorios');
document.addEventListener('DOMContentLoaded', function(){
   eventListener();

});

function eventListener(){
    listaAccesorios.addEventListener('click',getDataElements);

}