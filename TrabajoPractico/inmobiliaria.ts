class Propiedad {
    private precio: number;
    private mts2: number;
    private ubicacion: string;
    private tipoPropiedad: string;
    private tipoTransaccion: string;
    private disponible: boolean;
    private identificador: number;

    public constructor(identificador: number, tipoPropiedad: string, tipoTransaccion: string, precio: number, mts2: number, ubicacion: string, disponible: boolean) {
        this.identificador=identificador;
        this.tipoPropiedad=tipoPropiedad;
        this.tipoTransaccion=tipoTransaccion;
        this.precio=precio;
        this.mts2=mts2;
        this.ubicacion=ubicacion;
        this.disponible=disponible;
    }

    getIdentificador ():number {
        return this.identificador
    }
    getTipoProp ():string {
        return this.tipoPropiedad
    }
    getTipoTrans ():string {
        return this.tipoTransaccion
    }
    getPrecio ():number {
        return this.precio
    }
    getMts2 ():number {
        return this.mts2
    }
    getUbicacion ():string {
        return this.ubicacion
    }
    getDisponible ():boolean {
        return this.disponible
    }


}

class RegistroDePropieadades {
    private propiedades: Propiedad[];

    public constructor (propiedades: Propiedad[]){
        this.propiedades=propiedades;
    }

    agregarPropiedad (propiedad: Propiedad):void {
        this.propiedades.push (propiedad)
    }

    eliminarPropiedad (){

    }

    verPropiedad (){

    }

    getCantidadDeLotes ():number{
        let sumaLotes:number=0;
        for (let i=0; i<this.propiedades.length; i++) {
            if (this.propiedades[i].getTipoProp() == "Lote"){
                sumaLotes = sumaLotes+1;
            }
        }
        return sumaLotes;
    }

    getCantidadDeCasas ():number{
        let sumaCasas:number=0;
        for (let i=0; i<this.propiedades.length; i++) {
            if (this.propiedades[i].getTipoProp()== "Casa"){
                sumaCasas=sumaCasas+1;
            }
        }
        return sumaCasas;
    }

    getCantidadDeDeptos():number{
        let sumaDeptos:number=0;
            for(let i=0; i<this.propiedades.length;i++){
                if (this.propiedades[i].getTipoProp()=="Departamento"){
                    sumaDeptos=sumaDeptos+1
                }
            }
        return sumaDeptos;
    }

}


import * as fs from "fs";
let texto: string = fs.readFileSync("propiedades.txt", "utf-8"); 

let linea: string[] = texto.split("\r\n");

let auxiliar: string[];

let propAux: Propiedad;

let arregloProp: Propiedad[]=[];

for (let i=0; i<linea.length; i++){
    auxiliar = linea[i].split(",");
    propAux = new Propiedad(auxiliar[0],auxiliar[1],auxiliar[2],auxiliar[3],auxiliar[4],auxiliar[5],auxiliar[6]);
    arregloProp.push (propAux);
}


let allProp = new RegistroDePropieadades (arregloProp);

let cantidadLotes:number;
cantidadLotes=allProp.getCantidadDeLotes();


let cantidadCasas:number;
cantidadCasas=allProp.getCantidadDeCasas();

let cantidadDeptos:number;
cantidadDeptos=allProp.getCantidadDeDeptos();

var Chart = require('cli-chart');
var chart = new Chart({
    xlabel: 'Tipo de Propiedad',
    ylabel: 'Cantidad',
    direction: 'y',
    width: 20,
    height: 20,
    lmargin: 15,
    step: 3
});

chart.addBar(cantidadCasas+cantidadLotes+cantidadDeptos, 'red');
chart.addBar(cantidadLotes).addBar(cantidadCasas).addBar(cantidadDeptos);
chart.draw();