
let modal = document.getElementById("detail");
let closeModal = document.getElementsByClassName("close")[0];
let verComo = document.getElementById("verComo");
let content = document.getElementById("contenido");
let textoTitulo = document.getElementById("titulo");
let textoBtn = document.getElementById("verComo");
let verTablaPeriodica = true;

document.addEventListener("DOMContentLoaded", function () {
    crearTabla();
    modal = document.getElementById("detail");
    closeModal = document.getElementsByClassName("close")[0];
    closeModal.onclick = function () {
        modal.style.display = "none";
    }
});

// escuchar el evento click en el botón para repintar el contenido
verComo.addEventListener("click", function () {
    verTablaPeriodica = !verTablaPeriodica;
    contenido.innerHTML = "";    
    if(verTablaPeriodica) {
        crearTabla();
        textoBtn.innerText = "Ver como tabla periódica";
        textoTitulo.innerText = "Tabla periódica de los elementos químicos";
    } else {
        crearTablaAlimentos();
        textoBtn.innerText = "Ver como tabla de alimentos";
        textoTitulo.innerText = "Tabla periódica como alimentos";
    }   
});

function crearTabla() {
    let tabla = "<table>";
    tabla += thead;
    let isFirstTd = false;
    const periodos = 10;
    for (let i = 1; i <= periodos; i++) {
        tabla += "<tr>";
        let addReferenceTd = false;
        if (i == 8) {
            tabla += `<td colspan="18" class="empty"></td>`;
        } else {
            elementos.filter(x => x.periodo === i).forEach(element => {
                if (element.tipo === undefined) {
                    tabla += `<td></td>`;
                } else {
                    let claseCss = element.tipo.toLowerCase().replace(" ", "-").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace(" ", "-");
                    if (element.id !== undefined) {
                        tabla += `<td>
                            <div class="element-box ${claseCss}">
                                <div class="atomic-number">${element.id}</div>
                                <div class="symbol"></div>
                                <div class="element-name">${element.elementos}</div>
                                <div class="atomic-mass">Elementos</div>
                            </div>
                        </td>`;
                    } else {
                        if (isFirstTd) {
                            tabla += reference;
                            isFirstTd = false;
                        }
                        if (addReferenceTd) {
                            if (element.periodo < 8) {
                                tabla += `<td class="reference">${element.periodo}</td>`;
                            } else {
                                tabla += `<td class="reference"></td>`;
                            }
                            addReferenceTd = false;
                        }
                        tabla += `<td> 
                                    <div class="element-box ${claseCss}" onclick="mostrarDetalle('${element.simbolo}');">
                                        <div class="atomic-number">${element.numeroAtomico}</div>
                                        <div class="symbol">${element.simbolo}</div>
                                        <div class="element-name">${element.elemento}</div>
                                        <div class="atomic-mass">${element.pesoAtomico} u</div>
                                    </div>
                                </td>`;
                    }
                }
            });
        }
        tabla += "</tr>";
    }
    tabla += "</table></tbody>";
    document.getElementById("contenido").innerHTML = tabla;
}

function mostrarDetalle(simbolo) {
    const elemento = elementos.filter(x => x.simbolo === simbolo)[0];
    if (elemento) {
        let claseCss = elemento.tipo.replace(" ", "-").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace(" ", "-").toLowerCase();
        let elementDetail = modal?.children[0]?.children[1];
        elementDetail.innerHTML = "";
        elementDetail.innerHTML = ` 
        <div class="detalle">            
            <div class="row">
                <div class="column">
                    <div class="element-detail ${claseCss}">
                        <div class="atomic-number-detail">${elemento.numeroAtomico}</div>
                        <div class="symbol-detail">${elemento.simbolo}</div>
                        <div class="element-name-detail">${elemento.elemento}</div>
                        <div class="atomic-mass-detail">${elemento.pesoAtomico} u</div>
                    </div>                    
                </div>
                <div class="column">
                    <div class="breveDescripcion"><div class="desc">Breve descripción:</div> ${elemento.breveDescripcion}</div>
                    <div class="historia"><div class="desc">Historia:</div> ${elemento.historia}</div>
                    <div class="usos"><div class="desc">Usos:</div> ${elemento.usos}</div>
                </div>
                <div class="column">
                    <div class="numeroAtomico"><div class="desc">Numero atómico:</div> <div>${elemento.numeroAtomico}</div></div>
                    <div class="simbolo"><div class="desc">Simbolo:</div> <div>${elemento.simbolo}</div></div>
                    <div class="elemento"><div class="desc">Elemento:</div> <div>${elemento.elemento}</div></div>
                    <div class="pesoAtomico"><div class="desc">Peso atómico:</div> <div>${elemento.pesoAtomico} u</div></div>
                    <div class="puntoDeFusion"><div class="desc">Punto de fusión:</div> <div>${elemento.puntoDeFusion} K</div></div>
                    <div class="grupo"><div class="desc">Grupo:</div> <div>${elemento.grupo}</div></div> 
                    <div class="periodo"><div class="desc">Periodo:</div> <div>${elemento.periodo}</div></div>
                    <div class="tipo"><div class="desc">Tipo:</div> <div>${elemento.tipo}</div></div>
                    <div class="valencia"><div class="desc">Valencia:</div> <div>${elemento.valencia}</div></div>
                    <div class="radioAtomico"><div class="desc">Radio atómico:</div> <div>${elemento.radioAtomico}</div></div>
                    <div class="radioIonico"><div class="desc">Radio iónico:</div> <div>${elemento.radioIonico}</div></div>
                    <div class="radioCovalente"><div class="desc">Radio covalente:</div> <div>${elemento.radioCovalente}</div></div>
                    <div class="puntoDeEbullicion"><div class="desc">Punto de ebullición:</div> <div>${elemento.puntoDeEbullicion} K</div></div>
                </div> 
                <div class="column">                    
                    <div class="faseATemperaturayPresionEstandar"><div class="desc">Fase a temperatura y presión estándar:</div> <div>${elemento.faseATemperaturayPresionEstandar}</div></div>
                    <div class="electronegatividad"><div class="desc">Electronegatividad:</div> <div>${elemento.electronegatividad}</div></div>
                    <div class="energiaDeIonizacion"><div class="desc">Energía de ionización:</div> <div>${elemento.energiaDeIonizacion}</div></div>
                    <div class="electronegatividadDePauling"><div class="desc">Electronegatividad de Pauling:</div> <div>${elemento.electronegatividadDePauling}</div></div>
                    <div class="afinidadElectronica"><div class="desc">Afinidad electrónica:</div> <div>${elemento.afinidadElectronica}</div></div>
                    <div class="estadosDeOxidacion"><div class="desc">Estados de oxidación:</div> <div>${elemento.estadosDeOxidacion}</div></div>
                    <div class="radioDeVanDerWaals"><div class="desc">Radio de Van der Waals:</div> <div>${elemento.radioDeVanDerWaals}</div></div>
                    <div class="configuracionElectronica"><div class="desc">Configuración electrónica:</div> <div>${elemento.configuracionElectronica}</div></div>
                    <div class="electronesPorNivel"><div class="desc">Electrones por nivel:</div> <div>${elemento.electronesPorNivel}</div></div>
                    <div class="estadoDeOxidación"><div class="desc">Estado de oxidación:</div> <div>${elemento.estadoDeOxidación}</div></div>
                    <div class="estructuraCristalina"><div class="desc">Estructura cristalina:</div> <div>${elemento.estructuraCristalina}</div></div>
                </div> 
            </div>
        </div>`;
        modal.style.display = "block";
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function crearTablaAlimentos() {
    let tabla = "<table>";
    tabla += thead;
    let isFirstTd = false;
    const periodos = 10;
    for (let i = 1; i <= periodos; i++) {
        tabla += "<tr>";
        let addReferenceTd = false;
        if (i == 8) {
            tabla += `<td colspan="18" class="empty"></td>`;
        } else {
            elementosComoAlimentos.filter(x => x.periodo === i).forEach(element => {
                if (element.grupoNutricional === undefined) {
                    tabla += `<td></td>`;
                } else {
                    let claseCss = element.grupoNutricional.replaceAll(" ","").toLowerCase().replace(" ", "-").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace(" ", "-");
                    if (element.id !== undefined) {
                        tabla += `<td>
                            <div class="element-box ${claseCss}">
                                <div class="atomic-number">${element.id}</div>
                                <div class="symbol"></div>
                                <div class="element-name">${element.elementos}</div>
                                <div class="atomic-mass">Elementos</div>
                            </div>
                        </td>`;
                    } else {
                        if (isFirstTd) {
                            tabla += reference;
                            isFirstTd = false;
                        }
                        if (addReferenceTd) {
                            if (element.periodo < 8) {
                                tabla += `<td class="reference">${element.periodo}</td>`;
                            } else {
                                tabla += `<td class="reference"></td>`;
                            }
                            addReferenceTd = false;
                        }
                        tabla += `<td> 
                                    <div class="element-box ${claseCss}" onclick="mostrarAlimento('${element.simbolo}');">
                                        <div class="atomic-number">${element.numeroAtomico}</div>
                                        <div class="symbol">${element.simbolo}</div>
                                        <div class="element-name">${element.nombreAlimento}</div>
                                        <div class="atomic-mass">${element.calorias} cal</div>
                                    </div>
                                </td>`;
                    }
                }
            });
        }
        tabla += "</tr>";
    }
    tabla += "</table></tbody>";
    document.getElementById("contenido").innerHTML = tabla;
}


function mostrarAlimento(simbolo) {
    const elemento = elementosComoAlimentos.filter(x => x.simbolo === simbolo)[0];
    if (elemento) {
        let claseCss = elemento.grupoNutricional.replaceAll(" ","").toLowerCase().replace(" ", "-").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace(" ", "-");
        let elementDetail = modal?.children[0]?.children[1];
        elementDetail.innerHTML = "";
        elementDetail.innerHTML = ` 
        <div class="detalle">            
            <div class="row">
                <div class="column">
                    <div class="element-detail ${claseCss}">
                        <div class="atomic-number-detail">${elemento.numeroAtomico}</div>
                        <div class="symbol-detail">${elemento.simbolo}</div>
                        <div class="element-name-detail">${elemento.nombreAlimento}</div>
                        <div class="atomic-mass-detail">${elemento.calorias} u</div>
                    </div>
                    ${elemento.descripcion !== undefined ? `<div class="breveDescripcion"><div class="desc">Breve descripción:</div> <div>${elemento.descripcion}</div></div>` : ''} 
                    <div class="historia"><div class="desc">Valor nutricional:</div> <div>${elemento.valorNutricional}</div></div> 
                    <div class="historia"><div class="desc">Beneficios:</div> <div>${elemento.beneficios}</div></div>
                    <div class="usos"><div class="desc">Riesgos:</div> <div>${elemento.riesgos}</div></div>
                </div>
                <div class="column">
                    <div class="simbolo"><div class="desc">Simbolo:</div> <div>${elemento.simbolo}</div></div>
                    <div class="elemento"><div class="desc">Elemento:</div> <div>${elemento.elemento}</div></div>
                    <div class="puntoDeFusion"><div class="desc">Grupo nutricional:</div> <div>${elemento.grupoNutricional}</div></div>                    
                    <div class="valencia"><div class="desc">Calorias:</div> <div>${elemento.calorias} cal</div></div>
                    <div class="radioAtomico"><div class="desc">Proteinas:</div> <div>${elemento.proteinas} g</div></div>
                    <div class="radioIonico"><div class="desc">Grasas:</div> <div>${elemento.grasas} g</div></div>
                    <div class="radioCovalente"><div class="desc">Carbohidratos:</div> <div>${elemento.carbohidratos} g</div></div>
                    <div class="puntoDeEbullicion"><div class="desc">Fibra:</div> <div>${elemento.fibra} g</div></div>
                    <div class="puntoDeEbullicion"><div class="desc">Vitaminas:</div> <div>${elemento.vitaminas}</div></div>
                    <div class="puntoDeEbullicion"><div class="desc">Minerales:</div> <div>${elemento.minerales} </div></div>
                </div> 
                
            </div>
        </div>`;
        modal.style.display = "block";
    }
}
