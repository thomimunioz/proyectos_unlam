class Era {
    constructor(era) {
      this.era = era;
    }
  
    get nombre() {
      return this.era['nombre'];
    }
  
    get imagen() {
      return this.era['imagen'];
    }
  
    get iframe() {
      return this.era['iframe'];
    }
  
    get canciones() {
      
      return this.era['canciones'].map(cancionData => new Cancion(cancionData));
    }

    get genero(){
        return this.era['genero']
    }

    get productores(){
        return this.era['productores'].map(productoresData => new Productor(productoresData))
    }

    get descripcion(){
        return this.era['descripcion']
    }
  }
  
class Cancion {
    constructor(cancionData) {
      this.nombreCancion = cancionData['nombreCancion'];
      this.linkMVMostar = cancionData['linkMV'];
      this.linkLyricMostrar = cancionData['linkLV'];
    }
  
    get nombre() {
      return this.nombreCancion;
    }
  
    get linkMV() {
      return this.linkMVMostar;
    }
  
    get linkLyric() {
      return this.linkLyricMostrar;
    }
  }

class Productor {
    constructor(productoresData){
        this.nombreProductorMostrar = productoresData['nombreProd']
        this.productorLinkMostrar = productoresData['productorLink']
    }

    get nombreProductor(){
      return this.nombreProductorMostrar;
    }

    get productorLink(){
      return this.productorLinkMostrar;
    }
}