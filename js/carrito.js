import { eliminarItemCarrito, traerProductos, urlCarro, verificarCarritoLlenoVacio } from "./apis.js";
import { mostrarError } from "./control.js";

const contenedorDetalleCarrito=document.getElementById("contenedorDetalleCarrito");
const total=document.getElementById('total');

const instrumentos=await traerProductos(urlCarro);


function mostrarInstrumentosCarrito(inversiones){
    let acumulador=0;
    for (let i = 0; i< inversiones.length; i=i+1) {
        const tarjetaInversion=document.createElement("card");
        tarjetaInversion.style.maxWidth='80%'; 
        tarjetaInversion.setAttribute('id','tarjetaCarro');

        const imagen=document.createElement("img");
        imagen.setAttribute('src',inversiones[i].imagen);  
        imagen.style.maxWidth='50px'; 

        const descripcion=document.createElement("pre");
        descripcion.textContent=inversiones[i].descripcion;
        descripcion.style.fontSize='12px';

       /*
        const rendimiento=document.createElement("p");
        rendimiento.textContent=inversiones[i].redimiento;
        */

        const precio=document.createElement("pre");
        precio.textContent=`$ ${inversiones[i].precio}`;

        const cantidad=document.createElement("pre");
        cantidad.textContent=inversiones[i].cantidad;
        
        const subtotal=document.createElement("pre");
        console.log(Number(inversiones[i].precio))
        const calculoInversionItem=Number(inversiones[i].cantidad)*Number(inversiones[i].precio);
        subtotal.textContent=`$ ${calculoInversionItem.toFixed(2)}`;
        acumulador=acumulador+calculoInversionItem;

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

        contDesc.appendChild(descripcion);
        tarjetaInversion.appendChild(contDesc);


        const botonMas=document.createElement('img');
        botonMas.setAttribute('id','botonMas');
        botonMas.src='../imagenes/mas.svg';
        const botonMenos=document.createElement('img');
        botonMenos.setAttribute('id','botonMenos');
        botonMenos.src='../imagenes/menos.svg';
        contCant.appendChild(botonMas);
        contCant.appendChild(cantidad);
        contCant.appendChild(botonMenos);        
        tarjetaInversion.appendChild(contCant);



        contPrecio.appendChild(precio);
        tarjetaInversion.appendChild(contPrecio);

        contSubtotal.appendChild(subtotal);
        tarjetaInversion.appendChild(contSubtotal);

        contEliminar.appendChild(botonEliminar);
        tarjetaInversion.appendChild(contEliminar);
        contenedorDetalleCarrito.appendChild(tarjetaInversion);
    }

    total.textContent=`Total a Invertir: $ ${acumulador.toFixed(2)}`;

}

if (instrumentos!=null){
                         console.log(instrumentos);
                         mostrarInstrumentosCarrito(instrumentos);
                         seleccionarItem();
                       } else {
                               mostrarError();
                              };


function seleccionarItem(){
                            contenedorDetalleCarrito.addEventListener('click',async (evento)=>{
                                     if (evento.target.id==='botonEliminar'){
                                                              console.log(evento.target.dataset.id);                                                              
                                                              await eliminarItemCarrito(evento.target.dataset.id);
                                                              contenedorDetalleCarrito.textContent="";
                                                              total.textContent="";
                                                              const instrumentosCarro=await traerProductos(urlCarro);
                                                              console.log(instrumentosCarro);
                                                              mostrarInstrumentosCarrito(instrumentosCarro);
                                                              await verificarCarritoLlenoVacio();
                                                              //const identificador=Number(evento.target.dataset.id);
                                                              //console.log(identificador);
                                                              //window.location.href=`./HTMLS/detalle.html?id=${identificador}`;
                                                                }

                            });
}