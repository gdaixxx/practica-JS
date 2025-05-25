// Creo los arrays vacíos que necesito
let libros = []
let usuarios = []
let locaciones = []
let prestamos = []
let prestamoNro = 0

function crearLocacion(locacion) {
    locaciones.push(locacion)
    console.log(locaciones)
}

function validacionDeEleccionConArray(valor, array) {
    valor = valor.trim()
    return valor !== null && valor !== "" && !isNaN(valor) && valor >= 0 && valor < array.length
}

function validacionDeMenu(valor, items) {
    valor = valor.trim()
    return valor !== null && valor !== "" && !isNaN(valor) && valor >= 0 && valor <= items
}

function validacionDeEleccionSinArray(valor, piso = 0, techo = Infinity) {
    valor = valor.trim()
    valor = valor.replace(/\D/g, "") // uso regex para normalizar el dato, quitando todo lo que no sea número
    let esValido = valor !== null && valor !== "" && !isNaN(valor) && valor >= piso && valor <= techo
    return { Valor: valor, esValido: esValido }
}


function validacionDeISBN(valor, piso = 10, techo = 13) {
    valor = valor.trim()
    valor = valor.replace(/\D/g, "") // uso regex para normalizar el dato, quitando todo lo que no sea número
    let esValido = valor !== null && valor !== "" && !isNaN(valor) && valor.length >= piso && valor.length <= techo
    return { Valor: valor, esValido: esValido }
}

function buscarUsuario() {

    for (let intentos = 3; intentos > 0; intentos--) {
        buscarPorDNI = Number(prompt("👤Ingresá el número de DNI del usuario"))
        console.log(buscarPorDNI)

        let usuario = usuarios.find(u => u.DNI === buscarPorDNI)

        if (usuario) {
            alert(`➡️ Estás a punto de prestarle un libro a ${usuario.Nombre} ${usuario.Apellido} - DNI ${usuario.DNI}`)
            console.log(usuario)
            return usuario
        } else {
            alert("🤷‍♂️ DNI no encontrado, intenta nuevamente.")
        }
    }

    alert("❌ Has agotado los intentos. Volverás al menú principal.")
    return null
}

// Hago el menú
const menu = `Bienvenidx. ¿Qué deseás hacer hoy? 
    \n 1- Nueva locación
    \n 2- Alta de nuevo usuario
    \n 3- Ingreso de nuevo libro
    \n 4- Préstamo
    \n 5- Devolución
    \n 6- Ver libros prestados
    \n 7- Ver préstamos fuera de fecha
    \n 0- Salir`


let bandera = true

while (bandera) {

    let opciones = Number(prompt(menu))

    switch (opciones) {

        case null:

        case 0:
            bandera = false
            break

        case 1:
            let mensaje = prompt("¿Cómo se llaman la nueva locación?")

            crearLocacion(mensaje)

            alert(`Se ha incorporado "${mensaje}" como una nueva locación. A partir de ahora, podrás guardar libros ahí.`)

            break

        case 2: // Crear usuario
            let apellido = prompt("Ingresá el apellido del nuevo usuario").toUpperCase()

            let nombre = prompt("Ingresá su nombre de pila").toUpperCase()

            let mensajeDNI = "Ingresá su número de DNI"
            let seleccionDNI
            let esDNIValido
            let dni

            do {

                seleccionDNI = prompt(mensajeDNI)

                let resultadoDNI = validacionDeEleccionSinArray(seleccionDNI, 10_000_000, 99_999_999)

                esDNIValido = resultadoDNI.esValido

                dni = Number(resultadoDNI.Valor)

                if (!esDNIValido) {
                    alert("❌ Lo sentimos. No ingresaste un valor válido.")
                }

            } while (!esDNIValido)

            let agregarUsuario = (apellido, nombre, dni) => { usuarios.push({ Apellido: apellido, Nombre: nombre, DNI: dni }) }

            agregarUsuario(apellido, nombre, dni)

            alert(`Se ha agregado a ${nombre} ${apellido} al registro de usuarios. Usaremos su número de DNI como número de socio: ${dni}`)

            console.log(usuarios)

            break

        case 3: // Crear libro

            if (locaciones.length == 0) {
                alert("⚠️ No hay locaciones displonibles en las que almacenar libros. Vuelva al menú principal e ingrese una.")
                break
            }

            let mensajeISBN = "Ingresá el código ISBN del libro (es un número entre 10 y 13 digitos)"
            let seleccionISBN
            let esISBNValido
            let isbn

            do {

                seleccionISBN = prompt(mensajeISBN)
                2
                let resultadoISBN = validacionDeISBN(seleccionISBN)

                esISBNValido = resultadoISBN.esValido

                isbn = Number(resultadoISBN.Valor)


                if (!esISBNValido) {
                    alert("❌ Lo sentimos. No ingresaste un valor válido.")
                }

            } while (!esISBNValido)

            let ejemplar = libros.find(l => l.ISBN === isbn)
            console.log(ejemplar)

            if (ejemplar) {
                let libroDuplicado = Number(prompt(`Ya tenemos un libro con ese ISBN. Corrobore los datos ingresados: "${ejemplar.Título}" de ${ejemplar.Autor} (${ejemplar.ISBN}). Cantidad existente: ${ejemplar.Ejemplares} \n\n 👉¿Qué desea hacer? \n\n 1- Agregar un nuevo ejemplar de este libro al catálogo \n 2- Cancelar`))

                if (libroDuplicado == 1) {
                    ejemplar.Ejemplares++
                    alert(`💾CAMBIOS GUARDADOS \n Acabás de sumar un ejemplar al siguiente libro: \n-ISBN: ${ejemplar.ISBN}\n-Título: ${ejemplar.Título}\n-Autor: ${ejemplar.Autor}\n-Número actualizado de ejemplares: ${ejemplar.Ejemplares}`)

                } else if (libroDuplicado == 2) {
                    alert("❌ OPERACIÓN CANCELADA")
                }

                break
            }

            let titulo = prompt("Ingresá el título de la obra").toUpperCase()
            let autor = prompt("Indicá el nombre completo del autor").toUpperCase()
            let cantidad = Number(prompt("Cantidad de nuevos ejemplares a ingresar"))
            if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
                cantidad = 1 // Asigna por defecto el valor 1 si el prompt queda vacío o es un valor no numérico
            }


            let mensajeLocaciones = `Ingrese la locación en la que se encuentra físicamente el libro utilizando el número de la opción correspondiente:\n`
            for (let i = 0; i < locaciones.length; i++) {
                mensajeLocaciones += `\n ${locaciones.indexOf(locaciones[i])} - ${locaciones[i]}`
            }

            const esLocacionValida = function (valor) {
                valor = valor.trim() // tuve que agregar esto para que no convierta el espacio en blanco en un "0" (ya que 0 es el valor de la primera opción que se muestra en pantalla)
                return valor !== null && valor !== "" && !isNaN(valor) && valor >= 0 && valor < locaciones.length // retorna un booleano
            }

            do {
                seleccionDeLocacion = prompt(mensajeLocaciones)

                if (!esLocacionValida(seleccionDeLocacion)) {
                    alert("❌ Lo sentimos. No seleccionaste una locación válida. Intenta nuevamente.")
                }

            } while (!esLocacionValida(seleccionDeLocacion)) // muestra error y vuelve siempre al prompt de selección de locación hasta tanto el valor ingresado satisfaga la validación de la funcion esLocacionValida

            seleccionDeLocacion = Number(seleccionDeLocacion) // me aseguro de que el valor ingresado no sea leído como string
            locacion = locaciones[seleccionDeLocacion] // uso el valor del número ingresado como índice para recuperar la locación del array locacionbes y seteo la variable correspondiente con el valor que corresponde


            let agregarLibro = () => { libros.push({ Autor: autor, Título: titulo, ISBN: isbn, Ejemplares: cantidad, Locación: locacion }) }

            agregarLibro()

            alert(`Se ha agregado ${cantidad} ejemplar de ${titulo} de ${autor} a tu biblioteca en ${locacion}. Podrás prestarlo cuando quieras.`)
            console.log(libros)
            break

        case 4: // Prestar

            if (libros.length === 0 || usuarios.length === 0){
                alert("🧙‍♂️ No podemos hacer magia. 🪄 Para poder prestar un libro necesitarás, primero, ingresar libros en la biblioteca y registrar al menos un usuario.")
                break
            }
            
            let usuarioEncontrado = buscarUsuario()
            if (!usuarioEncontrado) {
                break
            }
            //Acá no entiendo el scope. Si las variables están encapsuladas dentro de case no tendria que haber problema con que tengan el mismo nombre que en otro lugar. Sin embargo, no se ejecuta nada si lo hago así
            let mensajeISBN2 = "Ingresá el código ISBN del libro (es un número entre 10 y 13 digitos)"
            let seleccionISBN2
            let esISBNValido2
            let isbn2

            do {

                seleccionISBN2 = prompt(mensajeISBN2)

                let resultadoISBN2 = validacionDeISBN(seleccionISBN2)

                esISBNValido2 = resultadoISBN2.esValido

                isbn2 = Number(resultadoISBN2.Valor)


                if (!esISBNValido2) {
                    alert("❌ Lo sentimos. No ingresaste un valor válido.")
                }

            } while (!esISBNValido2)


            let libro = libros.find(libro => libro.ISBN === isbn2)

            console.log(libro)

            if (!libro) {
                alert("❌ No tenemos un libro con ese ISBN. Corrobore los datos ingresados.")
                break
            } else if (libro.ejemplar = 0) {
                alert("❌ Lo sentimos. Este libro no se encuentra actualmente disponible.")
                break
            }

            alert(`📕 Libro con ISBN ${libro.ISBN} encontrado:\n-Título: ${libro.Título}\n-Autor: ${libro.Autor}\n-Ejemplares: ${libro.Ejemplares}`)

            prestamoNro++

            let fechaPrestamo = new Date()
            let fechaVencimiento = new Date()

            //Modificar para que diga +7 luego del testeo
            fechaVencimiento.setDate(fechaVencimiento.getDate() - 7)

            // Investigar cómo hacer toLocaleDateString("es-AR")

            function prestarLibro() {
                prestamos.push({
                    Código: prestamoNro,
                    Usuario: usuarioEncontrado.DNI,
                    Nombre: `${usuarioEncontrado.Nombre} ${usuarioEncontrado.Apellido}`,
                    Título: libro.Título,
                    Autor: libro.Autor,
                    Fecha: fechaPrestamo,
                    Vencimiento: fechaVencimiento
                })
                console.log(libro.Ejemplares)
                libro.Ejemplares -= 1
                console.log(libro.Ejemplares)
            }

            if (libro.Ejemplares >= 1) {
                prestarLibro()

                alert(`✅ Préstamo confirmado: 
                    \n👤DATOS DE USUARIO: ${usuarioEncontrado.Nombre} ${usuarioEncontrado.Apellido} (DNI: ${usuarioEncontrado.DNI})
                    \n📕 DATOS DEL LIBRO: ${libro.Título} ${libro.Autor} (ISBN: ${libro.ISBN})
                    \n📅FECHA: ${fechaPrestamo} 
                    \n🔴 VENCIMIENTO: ${fechaVencimiento}`)

            } else {
                alert("No quedan ejemplares en la biblioteca. El libro que usted busca se encuentra prestado")
                break
            }

            console.log(prestamos)

            break

        case 5: // Devolver

            if (prestamos.length === 0) {
                alert("⚠️ Para devolver un libro, primero debés prestarlo. Es cuestión de sentido común... 🧉")
                break
            } 
            
            let usuarioDevolver = Number(prompt("🪪 Ingresá el número del socio que desea devolver o renovar su préstamo"))

            let devolver = prestamos.filter(libroParaDevolver => libroParaDevolver.Usuario === usuarioDevolver)

            let mensajeDevolver = `Los libros disponibles para devolver son:`

            for (let i = 0; i < devolver.length; i++) {
                mensajeDevolver += `\n______________________________________________________\n 🔑 Código: ${devolver[i].Código} \n📌 Usuario: ${devolver[i].Nombre} (DNI ${devolver[i].Usuario} \n📕 Titulo: "${devolver[i].Título}" de ${devolver[i].Autor} \n📅 Vencimiento: ${devolver[i].Vencimiento}`
            }

            mensajeDevolver += `\n______________________________________________________\n \n👉👉 Ingresá el código del libro que querés devolver.`

            let itemDevolver = prompt(mensajeDevolver)

            let indiceDevolver = prestamos.findIndex(item => item.Código === Number(itemDevolver))

            console.log(indiceDevolver)

            if (indiceDevolver !== -1) {
                prestamos.splice(indiceDevolver, 1)

                alert("¡Libro devuelto! ✅")
            }

            console.log(prestamos)

            // sumar de nuevo el libro al inventario 
            break

        case 6: // Ver préstamos
            if (prestamos.length === 0) {
                alert("Por el momento, nada que mostrar aquí 👀. No hay libros prestados a domicilio. Vuelva más tarde.")
                break
            } else {
                
                let mensajePrestamos = `📚 Los libros prestados son:\n`

                for (let i = 0; i < prestamos.length; i++) {
                    let prestamo = prestamos[i]

                    mensajePrestamos += `\n👉 ${prestamo.Título} - ${prestamo.Autor} | Usuario: ${prestamo.Nombre} (DNI: ${prestamo.Usuario}) | Vence el: ${prestamo.Vencimiento} \n----------------------`
                }

                alert(mensajePrestamos)
            }

            break

        case 7: // Ver retrasados

            let hoy = new Date()

            let atrasados = prestamos.filter(atrasado => new Date(atrasado.Vencimiento) < hoy)

            let mensajeAtrasados = `Los siguientes libros deberían haber vuelto ya a la biblioteca:\n______________________________________________________`

            for (let i = 0; i < atrasados.length; i++) {
                mensajeAtrasados += `\n📌 Usuario: ${atrasados[i].Nombre} (DNI ${atrasados[i].Usuario} \n📕 Titulo: "${atrasados[i].Título}" de ${atrasados[i].Autor} \n📅 Vencimiento: ${atrasados[i].Vencimiento} \n______________________________________________________`
            }

            if (atrasados.length != 0){
                alert(mensajeAtrasados)
            } else {
                alert("👮 De momento todo está en orden. No hay préstamos atrasados. Pero nos mantendremos vigilantes...")
            }

            break

        default:

            alert('La opción que seleccionaste no está disponible. Volvé a internarlo.')

            break
    }
}