import { traerProductos, urlCarro, urlbase} from "./apis.js";
import { crearTarjetas, seleccionarInstrumento, mostrarError, carro} from "./control.js";



 document.addEventListener('DOMContentLoaded',async () => {



const productos= await traerProductos(urlbase);

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
