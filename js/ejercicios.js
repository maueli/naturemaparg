
$(".ej-afirmaciones").ready(function(){

/* DEFINO Cantidad de Oraciones Verdaderas y Falsas */
  var CantV = 2;
  var CantF = 2;
  var RtaVF = "Mal... :(";

/* DEFINO Variables Respuestas y llamar a la clase del HTML*/
  RtaV = new Array(CantV).fill(" Mal ");
  RtaF = new Array(CantF).fill(" Bien ");
  checkboxV = new Array(CantV);
  checkboxF = new Array(CantF);

  var n,m;
  for (n = 0; n < CantV ; n++) {
    checkboxV[n] = $(".ejV"+n);
  };
  for (m = 0; m < CantF ; m++) {
    checkboxF[m] = $(".ejF"+m);
  }

/*HAGO la magia de que si es Verdadera que la cambie
y si es Falsa no, y viceversa*/

  $(".ej-afirmaciones").click(function(){
    for (i = 0; i < checkboxV.length; i++) {
      if (checkboxV[i].is(":checked")) {
        RtaV[i] = " Bien ";
      }
      else{RtaV[i] = " Mal "};
    };
    for (j = 0; j < checkboxF.length; j++) {
      if (checkboxF[j].is(":checked")) {
        RtaF[j] = " Mal ";
      }
      else{RtaF[j] = " Bien "};
    };


    var RtaVV = RtaV.some(function(a){
      return a==" Mal ";
    });
    var RtaFF = RtaF.some(function(a){
      return a==" Mal ";
    });

    if(RtaVV==true || RtaFF==true){
      RtaVF="Mal... :(";
    }
    else{RtaVF="Bieeen! :)"};



  });
  $('#respuestas').click(function(){
      $(".respuestas-multiplichoice").text(RtaV+RtaF);
      $(".respuestas-multiplichoice2").text(RtaVF);
    });

  });






/* VERDERO O FALSO */


$(".ej-imagenes").ready(function(){

  var CantVI = 3;
  var CantFI = 2;
  var Rta = "Mal... :(";

  RtaVI = new Array(CantVI).fill("Mal");
  RtaFI = new Array(CantFI).fill("Bien");
  checkboxVI = new Array(CantVI);
  checkboxFI = new Array(CantFI);

  var r,k;
  for (r = 0; r < CantVI ; r++) {
    checkboxVI[r] = $(".rtaV"+r);
  };
  for (k = 0; k < CantFI ; k++) {
    checkboxFI[k] = $(".rtaF"+k);
  };



  var l,p;
  $(".ej-imagenes").click(function(){
    for (l = 0; l < checkboxVI.length; l++) {
      if (checkboxVI[l].is(":checked")) {
        RtaVI[l] = "Bien";
      }
      else{RtaVI[l] = "Mal"};
    };
    for (p = 0; p < checkboxFI.length; p++) {
      if (checkboxFI[p].is(":checked")) {
        RtaFI[p] = "Mal";
      }
      else{RtaFI[p] = "Bien"};
    };

  var RtaVVI = RtaVI.some(function(a){
    return a=="Mal";
  });
  var RtaFFI = RtaFI.some(function(a){
    return a=="Mal";
  });

  if(RtaVVI==true || RtaFFI==true){
    Rta="Mal... :(";
  }
  else{Rta="Bieeen! :)"};


  });


  $('#verygood').click(function(){
      $(".verygood-rta").text(Rta);
    });
});





/* PUZZLE */


$(".puzzle").ready(function(){
  $("#numeropalabras").click(function(){
    for(pp=0;pp < 10;pp++){
      $(".puzzleinput"+pp).hide();
    };
    var cantpal = Number($(".numpal2").val());
    for(pp=0;pp < cantpal;pp++){
      $(".puzzleinput"+pp).show();
    };
  });


});


$(".ej-puzzle").ready(function(){

  var abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

  var ancho;

  $('#puzzlebuttongenerar').on("click",function(){
    ancho = $("#puzzleinputgenerar").val();
    var nm=0;
    for (n = 0; n < ancho; n++){
      $("<ul id='ul"+n+"'> </ul>").appendTo("#sopadeletras");
      for (m = 0; m < ancho; m++){
        $("<li class='puzzle-rta" + nm + "'>"+nm+"</li>").appendTo("#ul"+n );
        nm = nm + 1;
      };
    };
  });

  $('#puzzlebuttonborrar').on("click",function(){
      $("ul").remove();
      $("#puzzleinputgenerar").val("");
  });





  $('#puzzlebutton').click(function(){

    var total = ancho*ancho;
    var numpal = $("#numpal").val();
    letras = new Array(total);



    var numero;
    for (q = 0; q < total; q++) {
      numero = Math.floor(Math.random()*(27));
      letras[q] = abc[numero];
    };


    numerorr = new Array(Number(numpal));
    numeropp = new Array(Number(numpal));
    words = new Array(Number(numpal));

    for(y = 0 ; y < numpal ; y++){
      numerorr[y] = Math.floor(Math.random()*(total));
      numeropp[y] = Math.floor(Math.random()*(99));
      words[y] = $("#puzzleinput"+y).val();
    };




    var word;

    for(i=0;i<numpal;i++){
      word=words[i];
      numeror=numerorr[i];
      numerop=numeropp[i];

      if(numerop%2==0){
        while( (numeror/ancho%1).toFixed(2) > (ancho-word.length)/ancho ){
          numeror=Math.floor(Math.random()*(total));
        };
        for (c = 0; c < word.length; c++) {
          letras[numeror+c] = word[c];
        };
      }
      else{
        while(numeror/ancho >= (ancho-word.length+1)){
          numeror=Math.floor(Math.random()*(total));
        };
        for (c = 0; c < word.length; c++) {
          letras[numeror+c*ancho] = word[c];
        };
      };
    }






    for (ii = 0; ii < total; ii++){
      $(".puzzle-rta"+ii).text(letras[ii]);
    };


/* HACER IF DE BORDES !!  */

    });
});






$(".lala").ready(function(){
  $(".imgimg").click(function(){
    $(this).children().fadeToggle();
  });
  $(".imgimg2").click(function(){
    $(this).children().fadeToggle();
  });
});










      $(document).ready(function(){
        $(".ej-operaciones").on("input",".suma",function(){
          var totalsuma=0;
          var totalmultiplicacion=1;
          $(".suma").each(function(){
            var inputVal = $(this).val();
            totalsuma += parseFloat(inputVal);
            totalmultiplicacion *= parseFloat(inputVal);
          });
          $('#sumasuma').click(function(){
            $(".resultadobotonsuma").text(totalsuma);
          });
          $('#multiplicacion').click(function(){
            $(".resultadobotonmultiplicacion").text(totalmultiplicacion);
          });
        });
      });
