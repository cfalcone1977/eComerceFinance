
export const urlbase="https://68b6280de5dc090291b0fcc4.mockapi.io/api/V1/instrumentos";
export const urlCarro="https://68b6280de5dc090291b0fcc4.mockapi.io/api/V1/carrito";

export async function traerProductos(url){
    try{
       const response = await fetch(url);
       if (!response.ok) {
          throw new Error(`Error al conectar: ${response.status}`);
       }
       const datos = await response.json();
       return datos;
    }
    catch{
        console.log('Ha ocurrido un error: ');
        return null;
    }
}

export async function traerInstrumentoCarritoxID(id){
    try{
       const response = await fetch(urlCarro+"/"+id);
       if (!response.ok) {
          throw new Error(`Error al conectar: ${response.status}`);
       }
       const dato = await response.json();
       return dato;
    }
    catch{
        console.log('Ha ocurrido un error: ');
        return null;
    }
}

export async function verificarCarritoLlenoVacio(){
    try{
       const response = await fetch(urlCarro);
       if (!response.ok) {
          throw new Error(`Error al conectar: ${response.status}`);
       }
       const datos = await response.json();
       if (datos.length>0){
                            console.log(datos.length);
                            console.log("carrito LLENO");
                            carro.src='../imagenes/cart-lleno.svg?v=123456789';
                          }else {
                                console.log(datos.length);
                                carro.src='../imagenes/cart4.svg';
                                console.log("carrito VACIO");
                                }
    }
    catch{
        console.log('Ha ocurrido un error');
    }
}

export async function existeIntrumentoenCarrito(instrumento){
        const arregloInstrumentos=await traerProductos(urlCarro);
        console.log("ARREGLO", arregloInstrumentos);
        console.log(instrumento);
        for (let i=0; i < arregloInstrumentos.length; i=i+1) {
            if (arregloInstrumentos[i].idOrigen===instrumento.id){
                                                                  console.log("El instrumento ya EXISTE");
                                                                  return true;
                                                                     }
            
        }
        console.log("El instrumento NO EXISTE");  
        return false;
}
export async function modificarCantidadxId(id,cantidad){
   try{
          const cuerpoMensaje={cantidad: cantidad};
          const response= await fetch(urlCarro+"/"+id,{
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(cuerpoMensaje),
          });
          if (!response.ok) {
                           throw new Error(`Error al conectar: ${response.status}`);
                            }          
   }
   catch{
      console.log('Ha ocurrido un error');
   }
}

export async function modificarInversionCarrito(idOrigen,cantidad){
     try{
        const arregloInstrumentos=await traerProductos(urlCarro);
        for (let i=0; i < arregloInstrumentos.length; i=i+1) {
            if (arregloInstrumentos[i].idOrigen===idOrigen){
                                                          //arregloInstrumentos[i].cantidad=Number(arregloInstrumentos[i].cantidad)+Number(cantidad);
                                                          const cantidadModificada=Number(arregloInstrumentos[i].cantidad)+Number(cantidad);
                                                          console.log(arregloInstrumentos[i].cantidad); 
                                                          if ((cantidadModificada>10) || (cantidadModificada<0)){
                                                                                      alert("La INVERSION ya EXISTE en carrito, cantidad MAXIMA 10");
                                                                                    }else{
                                                          const instrumentoModificado={ descripcion: arregloInstrumentos[i].descripcion,
                                                                                    tipo: arregloInstrumentos[i].tipo, detalle: arregloInstrumentos[i].detalle, 
                                                                                    redimiento: arregloInstrumentos[i].redimiento, precio: arregloInstrumentos[i].precio,
                                                                                    imagen: arregloInstrumentos[i].imagen, cantidad: cantidadModificada,idOrigen: arregloInstrumentos[i].idOrigen}
                                                          const response= await fetch(urlCarro+"/"+arregloInstrumentos[i].id,{
                                                                                                method: 'PUT',
                                                                                                headers: {'Content-Type': 'application/json'},
                                                                                                body: JSON.stringify(instrumentoModificado),
                                                                                                });
                                                          if (!response.ok) {
                                                                    throw new Error(`Error al conectar: ${response.status}`);
                                                                            }
                                                                                          }

                                                          
                                                          }
            
        }
    }
    catch{
           console.log('Ha ocurrido un error');
         }
}

export async function enviarInversionCarrito(cantidad,instrumento){
          try{
             const nuevoInstrumento={ descripcion: instrumento.descripcion,
                                      tipo: instrumento.tipo, detalle: instrumento.detalle, 
                                      redimiento: instrumento.redimiento, precio: instrumento.precio,
                                      imagen: instrumento.imagen, idOrigen: instrumento.id, cantidad: cantidad}
            console.log(nuevoInstrumento);
            const response= await fetch(urlCarro,{
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(nuevoInstrumento),
                                });
            if (!response.ok) {
                        throw new Error(`Error al conectar: ${response.status}`);
                              } else{
                              await verificarCarritoLlenoVacio();
                              }

          }
          catch{
             console.log('Ha ocurrido un error: ');
          }
}




export async function eliminarItemCarrito(id){
            try{
            const response= await fetch(urlCarro+"/"+id,{
                                method: 'DELETE',
                                //headers: {'Content-Type': 'application/json'}
                                });
            if (!response.ok) {
                        throw new Error(`Error al conectar: ${response.status}`);
                              } else{
                                    console.log(`Item ${id} Eliminado con exito`);
                                    }

          }
          catch{
             console.log('Ha ocurrido un error: ');
          }

}


/* El objetivo de esta funcion es conocer si existen elementos en el carrito y cambiar su estado*/
/*
export async function verificarDatosCarrito(){
 try{
       const response = await fetch(urlCarro);
       if (!response.ok) {
          throw new Error(`Error al conectar: ${response.status}`);
       }
       const contarInstrumentos = await response.json();
       console.log(contarInstrumentos.length);
       if (contarInstrumentos.length===0){
                                          localStorage.setItem('carritolleno','false'); 
                                         } else{
                                                localStorage.setItem('carritolleno', 'true');
                                               };
    }
    catch{
        console.log('Ha ocurrido un error: ');
    }
}*/
