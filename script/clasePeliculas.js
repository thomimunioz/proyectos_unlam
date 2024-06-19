class Pelicula {
    constructor(pelicula){
        this.pelicula = pelicula;
    }

    get nombre(){
        return this.pelicula['nombre'];
    }

    get duracion(){
        return this.pelicula['duracion'];
    }
    
    get genero(){
        return this.pelicula['genero'];
    }

    get descripcion(){
        return this.pelicula['descripcion'];
    }

    get imagen(){
        return this.pelicula['imagen'];
    }

    get iframe(){
        return this.pelicula['iframe'];
    }

    get youtubeLink(){
        return this.pelicula['youtubeLink'];
    }
    
    get productores(){
        return this.pelicula['productores'].map(productoresData => new Productor(productoresData))
    }

}

class Productor{
    constructor(productoresData){
        this.nombreProductorMostrar = productoresData['nombreProd'];
        this.productorLinkMostrar= productoresData['productorLink'];
    }

    get nombreProductor(){
        return this.nombreProductorMostrar;
    }

    get productorLink(){
        return this.productorLinkMostrar;
    }
}