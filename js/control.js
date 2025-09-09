import { traerProductos, urlbase } from "./apis.js"; 




const contenedorProductos=document.getElementById("contenedorProductos");
export const carro=document.getElementById('carro');

export function crearTarjetas(elementos){
   for (let i = 0; i < elementos.length; i=i+1) {
        const tarjeta=document.createElement("card");
        tarjeta.style.maxWidth='200px'; 
        tarjeta.setAttribute('id','tarjeta');

        const imagen=document.createElement("img");
        imagen.setAttribute('src',elementos[i].imagen);  
        imagen.setAttribute('id','imagenInversion');
        imagen.style.maxWidth='70%'; 

        const descripcion=document.createElement("p");
        descripcion.textContent=elementos[i].descripcion;
        descripcion.style.fontSize='15px';
        descripcion.style.fontWeight='bold';

        const rendimiento=document.createElement("p");
        rendimiento.textContent=elementos[i].redimiento;

        const precio=document.createElement("p");
        const boton=document.createElement("button"); 
        boton.setAttribute('id','boton');
        boton.textContent="Invertir";
        boton.setAttribute('data-id',elementos[i].id);

        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(rendimiento);
        tarjeta.appendChild(boton);
        contenedorProductos.appendChild(tarjeta);
    }
}

export function mostrarError(){
         console.log("Error al traer PRODUCTO/S");
         alert("SE HA PRODUCIDO UN ERROR AL INTENTAR CARGAR ESTA PAGINA...")
}


export function seleccionarInstrumento(){
                            contenedorProductos.addEventListener('click',async (evento)=>{
                                     if (evento.target.id==='boton'){
                                                              console.log(evento.target.dataset.id);
                                                              const identificador=Number(evento.target.dataset.id);
                                                              console.log(identificador);
                                                              window.location.href=`./pages/detalle.html?id=${identificador}`;
                                                                }

                            });
}


/*
export function cambiarEstadoCarrito(){
   let estadoCarrito='false';
   //verificarDatosCarrito();
   estadoCarrito=localStorage.getItem('carritolleno');
   if (estadoCarrito==='true'){
                      carro.src='http://127.0.0.1:5500/imagenes/cart-lleno.svg';
                      console.log("CARRITO LLENO")
                     } else {
                             carro.src='http://127.0.0.1:5500/imagenes/cart4.svg';
                             console.log("Carrito VACIO");
                            }
                              
   console.log(carro.src);
};*/
   




/*
async function mostrarDetalleInstrumento(id){
     const instrumento=await traerProductos(urlbase+"/"+id);
     if (instrumento!=null){
                               
                             console.log(instrumento);
                             
                             
                           } else {
                                   mostrarError();
                                  }
}*/
