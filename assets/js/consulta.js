
export let animales = (async() => {
    const url = "./animales.json";
    const getData = async() => {
        const res = await fetch(url);
        const dato = await res.json();
        return dato;
    }
    return await getData();
})();