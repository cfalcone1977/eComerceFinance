import { urlbase, urlCarro, traerProductos, existeIntrumentoenCarrito } from "./apis.js";  
import { mostrarError, carro} from "./control.js";
import { enviarInversionCarrito, modificarInversionCarrito} from "./apis.js";
    

document.addEventListener('DOMContentLoaded',async () => {


const imagenD=document.getElementById('imagenD');
const descripcionD=document.getElementById('descripcionD');
const tipoD=document.getElementById('tipoD');
const detalleD=document.getElementById('detalleD');
const rendimientoD=document.getElementById('rendimientoD');
const precioPaqueteD=document.getElementById('precioPaqueteD');

const cantidadIngresada=document.getElementById("inputCantidad");
const agregaraCarro=document.getElementById('botonAgregaraCarro');

async function verificarCarritoLlenoVacio(){
    try{
       const response = await fetch(urlCarro);
       if (!response.ok) {
          throw new Error(`Error al conectar: ${response.status}`);
       }
       const datos = await response.json();
       if (datos.length>0){
                            console.log(datos.length);
                            console.log("carrito LLENO");
                            carro.src='../imagenes/cart-lleno.svg';
                          }else {
                                console.log(datos.length);
                                carro.src='../imagenes/cart4.svg';
                                console.log("carrito VACIO");
                                }
    }
    catch(error){
        console.log('Ha ocurrido un error',error);
    }
}






function crearDetalleInstrumento(instrumento){
        imagenD.src=instrumento.imagen;
        descripcionD.textContent=instrumento.descripcion;
        tipoD.textContent=instrumento.tipo;
        detalleD.textContent=instrumento.detalle;
        rendimientoD.textContent="Rendimiento: "+instrumento.redimiento; ///redimiento creado mal desde el principio
        precioPaqueteD.textContent="Monto Inversión en pesos:  $ "+instrumento.precio+" por paquete";
}



const idxURL = new URLSearchParams(window.location.search);
const idInstrumento = idxURL.get('id');
console.log(idInstrumento);
const instrumentoCompleto= await traerProductos(urlbase+"/"+idInstrumento);
if (instrumentoCompleto!=null){
                            console.log(instrumentoCompleto);
                            crearDetalleInstrumento(instrumentoCompleto);
                            agregaraCarro.addEventListener('click',async ()=>{
                                   const cantPaq=Number(cantidadIngresada.value)
                                   if ((cantPaq>0) && cantPaq<=10){
                                                                   const confirmacion = window.confirm('¿AGREGAR AL CARRITO?');
                                                                   if (confirmacion){
                                                                                    const existe=await existeIntrumentoenCarrito(instrumentoCompleto);
                                                                                    console.log(existe);
                                                                                    if (existe){
                                                                                                     await modificarInversionCarrito(instrumentoCompleto.id,cantPaq);   
                                                                                                     window.location.href='../index.html';
                                                                                               }else{
                                                                                                     await enviarInversionCarrito(cantPaq,instrumentoCompleto);
                                                                                                     window.location.href='../index.html';
                                                                                                    }
                                                                                    }else{

                                                                                    }
                                                                  }else{
                                                                       alert("El MINIMO de paquetes a invertir es 1 y MAXIMO 10.");
                                                                       }
                                                                    
                            });
                              } else{
                                      mostrarError();
                                    }

carro.addEventListener('click',()=>{
  console.log("CLICK EN CARRO");
  window.location.href=`./carrito.html`;
});

    await verificarCarritoLlenoVacio();
    console.log("Estoy controlando estado");
});

