import { eliminarItemCarrito, traerProductos, urlCarro, verificarCarritoLlenoVacio} from "./apis.js";
import { traerInstrumentoCarritoxID, modificarInversionCarrito, modificarCantidadxId } from "./apis.js";
import { mostrarError } from "./control.js";

const contenedorDetalleCarrito=document.getElementById("contenedorDetalleCarrito");

const total=document.getElementById('total');
const botonPagar=document.getElementById('botonPagar');

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
        precio.textContent=`${inversiones[i].precio}`;

        const cantidad=document.createElement("pre");
        cantidad.textContent=inversiones[i].cantidad;
        cantidad.setAttribute('id','cantItemCarro')
        
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
        botonMas.setAttribute('data-id',inversiones[i].id);  //uso idOrigen en este caso
        const botonMenos=document.createElement('img');
        botonMenos.setAttribute('id','botonMenos');
        botonMenos.src='../imagenes/menos.svg';
        botonMenos.setAttribute('data-id',inversiones[i].id); //uso idOrigen o id en este caso CREO es conveniente id

        contCant.appendChild(botonMenos);
        contCant.appendChild(cantidad);
        contCant.appendChild(botonMas);
        tarjetaInversion.appendChild(contCant);

        contPrecio.appendChild(precio);
        tarjetaInversion.appendChild(contPrecio);

        contSubtotal.appendChild(subtotal);
        tarjetaInversion.appendChild(contSubtotal);

        contEliminar.appendChild(botonEliminar);
        tarjetaInversion.appendChild(contEliminar);
        contenedorDetalleCarrito.appendChild(tarjetaInversion);
    }

    total.textContent=acumulador.toFixed(2);

}

if (instrumentos!=null){
                         console.log(instrumentos);
                         mostrarInstrumentosCarrito(instrumentos);
                         seleccionarItem();
                         botonPagar.addEventListener('click',()=>{
                                  console.log("INICIAR PAGO");
                         });
                       } else {
                               mostrarError();
                              };




function seleccionarItem(){
                            contenedorDetalleCarrito.addEventListener('click',async (evento)=>{
                                     console.log(evento.target.parentElement);
                                     if (evento.target.id==='botonEliminar'){
                                                              console.log(evento.target.dataset.id);                                                              
                                                              await eliminarItemCarrito(evento.target.dataset.id);
                                                              contenedorDetalleCarrito.textContent="";
                                                              total.textContent="";
                                                              const instrumentosCarro=await traerProductos(urlCarro);
                                                              console.log(instrumentosCarro);
                                                              mostrarInstrumentosCarrito(instrumentosCarro);
                                                              await verificarCarritoLlenoVacio();
                                                                }


                                     if (evento.target.id==='botonMas'){
                                                              console.log("Aumenta Cantidad");
                                                              const contenedorPadre=evento.target.parentElement; //referencia Boton +
                                                              const hermano=evento.target.previousElementSibling; // refencia Hermano, osea, indicador Cantidad
                                                              console.log(hermano.textContent);
                                                              let cantidad=Number(hermano.textContent);
                                                              const cantidadAnterior=cantidad;
                                                              if (cantidad<10){
                                                                          cantidad=cantidad+1;
                                                                          hermano.textContent=cantidad;
                                                                          const precio=contenedorPadre.nextElementSibling; // referenca hermano contenador cantidad, osea cntendor precio
                                                                          const calculoSubtotal=cantidad*(Number(precio.textContent));
                                                                          const ContenedorSubTotal=precio.nextElementSibling; // referencia hermano contenedor precio, osea contenedor subtotal
                                                                          const subTotal=ContenedorSubTotal.firstElementChild; // referencia hijo contenedor subtotal, osea el "pre" que contiene el subtotal
                                                                          subTotal.textContent=`$ ${calculoSubtotal.toFixed(2)}`; // cambiando el valor del subtotal.  
                                                                          console.log(cantidadAnterior);
                                                                          console.log (Number(precio.textContent));
                                                                          console.log(calculoSubtotal);
                                                                          console.log(total.textContent);
                                                                          const nuevoTotal=(Number(total.textContent))-(cantidadAnterior*(Number(precio.textContent)))+(calculoSubtotal);
                                                                          console.log(nuevoTotal);
                                                                          total.textContent=nuevoTotal.toFixed(2);
                                                                        
                                                                          const idInstrCarrito=Number(evento.target.dataset.id);
                                                                          console.log(idInstrCarrito);
                                                                          modificarCantidadxId(idInstrCarrito,cantidad);

                                                                              }else{
                                                                                    console.log("La inversión MAXIMA es de 10 paquetes");
                                                                                    alert("La inversión MAXIMA es 10 paquetes.");
                                                                                   }
                                                                        }                                                                       
                                     if (evento.target.id==='botonMenos'){
                                                              console.log("Disminuye Cantidad");
                                                              const contenedorPadre=evento.target.parentElement;
                                                              const hermano=evento.target.nextElementSibling;
                                                              console.log(hermano.textContent);
                                                              let cantidad=Number(hermano.textContent);
                                                              const cantidadAnterior=cantidad;                                                              
                                                              if (cantidad>1){
                                                                          cantidad=cantidad-1;
                                                                          hermano.textContent=cantidad;
                                                                          const precio=contenedorPadre.nextElementSibling; // referenca hermano contenador cantidad, osea cntendor precio
                                                                          console.log(Number(precio.textContent));
                                                                          const calculoSubtotal=cantidad*(Number(precio.textContent));
                                                                          const ContenedorSubTotal=precio.nextElementSibling; // referencia hermano contenedor precio, osea contenedor subtotal
                                                                          const subTotal=ContenedorSubTotal.firstElementChild; // referencia hijo contenedor subtotal, osea el "pre" que contiene el subtotal
                                                                          subTotal.textContent=`$ ${calculoSubtotal.toFixed(2)}`; // cambiando el valor del subtotal.  
                                                                          console.log(cantidadAnterior);
                                                                          console.log (Number(precio.textContent));
                                                                          console.log(calculoSubtotal);
                                                                          console.log(total.textContent);
                                                                          const nuevoTotal=(Number(total.textContent))-(cantidadAnterior*(Number(precio.textContent)))+(calculoSubtotal);
                                                                          console.log(nuevoTotal);
                                                                          total.textContent=nuevoTotal.toFixed(2);
                                                                          console.log(typeof(evento.target.dataset.id));
                                                                          const idInstrCarrito=Number(evento.target.dataset.id);
                                                                          modificarCantidadxId(idInstrCarrito,cantidad);
                                                                             }else{
                                                                                console.log("La inversión MINIMA es de 1 paquete");
                                                                                alert("La inversión MINIMA es 1 paquete.");
                                                                             }
                                                           
                                                                       }    
                                                                                                                                           


                            });
}