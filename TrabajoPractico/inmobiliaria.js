"use strict";
exports.__esModule = true;
var Propiedad = /** @class */ (function () {
    function Propiedad(identificador, tipoPropiedad, tipoTransaccion, precio, mts2, ubicacion, disponible) {
        this.identificador = identificador;
        this.tipoPropiedad = tipoPropiedad;
        this.tipoTransaccion = tipoTransaccion;
        this.precio = precio;
        this.mts2 = mts2;
        this.ubicacion = ubicacion;
        this.disponible = disponible;
    }
    Propiedad.prototype.getIdentificador = function () {
        return this.identificador;
    };
    Propiedad.prototype.getTipoProp = function () {
        return this.tipoPropiedad;
    };
    Propiedad.prototype.getTipoTrans = function () {
        return this.tipoTransaccion;
    };
    Propiedad.prototype.getPrecio = function () {
        return this.precio;
    };
    Propiedad.prototype.getMts2 = function () {
        return this.mts2;
    };
    Propiedad.prototype.getUbicacion = function () {
        return this.ubicacion;
    };
    Propiedad.prototype.getDisponible = function () {
        return this.disponible;
    };
    return Propiedad;
}());
var RegistroDePropieadades = /** @class */ (function () {
    function RegistroDePropieadades(propiedades) {
        this.propiedades = propiedades;
    }
    RegistroDePropieadades.prototype.agregarPropiedad = function (propiedad) {
        this.propiedades.push(propiedad);
    };
    RegistroDePropieadades.prototype.eliminarPropiedad = function () {
    };
    RegistroDePropieadades.prototype.verPropiedad = function () {
    };
    RegistroDePropieadades.prototype.getCantidadDeLotes = function () {
        var sumaLotes = 0;
        for (var i = 0; i < this.propiedades.length; i++) {
            if (this.propiedades[i].getTipoProp() == "Lote") {
                sumaLotes = sumaLotes + 1;
            }
        }
        return sumaLotes;
    };
    RegistroDePropieadades.prototype.getCantidadDeCasas = function () {
        var sumaCasas = 0;
        for (var i = 0; i < this.propiedades.length; i++) {
            if (this.propiedades[i].getTipoProp() == "Casa") {
                sumaCasas = sumaCasas + 1;
            }
        }
        return sumaCasas;
    };
    RegistroDePropieadades.prototype.getCantidadDeDeptos = function () {
        var sumaDeptos = 0;
        for (var i = 0; i < this.propiedades.length; i++) {
            if (this.propiedades[i].getTipoProp() == "Departamento") {
                sumaDeptos = sumaDeptos + 1;
            }
        }
        return sumaDeptos;
    };
    return RegistroDePropieadades;
}());
var fs = require("fs");
var texto = fs.readFileSync("propiedades.txt", "utf-8");
var linea = texto.split("\r\n");
var auxiliar;
var propAux;
var arregloProp = [];
for (var i = 0; i < linea.length; i++) {
    auxiliar = linea[i].split(",");
    propAux = new Propiedad(auxiliar[0], auxiliar[1], auxiliar[2], auxiliar[3], auxiliar[4], auxiliar[5], auxiliar[6]);
    arregloProp.push(propAux);
}
var allProp = new RegistroDePropieadades(arregloProp);
var cantidadLotes;
cantidadLotes = allProp.getCantidadDeLotes();
var cantidadCasas;
cantidadCasas = allProp.getCantidadDeCasas();
var cantidadDeptos;
cantidadDeptos = allProp.getCantidadDeDeptos();
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
chart.addBar(cantidadCasas + cantidadLotes + cantidadDeptos, 'red');
chart.addBar(cantidadLotes).addBar(cantidadCasas).addBar(cantidadDeptos);
chart.draw();
