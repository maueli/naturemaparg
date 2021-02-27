

class color {
  constructor(random,sumaa){
    this.random = aleatorio
    this.sumaa = suma
  };

  suma(a,b){
    return a+b;
  };

  aleatorio(){
    return Math.random()*100;
  };

};

pepe = new color;

/* Lo siguiente es para correrlo en CONSOLA, sino hay que agregar: var */
color = {
  random(){
    var letras = "0123456789ABCDEF";
    var colorlayer ="#";
    for (i =0; i<6;i++){
      colorlayer += letras[Math.floor(Math.random() * 16)]
    };
    return colorlayer;
  },
  suma(a,b){
    return a+b;
  }
}

charlar = {
  saludar(){
    return "Hola!!";
  },
  preguntar(a,b){
    return "Como estas??"
  },
  despedir(){
    return "Chauu!";
  }
}

visualizador = {
  color,
  charlar
}
