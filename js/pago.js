import { traerProductos, urlCarro } from "./apis.js";

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


mostrarDetalleInversiones();