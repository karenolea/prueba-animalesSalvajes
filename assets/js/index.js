import { animales} from "./consulta.js";
import { Leon, Lobo, Oso, Serpiente, Aguila } from "./clases/hijo.js";

let registrar = document.querySelector("#btnRegistrar");
let selectAnimal = document.querySelector("#animal");

window.animalesArray = [];

selectAnimal.addEventListener("change", async() => {
   
    let animalArray = await animales;
    animalArray = animalArray.animales;
    let nombreAnimal = selectAnimal.value;
    let imagenPreview = document.getElementById("preview");
    const { imagen } = animalArray.find((a) => a.name === nombreAnimal);
    
    // Acceder a css
    imagenPreview.style.backgroundImage = `url(./assets/imgs/${imagen})`;
    imagenPreview.style.backgroundSize = "cover";

});

registrar.addEventListener("click", async() => {
    let nombreAnimal = document.querySelector("#animal").value;
    let edad = document.querySelector("#edad").value;
    let comentario = document.getElementById("comentarios").value;

    if (!nombreAnimal || !edad || !comentario) { return alert("faltan campos por llenar");}

    async function instanciaAnimal(tipoAnimal, edad, comentario) {
        
        let animalArray = await animales;
        animalArray = animalArray.animales;
        const { imagen, sonido} = animalArray
        .find((a) => a.name === nombreAnimal);
        // console.log(imagen, sonido);
        switch (tipoAnimal) {
            case "Leon":
                return new Leon(tipoAnimal, edad, imagen, comentario, sonido);

            case "Lobo":
                return new Lobo(tipoAnimal, edad, imagen, comentario, sonido);

            case "Oso":
                return new Oso(tipoAnimal, edad, imagen, comentario, sonido);

            case "Serpiente":
                return new Serpiente(tipoAnimal, edad, imagen, comentario, sonido);

            case "Aguila":
                return new Aguila(tipoAnimal, edad, imagen, comentario, sonido);

            default:
                return `Por favor selecciona un animal`;

        }
    }
    animalesArray.push(await instanciaAnimal(nombreAnimal, edad, comentario));
    generacionHtml(animalesArray);

});

function generacionHtml() {
    let htmlAnimales = "";
    animalesArray.forEach((animal, index) => {
        window.animal = animal;
        const getSonido = () => {
            switch (animal.Nombre) {
                case 'Leon':
                    return `animalesArray[${index}].rugir()`;

                case 'Lobo':
                    return `animalesArray[${index}].aullar()`;

                case 'Oso':
                    return `animalesArray[${index}].grunir()`;

                case 'Serpiente':
                    return `animalesArray[${index}].sisear()`;

                case 'Aguila':
                    return `animalesArray[${index}].chillar()`;
            }
        };

        let plantillaHtml = `
        <div class="col-4">
            <div class="card h-100 w-100">

                <button id="btn-display-modal" data-toggle="modal" data-target="#exampleModal" data-img="./assets/imgs/${animal.Img}" data-edad="${animal.Edad}" data-comentarios="${animal.Comentarios}" class="btn" style="background-image:url(./assets/imgs/${animal.Img})">
                </button>

                <div class="card-footer" style="background-color:#6C757D;">
                    <a onclick="${getSonido()}" class="btn w-100"><i class="fas fa-volume-up text-white"></i>
                    </a>

               </div>

            </div>

        </div>`;
        htmlAnimales = htmlAnimales + plantillaHtml;
    });
    document.querySelector("#Animales").innerHTML = htmlAnimales;

};

// evento boostrap para modales
$("#exampleModal").on("show.bs.modal", (e) => {
    const boton = e.relatedTarget;
    //console.log(boton);
    // get obtenemos el atributo img
    const img = boton.getAttribute("data-img");
    const edad = boton.getAttribute("data-edad");
    const comentarios = boton.getAttribute("data-comentarios");
    //console.log(img);
    // set asignamos en el modal vacío cada dato
    document.querySelector("#modal-img").setAttribute("src", img);
    document.querySelector("#modal-edad").textContent = edad;
    document.querySelector("#modal-comentarios").textContent = comentarios;
});