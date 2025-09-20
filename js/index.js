import { traerProductos, verificarCarritoLlenoVacio } from "./apis.js";
import { crearTarjetas, seleccionarInstrumento, mostrarError, carro} from "./control.js";
import { urlbase} from "./apis.js";



document.addEventListener('DOMContentLoaded', async() => {
 


const productos= await traerProductos(urlbase);


if (productos==null){
                     mostrarError();
                    } else {
                            crearTarjetas(productos);
                            seleccionarInstrumento();
                           };

carro.addEventListener('click',()=>{  
  console.log("CLICK EN CARRO");
  window.location.href='./pages/carrito.html';
});

   await verificarCarritoLlenoVacio();
   console.log("Estoy controlando estado");

});


