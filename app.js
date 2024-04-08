// Obtener los inputs
const inputs = document.querySelectorAll('input');

// Evento cuando un input obtiene el foco
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    // Obtener la palabra clave del input
    const keyword = input.id.toLowerCase();
    
    // Ocultar todos los resaltados
    ocultarResaltados();
    
    // Mostrar el resaltado correspondiente
    if (keyword.includes('huella')) {
      mostrarResaltado('resaltadoHuella', 100, 180, 430, 230); // Resaltar la parte inferior derecha // numero1 coordenada horizontal, numero2 coordenada vertical, numero3 y numero4 ancho y alto del selector
    } else if (keyword.includes('riostra')) {
      mostrarResaltado('resaltadoRiostra', 230, 210, 300, 220); // Resaltar la mitad de la imagen en el centro
    } else if (keyword.includes('cuneta')) {
      mostrarResaltado('resaltadoCuneta', 100, 270, 430, 300); // Resaltar la parte inferior izquierda
    } else if (keyword.includes('bordillo')) {
      mostrarResaltado('resaltadoBordillo', 450, 150, 550, 300); // Resaltar la mitad derecha de la imagen
    }
  });
});

// Función para mostrar el resaltado en una área específica
function mostrarResaltado(idResaltado, x1, y1, x2, y2) {
  // Obtener el elemento de resaltado
  const resaltado = document.getElementById(idResaltado);

  // Establecer las coordenadas y dimensiones del resaltado
  resaltado.style.left = x1 + "px";
  resaltado.style.top = y1 + "px";
  resaltado.style.width = (x2 - x1) + "px";
  resaltado.style.height = (y2 - y1) + "px";

  // Mostrar el resaltado
  resaltado.style.display = "block";
}

// Función para ocultar todos los resaltados
function ocultarResaltados() {
  document.getElementById("resaltadoHuella").style.display = "none";
  document.getElementById("resaltadoRiostra").style.display = "none";
  document.getElementById("resaltadoCuneta").style.display = "none";
  document.getElementById("resaltadoBordillo").style.display = "none";
}

////////////////////////////////////////// Capturar y Calcular /////////////////////////////////////////////////////////

document.getElementById("guardarDatos").addEventListener("click", function() {
  // Capturar los valores de cada input por separado
let anchoSubBase = parseFloat(document.getElementById("ancho_subbase").value);
let espesorSubBase = parseFloat(document.getElementById("espesor_subbase").value);
let anchoPlacaHuella = parseFloat(document.getElementById("ancho_placa_huella").value);
let anchoHuella = parseFloat(document.getElementById("ancho_huella").value);
let longitudHuella = parseFloat(document.getElementById("longitud_huella").value);
let espesorHuella = parseFloat(document.getElementById("espesor_huella").value);
let alturaVigaRiostra = parseFloat(document.getElementById("altura_viga_riostra").value);
let anchoVigaRiostra = parseFloat(document.getElementById("ancho_viga_riostra").value);
let anchoCuneta = parseFloat(document.getElementById("ancho_cuneta").value);
let alturaBordillo = parseFloat(document.getElementById("altura_bordillo").value);
let anchoBordillo = parseFloat(document.getElementById("ancho_bordillo").value);
let anchoCiclopeoCentral = parseFloat(document.getElementById("ancho_ciclopeo_central").value);
let espacioEntreRiostras = parseFloat(document.getElementById("espacio_entre_riostras").value);

/// Datos materiales ///

let materialSubBase = {
  altura: 0, //validar formula
  ancho: 0, //validar formula
  longitud: 0, //validar formula
  volumen: function() {
      // Método para calcular el volumen
      return this.altura * this.ancho * this.longitud +1.1;
  }
}

let huellaConcreto = {
  altura: 0, // Altura del objeto
  ancho: 0, // Ancho del objeto
  longitud: 0, // Longitud del objeto
  numeroDeHuellasPorModulo: 0, // Número de huellas por módulo
  volumen: function() {
      // Método para calcular el volumen
      return parseFloat(this.altura) * parseFloat(this.ancho) * parseFloat(this.longitud);
  }
};

let huellaAceroLongi = {
  diametro: 0.5, // 1/2
  cantidad: 1, //validar formula
  longitud: 1,
  numeroDeHuellasPorModulo: 2,
  cantVarillas: function() {
      // Método para calcular el volumen
      return this.cantidad * this.longitud * this.numeroDeHuellasPorModulo /6;
  }
};

let huellaAceroTrans = {
  diametro: 0.25, // 1/4
  cantidad: 0, //
  longitud: 0,
  numeroDeHuellasPorModulo: 2,
  cantVarillas: function() {
      // Método para calcular el volumen
      return this.cantidad * this.longitud * this.numeroDeHuellasPorModulo /6;
  }
}

let ciclopeoVolumenEje = {
  altura: 1, //validar formula
  ancho: 1, //validar formula
  longitud: 1,// validar formula
  volumen: function() {
      //Metodo para calcular volumen
      return this.altura * this.ancho * this.longitud * 1.05
  }
};

let ciclopeoVolumenAnchos = {
  altura: 1, //validar formula
  ancho: 1, //validar formula
  longitud: 1,// validar formula
  volumen: function() {
      //Metodo para calcular volumen
      return this.altura * this.ancho * this.longitud * 1.05
  }
};

// Ciclopeo Materiales
let ciclopeoVolumenTotalConcretoPiedra = parseFloat(ciclopeoVolumenEje.volumen()) + parseFloat(ciclopeoVolumenAnchos.volumen());
let porcentajeCiclopeoConcreto = 60;
let porcentajeCiclopeoPiedra = 40;
let volumenCiclopeoConcreto = parseFloat(ciclopeoVolumenTotalConcretoPiedra * porcentajeCiclopeoConcreto / 100);
let volumenCiclopeoPiedra = parseFloat(ciclopeoVolumenTotalConcretoPiedra * porcentajeCiclopeoPiedra / 100);


//Bordillo
let bordilloConcreto = {
  altura: 0, //valida formula
  ancho: 0, //valida formula
  longitud: 0, //valida formula
  bordillosXmodulo: 2,
  volumen: function() {
      //Metodo para calcular volumen
      return parseFloat(this.altura) * parseFloat(this.ancho) * parseFloat(this.longitud) * parseFloat(this.bordillosXmodulo) * 1.05
  }
};

let bordilloAceroLongi = {
  diametro: 0.5,
  cantidad: 2,
  longitud: 0, //valida formula
  bordillosXmodulo: 2,
  cantidadVarillas: function() {
      //Metodo para calcular varillas
      return this.cantidad * this.longitud * this.bordillosXmodulo /6
  }
};

let bordilloAceroGanchos = {
  diametro: 0.375,
  cantidad: 1, //valida formula
  longitud: 0.60,
  bordillosXmodulo: 2,
  cantidadVarillas: function() {
      //Metodo para calcular varillas
      return this.cantidad * this.longitud * this.bordillosXmodulo /6
  }
};

let formaletaConcreto = {
altura: 1, //Validar formula
ancho: 1, //Validar formula
longitud: 1, //Validar formula
bordillosXmodulo: 2,
volumen: function() {
  //Metodo para calcular voumen
  return this.altura * this.ancho * this.longitud * this.bordillosXmodulo * 1.05
}
}

let formaletaAceroLongi = {
diametro: 0.5,
cantidad: 2,
longitud: 1, //validar formula
bordillosXmodulo: 2,
cantidadVarillas: function() {
  //Mètodo para calcular varillas
  return this.cantidad * this.longitud * this.bordillosXmodulo / 6
}
}

let vigaRiostraConcreto = {
altura: 0, //Validar formula
ancho: 0, //Validar formula
longitud: 0, //Validar formula
numeroRiostras: 1,
volumen: function() {
  return parseFloat(this.altura) * parseFloat(this.ancho) * parseFloat(this.longitud) * 1.05
}
}

let vigaRiostraAceroLongi = {
diametro: 0.5,
cantidad: 4,
longitud: 6,
numeroRiostras: 1,
cantidadVarillas: function() {
  return this.cantidad * this.longitud * this.numeroRiostras / 6
}
};

let vigaRiostraAceroTrans = {
diametro: 0.25,
cantidad: 1, //Validar formula
longitud: 1,
numeroRiostras: 1,
cantVarillas:  function() {
  return this.cantidad * this.longitud * this.numeroRiostras / 6
}
};

let cunetaConcreto = {
altura: 0, //Validar formula
ancho: 0, //Validar formula
longitud: 0, //Validar formula
numeroCunetas: 2,
volumen: function() {
  //Metodo para calcular volumen
  return parseFloat(this.altura) * parseFloat(this.ancho) * parseFloat(this.longitud) * parseFloat(this.numeroCunetas) * 1.05
}
};

let cunetaAceroLongi = {
diametro: 0.5,
cantidad: 1, //Validar Formula
longitud: 3, 
numeroCunetas: 2,
cantidadVarillas: function() {
  //Metodo para calcular volumen
  return this.cantidad * this.longitud * this.numeroCunetas /6
} 
};

let cunetasAceroTrans = {
diametro: 0.25,
cantidad: 1, //Validar Formula
longitud: 1, //Validar Formula 
numeroCunetas: 2,
cantidadVarillas: function() {
  //Metodo para calcular volumen
  return this.cantidad * this.longitud * this.numeroCunetas /6
} 
}

let alambreDeAmarreMediaPul = {
pulgadas: 0.5,
cantVarillas: 1, //Validar formula / Crear formula
longitudVarillas: 6,
longitudTotal: 1, //Validar formula
kgm: 0.996,
pesoTotal: function() {
  //Metodo para calular Peso Total en KG
  return this.longitudTotal * kgm
}
};

let alambreDeAmarreCuartoPul = {
pulgadas: 0.25,
cantVarillas: 1, //Validar formula
longitudVarillas: 6,
longitudTotal: 1, //Validar formula
kgm: 0.249,
pesoTotal: function() {
  //Metodo para calular Peso Total en KG
  return this.longitudTotal * kgm
}
};

let alambreDeAmarreTresOctPul = {
pulgadas: 0.375,
cantVarillas: 1, //Validar formula
longitudVarillas: 6,
longitudTotal: 1, //Validar formula
kgm: 0.56,
pesoTotal: function() {
  //Metodo para calular Peso Total en KG
  return this.longitudTotal * kgm
}
};

// Asignar valor de las propiedades
    // Material SubBase
    materialSubBase.altura = parseFloat(espesorSubBase);
    materialSubBase.ancho = parseFloat(anchoSubBase);
    materialSubBase.longitud = parseFloat(espacioEntreRiostras);

    // Huella / Concreto
    huellaConcreto.altura = parseFloat(espesorHuella);
    huellaConcreto.ancho = parseFloat(anchoHuella);
    huellaConcreto.longitud = parseFloat(longitudHuella);

    // Huella / Acero / Longitudinal
    huellaAceroLongi.cantidad = parseFloat(anchoHuella / 0.15);
    huellaAceroLongi.longitud = parseFloat(espacioEntreRiostras);

    // Huella / Acero / Transversal
    huellaAceroTrans.cantidad = parseFloat((longitudHuella / 0.3) + 1);
    huellaAceroTrans.longitud = parseFloat(anchoHuella);

    // Ciclopeo /Volumen total
    ciclopeoVolumenEje.altura = parseFloat(espesorHuella);
    ciclopeoVolumenEje.ancho = parseFloat(anchoCiclopeoCentral);
    ciclopeoVolumenEje.longitud = parseFloat(longitudHuella);

    // Bordillo / Concreto
    bordilloConcreto.altura = parseFloat(alturaBordillo);
    bordilloConcreto.ancho = parseFloat((anchoBordillo + 0.15) / 2);
    bordilloConcreto.longitud = parseFloat(espacioEntreRiostras);

    // Bordillo / Acero Longitudinal
    bordilloAceroLongi.longitud = parseFloat(espacioEntreRiostras);

    // Bordillo / Acero Ganchos
    bordilloAceroGanchos.cantidad = parseFloat((espacioEntreRiostras - 0.15 / 0.15) + 1);

    // Viga riostra / Concreto
    vigaRiostraConcreto.altura = parseFloat(alturaVigaRiostra);
    vigaRiostraConcreto.ancho = parseFloat(anchoVigaRiostra);
    vigaRiostraConcreto.longitud = parseFloat(anchoPlacaHuella);

    // Viga Riostra / Acero / Transversal
    vigaRiostraAceroTrans.cantidad = parseFloat((anchoPlacaHuella - 0.15) + 1);

    // Cuneta / Concreto
    cunetaConcreto.altura = parseFloat(espesorHuella);
    cunetaConcreto.ancho = parseFloat(anchoCuneta);
    cunetaConcreto.longitud = parseFloat(espacioEntreRiostras);

    // Cuneta / Acero / Longitudinal
    cunetaAceroLongi.cantidad = parseFloat(((anchoCuneta - 0.15) / 0.15) + 1);

    // Cuneta / Acero / Transversal
    cunetasAceroTrans.cantidad = parseFloat(((longitudHuella - 0.15) / 0.3) + 1);
    cunetasAceroTrans.longitud = parseFloat(anchoCuneta);


    //Ancho sobre ancho ciclopeo
    let anchoSobreAnchoCiclopeo = (anchoPlacaHuella - (anchoHuella * 2 + anchoCiclopeoCentral + anchoCuneta * 2 + anchoBordillo * 2)) / 2;
    anchoSobreAnchoCiclopeo = anchoSobreAnchoCiclopeo.toFixed(2);
    document.getElementById('ancho_sobreciclopeo').value = anchoSobreAnchoCiclopeo;
    console.log(`Ancho sobre ciclopeo ${anchoSobreAnchoCiclopeo}`);
    
    // Ciclopeo Sobre Anchos
    ciclopeoVolumenAnchos.altura = parseFloat(espesorHuella);
    ciclopeoVolumenAnchos.ancho = parseFloat(anchoSobreAnchoCiclopeo * 2);
    ciclopeoVolumenAnchos.longitud = parseFloat(longitudHuella);


let alambreKg = alambreDeAmarreMediaPul.cantVarillas + alambreDeAmarreCuartoPul.cantVarillas + alambreDeAmarreTresOctPul.cantVarillas


let materialesMetroCubiConcreto = {
resistenciapsi: 3000,
cemento: 420, //KG
arena: 0.67, //m3
grava: 0.67, //m3
agua: 220, //Litros
volumenConcretoXModulo: function() {
  let huellaVol = huellaConcreto.volumen();
  let vigaVol = vigaRiostraConcreto.volumen();
  let cunetaVol = cunetaConcreto.volumen();
  let bordilloVol = bordilloConcreto.volumen();

  console.log("Huella volumen:", huellaVol);
  console.log("Viga volumen:", vigaVol);
  console.log("Cuneta volumen:", cunetaVol);
  console.log("Bordillo volumen:", bordilloVol);

  return parseFloat(huellaVol) + parseFloat(vigaVol) + parseFloat(volumenCiclopeoConcreto) + parseFloat(cunetaVol) + parseFloat(bordilloVol);
}

};

//Calculos adicionales materiales x M3 de concreto
let calculosFinales = {
cemento: materialesMetroCubiConcreto.cemento * materialesMetroCubiConcreto.volumenConcretoXModulo(),
grava: materialesMetroCubiConcreto.grava * materialesMetroCubiConcreto.volumenConcretoXModulo(),
agua: materialesMetroCubiConcreto.agua * materialesMetroCubiConcreto.volumenConcretoXModulo(),
arena: materialesMetroCubiConcreto.arena * materialesMetroCubiConcreto.volumenConcretoXModulo(),
}

console.log(`Cemento calculos finales = ${calculosFinales.cemento}`)

//Cemento UG x 50 KG
let cementoUg = calculosFinales.cemento / 50
console.log(`Cemento ug es ${cementoUg} dividido 50`)
    
    console.log(
      "Ancho SubBase: " + anchoSubBase + "\n" +
      "Espesor SubBase: " + espesorSubBase + "\n" +
      "Ancho Placa Huella: " + anchoPlacaHuella + "\n" +
      "Ancho Huella: " + anchoHuella + "\n" +
      "Longitud Huella: " + longitudHuella + "\n" +
      "Espesor Huella: " + espesorHuella + "\n" +
      "Altura Viga Riostra: " + alturaVigaRiostra + "\n" +
      "Ancho Viga Riostra: " + anchoVigaRiostra + "\n" +
      "Ancho Cuneta: " + anchoCuneta + "\n" +
      "Altura Bordillo: " + alturaBordillo + "\n" +
      "Ancho Bordillo: " + anchoBordillo + "\n" +
      "Ancho Ciclopeo Central: " + anchoCiclopeoCentral + "\n" +
      "Espacio Entre Riostras: " + espacioEntreRiostras
    );

    //Operandos
    let resultadoVolumen = materialSubBase.volumen();
    
    // Renderizas el resultado en el elemento HTML
    document.getElementById("cantidad_material_subbase").textContent = resultadoVolumen;

    let resultadoConcreto =  materialesMetroCubiConcreto.volumenConcretoXModulo();
    document.getElementById("cantidad_concreto").textContent = resultadoConcreto;

    let resultadoCemento = cementoUg
    document.getElementById("cantidad_cemento").textContent = resultadoCemento;

    let resultadoArena = calculosFinales.arena
    document.getElementById("cantidad_arena").textContent = resultadoArena;

    let resultadoGrava = calculosFinales.grava
    document.getElementById("cantidad_grava").textContent = resultadoGrava;

    let resultadoAgua = calculosFinales.agua
    document.getElementById("cantidad_agua").textContent = resultadoAgua;

    let resultadoCiclopeoPiedra = volumenCiclopeoPiedra
    document.getElementById("cantidad_piedra_ciclopeo").textContent = resultadoCiclopeoPiedra;

});


