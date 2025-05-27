// Creo los arrays vacíos que necesito
let libros = []
let usuarios = []
let locaciones = []
let prestamos = []
let prestamoNro = 0

function crearLocacion(locacion) {   
    locaciones.push(locacion)
    alert(`✅ Se ha incorporado "${locacion}" como una nueva locación. A partir de ahora, podrás guardar libros ahí.`)
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
    if (valor === null) {return null}
    valor = valor.trim()
    valor = valor.replace(/\D/g, "") // uso regex para normalizar el dato, quitando todo lo que no sea número
    let esValido = valor !== null && valor !== "" && !isNaN(valor) && valor.length >= piso && valor.length <= techo
    return { Valor: valor, esValido: esValido }
}

function obtenerISBNValido() {
    let mensajeISBN = "➡️ Ingresá el código ISBN del libro (es un número entre 10 y 13 dígitos)"
    let seleccionISBN, esISBNValido, isbn

    do {
        seleccionISBN = prompt(mensajeISBN)

        if (seleccionISBN === null) {
            alert("🚪 Operación cancelada.")
            return null
        }

        let resultadoISBN = validacionDeISBN(seleccionISBN)

        esISBNValido = resultadoISBN.esValido
        isbn = Number(resultadoISBN.Valor)

        if (!esISBNValido) {
            alert("❌ Lo sentimos. No ingresaste un valor válido.")
        }

    } while (!esISBNValido)

    return isbn
}


function buscarUsuarioParaPrestar() {

    for (let intentos = 3; intentos > 0; intentos--) {
        buscarPorDNI = Number(prompt("👤Ingresá el número de DNI del usuario"))

        let usuario = usuarios.find(u => u.DNI === buscarPorDNI)

        if (usuario) {
            alert(`➡️ Estás a punto de prestarle un libro a ${usuario.Nombre} ${usuario.Apellido} - DNI ${usuario.DNI}`)
            return usuario
        } else {
            alert("🤷‍♂️ DNI no encontrado, intenta nuevamente.")
        }
    }

    alert("❌ Has agotado los intentos. Volverás al menú principal.")
    return null
}

function buscarUsuarioParaDevolver() {

    for (let intentos = 3; intentos > 0; intentos--) {
        buscarPorDNI = Number(prompt("🪪 Ingresá el número del socio que desea devolver o renovar su préstamo"))


        let usuario = usuarios.find(u => u.DNI === buscarPorDNI)

        if (usuario) {
            alert(`➡️ Usuario encontrado: ${usuario.Nombre} ${usuario.Apellido} - DNI ${usuario.DNI}`)
            return usuario.DNI
        } else {
            alert("🤷‍♂️ Usuario no encontrado, intenta nuevamente.")
        }
    }

    alert("❌ Has agotado los intentos. Volverás al menú principal.")
    return null
}

//Funcion para asegurarme de que no dejan vacío ni completan con espacio en blanco un campo obligatorio de tipo texto
function obtenerTextoValido(msj) {

    let noVacio

    do {
        noVacio = prompt(msj)

        if (noVacio === null) {
            alert("🚪 Operación cancelada.")

            return null// Espero que evite dar error o entrar en un bucle infinito si alguien cacela
        }

        noVacio = noVacio.trim() // Elimina espacios innecesarios

        if (noVacio === "") {
            alert("🫷 Debés ingresar texto antes de continuar.")
        }

    } while (noVacio === "")

    if (typeof noVacio === "string") { return noVacio.toUpperCase() }
}

// Funcion validadora del DNI
function obtenerDocumentoValido() {
    let mensajeDNI = "👉 Ingresá su número de DNI"
    let seleccionDNI
    let esDNIValido
    let dni

    do {
        seleccionDNI = prompt(mensajeDNI)

        if (seleccionDNI === null) {
            alert("🚪 Operación cancelada.")
            return null// Espero que evite dar error o entrar en un bucle infinito si alguien cacela
        }

        let resultadoDNI = validacionDeEleccionSinArray(seleccionDNI, 10_000_000, 99_999_999)

        esDNIValido = resultadoDNI.esValido

        dni = Number(resultadoDNI.Valor)

        if (!esDNIValido) {
            alert("❌ Lo sentimos. No ingresaste un valor válido.")
        }

    } while (!esDNIValido)

    return dni
}

// Hago el menú
const menu = `👋 Bienvenidx. ¿Qué deseás hacer hoy? 
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

        case 1: // Crear lugar de guardado
            let mensajeLocacion = "🏛️ ¿Cómo se llaman la nueva locación?"
            let locacion = obtenerTextoValido(mensajeLocacion)
            if (locacion === null) { break } else {crearLocacion(locacion)}
            break

        case 2: // Crear usuario

            // Solicitar apellido
            let mensajeApellido = "👉 Ingresá el apellido del nuevo usuario" // mensaje que se usará en el prompt de la función validadora
            let apellido = obtenerTextoValido(mensajeApellido) //ejecuta una función que incluye el prompt para solicitar el dato y su validación
            if (apellido === null) { break } // interrumpe ejecución si se ha cancelado

            // Solicitar nombre
            let mensajeNombre = "👉 Ingresá su nombre de pila"
            let nombre = obtenerTextoValido(mensajeNombre)
            if (nombre === null) { break }

            //Solicitar DNI
            dni = obtenerDocumentoValido()
            if (dni === null) { break }
            if (usuarios.find(usuario => usuario.DNI === dni)) {
                alert("❌ Operación cancelada. Ya hay un usuario con este DNI. Por favor, no ingreses dos veces a un mismo usuario.")
                break
            }

            // Generar registro
            let agregarUsuario = (apellido, nombre, dniIngresado) => { usuarios.push({ Apellido: apellido, Nombre: nombre, DNI: dni }) }

            agregarUsuario(apellido, nombre, dni)

            alert(`✅ Se ha agregado a ${nombre} ${apellido} al registro de usuarios. Usaremos su número de DNI como número de socio: ${dni}`)

            break

        case 3: // Crear libro

            if (locaciones.length == 0) {
                alert("⚠️ No hay locaciones displonibles en las que almacenar libros. Vuelva al menú principal e ingrese una.")
                break
            }

            let isbn = obtenerISBNValido()

            if (isbn === null){break}

            let ejemplar = libros.find(l => l.ISBN === isbn)


            if (ejemplar) {
                let libroDuplicado = Number(prompt(`🚨 Ya tenemos un libro con ese ISBN. Corroborá los datos ingresados: "${ejemplar.Título}" de ${ejemplar.Autor} (${ejemplar.ISBN}). Cantidad existente: ${ejemplar.Ejemplares} \n\n 👉¿Qué deseás hacer? \n\n 1- Agregar un nuevo ejemplar de este libro al catálogo \n 2- Cancelar`))

                if (libroDuplicado == 1) {
                    ejemplar.Ejemplares++
                    alert(`💾CAMBIOS GUARDADOS \n ✅ Acabás de sumar un ejemplar al siguiente libro: \n-ISBN: ${ejemplar.ISBN}\n-Título: ${ejemplar.Título}\n-Autor: ${ejemplar.Autor}\n-Número actualizado de ejemplares: ${ejemplar.Ejemplares}`)

                } else if (libroDuplicado == 2) {
                    alert("❌ OPERACIÓN CANCELADA")
                }

                break
            }
          
            let mensajeTitulo = "➡️Ingresá el título de la obra"
            let titulo = obtenerTextoValido(mensajeTitulo)
            if (titulo === null){break}

            let mensajeAutor = "🧑‍💼Indicá el nombre completo del autor"
            let autor = obtenerTextoValido(mensajeAutor) 
            if (autor === null){break}

            let cantidad = Number(prompt("🧮 Cantidad de nuevos ejemplares a ingresar"))
            if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
                cantidad = 1 // Asigna por defecto el valor 1 si el prompt queda vacío o es un valor no numérico
            }


            let mensajeLocaciones = `🏛️ Seleccioná la locación en la que se encuentra guardado físicamente el libro, utilizando para ello el número de la opción correspondiente:\n`
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

            let locacionLibro = locaciones[seleccionDeLocacion] // uso el valor del número ingresado como índice para recuperar la locación del array locacionbes y seteo la variable correspondiente con el valor que corresponde


            let agregarLibro = () => { libros.push({ Autor: autor, Título: titulo, ISBN: isbn, Ejemplares: cantidad, Locación: locacionLibro}) }

            agregarLibro()

            alert(`✅ Se ha agregado ${cantidad} ejemplar de ${titulo} de ${autor} a tu biblioteca en ${locacionLibro}. Podrás prestarlo cuando quieras.`)

            break

        case 4: // Prestar

            if (libros.length === 0 || usuarios.length === 0) {
                alert("🧙‍♂️ No podemos hacer magia. 🪄 Para poder prestar un libro necesitarás, primero, ingresar libros en la biblioteca y registrar al menos un usuario.")
                break
            }

            let usuarioEncontrado = buscarUsuarioParaPrestar()

            if (!usuarioEncontrado) {
                break
            }

            let isbnDevolver = obtenerISBNValido()

            let libro = libros.find(libro => libro.ISBN === isbnDevolver)



            if (!libro) {
                alert("❌ No tenemos un libro con ese ISBN. Corroborá los datos ingresados.")
                break
            } else if (libro.Ejemplares === 0) {
                alert("❌ Lo sentimos. Este libro no se encuentra actualmente disponible.")
                break
            }

            alert(`📕 Libro con ISBN ${libro.ISBN} encontrado:\n-Título: ${libro.Título}\n-Autor: ${libro.Autor}\n-Ejemplares: ${libro.Ejemplares}`)



            prestamoNro++

            let fechaPrestamo = new Date()
            let fechaVencimiento = new Date()

            fechaVencimiento.setDate(fechaVencimiento.getDate() + 7)

            // Investigar cómo hacer toLocaleDateString("es-AR")

            function prestarLibro() {
                prestamos.push({
                    Código: prestamoNro,
                    Usuario: usuarioEncontrado.DNI,
                    Nombre: `${usuarioEncontrado.Nombre} ${usuarioEncontrado.Apellido}`,
                    Título: libro.Título,
                    Autor: libro.Autor,
                    ISBN: libro.ISBN,
                    Fecha: fechaPrestamo,
                    Vencimiento: fechaVencimiento
                })

                libro.Ejemplares -= 1

            }

            if (libro.Ejemplares >= 1) {
                prestarLibro()

                alert(`✅ Préstamo confirmado: 
                    \n👤DATOS DE USUARIO: ${usuarioEncontrado.Nombre} ${usuarioEncontrado.Apellido} (DNI: ${usuarioEncontrado.DNI})
                    \n📕 DATOS DEL LIBRO: ${libro.Título} ${libro.Autor} (ISBN: ${libro.ISBN})
                    \n📅FECHA: ${fechaPrestamo} 
                    \n🔴 VENCIMIENTO: ${fechaVencimiento}`)

            } else {
                alert("😫 No quedan ejemplares en la biblioteca. El libro que usted buscás se encuentra prestado.")
                break
            }

            break

        case 5: // Devolver
            //falta poner alerta si el valor ingresado es nulo
            if (prestamos.length === 0) {
                alert("⚠️ Para devolver un libro, primero debés prestarlo. Es cuestión de sentido común... 🧉")
                break
            }

            let usuarioDevolver = buscarUsuarioParaDevolver()

            if (!usuarioDevolver) {
                break
            }

            let devolver = prestamos.filter(libroParaDevolver => libroParaDevolver.Usuario === usuarioDevolver)

            let mensajeDevolver = `📋 Los libros disponibles para devolver son:`

            for (let i = 0; i < devolver.length; i++) {
                mensajeDevolver += `\n______________________________________________________\n 🔑 Código de préstamo: ${devolver[i].Código} \n📌 Usuario: ${devolver[i].Nombre} (DNI ${devolver[i].Usuario} \n📕 Titulo: "${devolver[i].Título}" de ${devolver[i].Autor} \n📅 Vencimiento: ${devolver[i].Vencimiento} ${devolver[i].ISBN}`
            }

            mensajeDevolver += `\n______________________________________________________\n \n👉👉 Ingresá el código del libro que querés devolver.`

            let itemDevolver = prompt(mensajeDevolver)

            let indiceDevolver = prestamos.findIndex(item => item.Código === Number(itemDevolver))

            if (indiceDevolver !== -1) {

                let encontrarLibro = libros.findIndex(devolverEjemplar => devolverEjemplar.ISBN === Number(prestamos[indiceDevolver].ISBN))
                
                libros[encontrarLibro].Ejemplares++ // suma un ejemplar  cuando el libro es devuelto

                prestamos.splice(indiceDevolver, 1)

                alert(`✅ ¡Libro devuelto!`)
            }

            break

        case 6: // Ver préstamos
            if (prestamos.length === 0) {
                alert("Por el momento, nada que mostrar aquí 👀. No hay libros prestados a domicilio. Volvé más tarde.")
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

            let mensajeAtrasados = `📋Los siguientes libros deberían haber vuelto ya a la biblioteca:\n______________________________________________________`

            for (let i = 0; i < atrasados.length; i++) {
                mensajeAtrasados += `\n📌 Usuario: ${atrasados[i].Nombre} (DNI ${atrasados[i].Usuario} \n📕 Titulo: "${atrasados[i].Título}" de ${atrasados[i].Autor} \n📅 Vencimiento: ${atrasados[i].Vencimiento} \n______________________________________________________`
            }

            if (atrasados.length != 0) {
                alert(mensajeAtrasados)
            } else {
                alert("👮 De momento todo está en orden. No hay préstamos atrasados. Pero nos mantendremos vigilantes...")
            }

            break

        default:

            alert('❌ La opción que seleccionaste no está disponible. Volvé a internarlo... (si te animás 👻)')

            break
    }
}