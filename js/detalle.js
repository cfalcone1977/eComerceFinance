import { urlbase } from "./apis.js";  
import { mostrarError, carro } from "./control.js";
import { traerProductos, enviarInversionCarrito, verificarCarritoLlenoVacio, existeIntrumentoenCarrito, modificarInversionCarrito} from "./apis.js";
    
document.addEventListener('DOMContentLoaded',async () => {
    await verificarCarritoLlenoVacio();
    console.log("Estoy controlando estado");
});


const imagenD=document.getElementById('imagenD');
const descripcionD=document.getElementById('descripcionD');
const tipoD=document.getElementById('tipoD');
const detalleD=document.getElementById('detalleD');
const rendimientoD=document.getElementById('rendimientoD');
const precioPaqueteD=document.getElementById('precioPaqueteD');

//const carrito=document.getElementById('carro');
const cantidadIngresada=document.getElementById("inputCantidad");
const agregaraCarro=document.getElementById('botonAgregaraCarro');

function crearDetalleInstrumento(instrumento){
        imagenD.src=instrumento.imagen;
        descripcionD.textContent=instrumento.descripcion;
        tipoD.textContent=instrumento.tipo;
        detalleD.textContent=instrumento.detalle;
        rendimientoD.textContent="Rendimiento: "+instrumento.redimiento; ///redimiento creado mal desde el principio
        precioPaqueteD.textContent="Monto Inversión en pesos:  $ "+instrumento.precio+" por paquete";
}

/*
function enviarInversionCarrito(cantidadIngresada,instrumento){
        
}*/


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






/*
carritoConInstrumentos
 document.addEventListener('DOMContentLoaded', () => {
           if (instrumento!=null){  
                               console.log(instrumento.descripcion);
                               const descripcionDetalle=document.getElementById("descripcionD");
                               descripcionDetalle.textContent=instrumento.descripcion;
                               console.log(descripcionDetalle);

            } else {
                     mostrarError();
                   };
         });          
*/
/*
export async function mostrarDetalleInstrumento(id){
         const instrumento=await traerProductos(urlbase+"/"+id);
         console.log(instrumento.descripcion);
         document.addEventListener('DOMContentLoaded', () => {
           if (instrumento!=null){  
                               const descripcionDetalle=document.getElementById("descripcionD");
                               descripcionDetalle.textContent=instrumento.descripcion;
                               console.log(descripcionDetalle);

            } else {
                     mostrarError();
                   };
         });          
}
*/




/*
                        document.addEventListener('DOMContentLoaded', () => {
                                                });
                            });*/