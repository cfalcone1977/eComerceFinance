import { traerProductos, urlCarro, urlbase} from "./apis.js";
import { crearTarjetas, seleccionarInstrumento, mostrarError, carro} from "./control.js";



 document.addEventListener('DOMContentLoaded',async () => {



const productos= await traerProductos(urlbase);
let vacioLleno=false;

async function verificarCarritoLlenoVacio(){
    try{
       const response = await fetch(urlCarro);
       if (!response.ok) {
          throw new Error(`Error al conectar: ${response.status}`);
       }
       const datos = await response.json();
       if (datos.length>0){
                            vacioLleno=true;
                            console.log(datos.length);
                            console.log("carrito LLENO");
                            carro.src='./imagenes/cart-lleno.svg';
                          }else {
                                vacioLleno=false;
                                console.log(datos.length);
                                carro.src='./imagenes/cart4.svg';
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
  if (vacioLleno){
                 window.location.href='./pages/carrito.html'; 
                 } else {
                        alert("CARRITO VACIO");
                       }
});

    await verificarCarritoLlenoVacio();
    console.log("Estoy controlando estado");
});
