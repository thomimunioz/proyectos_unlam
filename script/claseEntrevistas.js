class Entrevista {
    constructor(entrevista){
        this.entrevista = entrevista;
    }


    get nombre(){
        return this.entrevista['nombre'];
    }

    get entrevistaPortada(){
        return this.entrevista['entrevistaPortada'];
    }
    
    get iframe(){
        return this.entrevista['iframe'];
    }

    get videoLink(){
        return this.entrevista['videoLink'];
    }

    get duracion(){
        return this.entrevista['duracion'];
    }

    get canal(){
        return this.entrevista['canal'];
    }

    get resumen(){
        return this.entrevista['resumen'];
    }

    get participantes(){
        return this.entrevista['participantes'].map(participantesData => new Participante(participantesData))
    }
}

class Participante {
    constructor(participantesData){
        this.participanteMostrar = participantesData['entrevistador'];
        this.participanteLinkMostrar = participantesData['entrevistadorLink'];
    }

    get nombreParticipante(){
        return this.participanteMostrar;
    }

    get participanteLink(){
        return this.participanteLinkMostrar;
    }

}