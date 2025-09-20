import { traerProductos, urlCarro } from "./apis.js";

const contTransferencia=document.getElementById('contenedorTransferencia');
const contTarjeta=document.getElementById('contenedorTarjeta');

const ventanaModal=document.getElementById('ventanaModal');
const botonCerrarModal=document.getElementById('cerrarModal');
const cuerpoModal=document.getElementById('cuerpoModal');

const numeroTarjeta=document.getElementById('card-number');
const nombreTarjeta=document.getElementById('card-name');
const vencTarjeta=document.getElementById('expiry-date');
const codigoCVV=document.getElementById('cvv');
const confirmarPago=document.getElementById('botonPagar');
let pagoCon="";


async function mostrarDetalleInversiones(){
    const inversiones=await traerProductos(urlCarro);
    console.log(inversiones);
    const detalleInversiones=document.getElementById('contenedorDetalleInversiones');
    const totalPaquetes=document.getElementById('totalPaquetes');
    const totalInversiones=document.getElementById('totalInversiones');

    let acumulador=0;
    let acuPaquetes=0;
    for (let i=0; i < inversiones.length; i=i+1) {
        const tarjetaInversion=document.createElement("card");
        tarjetaInversion.style.maxWidth='80%'; 
        tarjetaInversion.setAttribute('id','tarjetaInversion');

        const imagen=document.createElement("img");
        imagen.setAttribute('src',inversiones[i].imagen);  
        imagen.style.maxWidth='30px'; 

        const descripcion=document.createElement("pre");
        descripcion.textContent=inversiones[i].descripcion;
        descripcion.style.fontSize='14px';

       /*
        const rendimiento=document.createElement("p");
        rendimiento.textContent=inversiones[i].redimiento;
        */

        const precio=document.createElement("pre");
        precio.textContent=`$ ${inversiones[i].precio}`;

        const cantidad=document.createElement("pre");
        cantidad.textContent=inversiones[i].cantidad;
        cantidad.setAttribute('id','cantItemCarro')
        
        const subtotal=document.createElement("pre");
        console.log(Number(inversiones[i].precio))
        const calculoInversionItem=Number(inversiones[i].cantidad)*Number(inversiones[i].precio);
        subtotal.textContent=`$ ${calculoInversionItem.toFixed(2)}`;
        acumulador=acumulador+calculoInversionItem;
        acuPaquetes=acuPaquetes+(Number(inversiones[i].cantidad));

        const botonEliminar=document.createElement("button"); 
        botonEliminar.setAttribute('id','botonEliminar');
        botonEliminar.textContent="Eliminar";
        botonEliminar.setAttribute('data-id',inversiones[i].id);

        const contImg=document.createElement('div');
        contImg.setAttribute('id','contImg');
        const contDesc=document.createElement('div');
        contDesc.setAttribute('id','contDesc');
        const contCant=document.createElement('div');
        contCant.setAttribute('id','contCant');
        const contPrecio=document.createElement('div');
        contPrecio.setAttribute('id','contPrecio');
        const contSubtotal=document.createElement('div');
        contSubtotal.setAttribute('id','contSubtotal');
        const contEliminar=document.createElement('div');
        contEliminar.setAttribute('id','contEliminar');

        contImg.appendChild(imagen);
        tarjetaInversion.appendChild(contImg);
        /*
        const descText=document.createElement('pre');
        descText.textContent='Descripcion';
        contDesc.appendChild(descText);*/
        contDesc.appendChild(descripcion);
        tarjetaInversion.appendChild(contDesc);


        //const botonMas=document.createElement('img');
        //botonMas.setAttribute('id','botonMas');
        //botonMas.src='../imagenes/mas.svg';
        //botonMas.setAttribute('data-id',inversiones[i].id);  //uso idOrigen en este caso
        //const botonMenos=document.createElement('img');
        //botonMenos.setAttribute('id','botonMenos');
        //botonMenos.src='../imagenes/menos.svg';
        //botonMenos.setAttribute('data-id',inversiones[i].id); //uso idOrigen o id en este caso CREO es conveniente id

        //contCant.appendChild(botonMenos);
        contCant.appendChild(cantidad);
        //contCant.appendChild(botonMas);
        tarjetaInversion.appendChild(contCant);

        contPrecio.appendChild(precio);
        tarjetaInversion.appendChild(contPrecio);

        contSubtotal.appendChild(subtotal);
        tarjetaInversion.appendChild(contSubtotal);

        //contEliminar.appendChild(botonEliminar);
        //tarjetaInversion.appendChild(contEliminar);  
        detalleInversiones.appendChild(tarjetaInversion);
    }
    totalInversiones.textContent=totalInversiones.textContent+ acumulador.toLocaleString('es-AR',{minimumFractionDigits: 2,maximumFractionDigits:2});
    totalPaquetes.textContent=totalPaquetes.textContent+acuPaquetes;
}

function deshabilitarEstadoModosPago(){
        numeroTarjeta.disabled=true;
        nombreTarjeta.disabled=true;
        vencTarjeta.disabled=true;
        codigoCVV.disabled=true;
}
function habilitarEstadoModosPago(){
        numeroTarjeta.disabled=false;
        nombreTarjeta.disabled=false;
        vencTarjeta.disabled=false;
        codigoCVV.disabled=false;

}

function controlCamposTarjeta(){
  numeroTarjeta.addEventListener('input',()=>{
        console.log(numeroTarjeta.value);
        let caracter=""
        let datoIngresado="";
        for (let i = 0; i < numeroTarjeta.value.length; i=i+1) {
                caracter=numeroTarjeta.value[i];
                if ((caracter==="0")||(caracter==="1")||(caracter==="2")||(caracter==="3")|| (caracter==="4")|| (caracter==="5")|| (caracter==="6")|| (caracter==="7")|| (caracter==="8")|| (caracter==="9")|| (caracter===" ")){
                                        datoIngresado=datoIngresado+caracter;
                                                                           }   
        }
        numeroTarjeta.value=datoIngresado;
        console.log(datoIngresado);
  });
  vencTarjeta.addEventListener('input',()=>{
        console.log(vencTarjeta.value);
        let caracter=""
        let datoIngresado="";
        for (let i = 0; i < vencTarjeta.value.length; i=i+1) {
                caracter=vencTarjeta.value[i];
                if ((caracter==="0")||(caracter==="1")||(caracter==="2")||(caracter==="3")|| (caracter==="4")|| (caracter==="5")|| (caracter==="6")|| (caracter==="7")|| (caracter==="8")|| (caracter==="9")|| (caracter==="/")){
                                        datoIngresado=datoIngresado+caracter;
                                                                           }   
        }
        vencTarjeta.value=datoIngresado;
        console.log(datoIngresado);
  })  
  codigoCVV.addEventListener('input',()=>{
        console.log(codigoCVV.value);
        let caracter=""
        let datoIngresado="";
        for (let i = 0; i < codigoCVV.value.length; i=i+1) {
                caracter=codigoCVV.value[i];
                if ((caracter==="0")||(caracter==="1")||(caracter==="2")||(caracter==="3")|| (caracter==="4")|| (caracter==="5")|| (caracter==="6")|| (caracter==="7")|| (caracter==="8")|| (caracter==="9")){
                                        datoIngresado=datoIngresado+caracter;
                                                                           }   
        }
        codigoCVV.value=datoIngresado;
        console.log(datoIngresado);
  })
}

function mostrarValidacionTarjeta(){
   botonCerrarModal.style.display="none";
   ventanaModal.showModal();
   const textoModal=document.getElementById('textoModal');
   const mensaje=document.createElement('p');
   mensaje.setAttribute('id','mensaje');
   mensaje.textContent="Estamos validando tus datos...";
   textoModal.appendChild(mensaje);
   setTimeout(()=>{
        const azar=Math.floor(Math.random() * (1000 + 1));
        console.log(azar);
        azar>500?mensaje.textContent="TARJETA APROBADA":mensaje.textContent="TARJETA INVALIDA"; 
        botonCerrarModal.style.display="inline-block";       
   },2000)
   botonCerrarModal.addEventListener('click',()=>{
       textoModal.textContent="";
       console.log('click en boton CERRAR MODAL');
       ventanaModal.close();
   })
}

function mostrarValidacionTransferencia(){
   ventanaModal.showModal();
   const textoModal=document.getElementById('textoModal');
   const mensaje=document.createElement('p');
   mensaje.textContent="Estaremos esperando tu transferencia.";
   textoModal.appendChild(mensaje);
   botonCerrarModal.addEventListener('click',()=>{
       textoModal.textContent="";
       console.log('click en boton CERRAR MODAL');
       ventanaModal.close();
   })

}


mostrarDetalleInversiones();
deshabilitarEstadoModosPago();

contTarjeta.addEventListener('click',(evento)=>{
    habilitarEstadoModosPago();
    contTransferencia.style.border="grey solid";
    contTransferencia.style.color="grey";
    contTarjeta.style.border="rgb(223, 45, 178) solid 5px";
    contTarjeta.style.color="black"
    pagoCon="TARJETA";
    controlCamposTarjeta();
    console.log("TARJETA");
    console.log(evento.currentTarget.id);
});

contTransferencia.addEventListener('click',(evento)=>{
    deshabilitarEstadoModosPago();
    contTarjeta.style.border="grey solid";
    contTarjeta.style.color="grey";
    contTransferencia.style.color="black";
    contTransferencia.style.border="rgb(223, 45, 178) solid 5px";
    pagoCon="TRANSFERENCIA";
    console.log("TRANSFERENCIA");
    console.log(evento.currentTarget.id);
});

confirmarPago.addEventListener('click',()=>{
    if (pagoCon==="TARJETA"){
           if ((numeroTarjeta.value.length===19) && (nombreTarjeta.value!="") && (vencTarjeta.value.length===5) && (codigoCVV.value.length===3)){
                                       mostrarValidacionTarjeta();
                                                                  } else alert("Tarjeta con datos incompletos!");
           console.log("Presiono Boton Confirmar Pago...")
           console.log("CONTROLAR TARJETA");
           console.log("Numero: ",numeroTarjeta.value," Nombre: ", nombreTarjeta.value, " Venc.: ", vencTarjeta.value, " CODIGO: ",codigoCVV.value);
      }

    if (pagoCon==="TRANSFERENCIA"){
           mostrarValidacionTransferencia();
           console.log("Presiono Boton Confirmar Pago...")
           console.log("CONTROLAR TRANSFERENCIA");
      }
});

