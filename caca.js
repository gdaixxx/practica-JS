console.log(1)

let b = 5;

function sumarCaca (a){
    a++
    return a
}

sumarCaca(b)
console.log(b)

b = sumarCaca(b)

console.log(b)

const gymBro = "Lorenzoputo"

function homosexualidad (homosexual) {
    return homosexual.substring(homosexual.length-4);
}

let text =  `This is a multiline
string that
just works!`

console.log("Hola,", homosexualidad(gymBro));

function capitalize(word) {
 return word[0].toLocaleUpperCase   ;
}

// Sample usage - do not modify
console.log(capitalize("sam")); // "Sam"

function getCapitalized(name) {
    // capitalized version of name (example: "alEX" becomes "Alex")
    return name[0].toUpperCase() + name.substring(1).toLowerCase();
}

console.log(getCapitalized("fAN"))

let plata = Number(prompt("¿Cuánta plata tenés?"))
console.log(typeof plata)

if (!isNaN(plata)){
    let saldo = alert("Tenés "+ plata + "/" + typeof plata)
} else{
    let saldo = alert("No ingresaste número, chabón")
}
