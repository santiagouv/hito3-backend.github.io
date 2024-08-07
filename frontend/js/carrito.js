let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Titulo</small>
                <H3>${producto.titulo}</H3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>SubTotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
    
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #1f0041, #aa8ec7)",
          borderRadius: "2rem",
          TextTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estas Seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
}).then((result) => {
    if (result.isConfirmed) {
        productosEnCarrito.length = 0;
        localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    }
  })
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {


    var productosEnCarrito = localStorage.getItem("productos-en-carrito");
    var data = JSON.parse(productosEnCarrito);
    console.log(data);

        var url = "http://74.242.171.91:3000/api/carrito";
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
console.log(this.responseText);
        }
        };
        xhr.send(productosEnCarrito);
        console.log(xhr.responseText);


    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", '[]');
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

