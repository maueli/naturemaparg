// FUNCIONES
var valores_territorio =[13,17,21,25,30,40,50];
var allsolutions_ajax = [];

function random_color(verde=false){

  var letras = "0123456789ABCDEF";
  var colorlayer ="#";
  for (i =0; i<6;i++){
    colorlayer += letras[Math.floor(Math.random() * 16)]
  };
  /* PROHIBIR VERDE
  if(verde && colorlayer=="#008000"){
    colorlayer = random_color(true);
    return colorlayer;
  } */

  return colorlayer;
}

function graf_toolbar(){
  /* Que no tenga fondo la barra de Plotly*/
  $(".modebar-group").css("background-color","rgba(0,0,0,0.0)");
};

/*
var solutions = {};
for (var i=0; i<7;i++){
  for (var j=1; j<16;j++){
    solutions["sol"+valores_territorio[i]+"_"+j]="sol"+valores_territorio[i]+"_"+j
  }
}
*/

// Remueve ALL Traces
function remove_traces(id,datos){
  var long = datos.length;
  for(var i=0;i<long;i++){
    var long2 = long-1-i;
    Plotly.deleteTraces(id,long2);
  }
}

// Pedir una capa por AJAX a una pagina X
function request_capa(directorio,nom,eacheach){
  var color_out = random_color();
  $.ajax({
    type: "GET",
    //url:"http://maueli.scienceontheweb.net/"+directorio+"/"+nom+".js",
    url:"https://maueli.github.io/naturemaparg/capas/"+directorio+"/"+nom+".js",
    dataType: "script",
    cache: true,
    async:false
  }).then(function(){
    var nom2 = eval(nom);
    var geo = L.geoJSON(nom2,{style:stylegral,onEachFeature: eacheach});
    geo.addTo(mymap);
    geo.addTo(searchlayers);
    geo.setStyle({color:color_out,fillColor:color_out});
    areas.push({nombre:nom, variable:geo});
    $(".select-capa").append("<option value='"+nom+"' class='"+nom+"'>"+nom+"</option>")
  });
  return color_out
};


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                SOLUCIONES
*/

/* Chequea si está en areas y si no, lo agrega a areas */
function check_areas(nom,variab=0){
  var nomb = nom.toString();
  var capagroup3 = areas.find(function(e){
      return e.nombre === nomb;});
  if(capagroup3==undefined){
    if(variab != 0){
      areas.push({nombre:nomb, variable:variab});
    }
  }
  return capagroup3
}

/* Chequea si comparar esta apretado y si lo está, acciona */
function check_comparar_accion(){
  var comparando = $(".comparar-nat").is(":checked");
  if(comparando==false){
    soluciones.clearLayers(); // Limpia L.FeaturesGroup
    $(".select-naturemap").remove(); // Borra toda las sols del Select
    counter_sols=[]; // Borra todo el vector
  }
};

/* Si la capa NO ESTA en soluciones entonces LAS AGREGA al mapa */
function check_yaesta(variab, colorlayer){
  if(soluciones.hasLayer(variab)==false){
    variab.setStyle({color:colorlayer}); // Le doy el color compartido
    soluciones.addLayer(variab); // Agrego nueva sol a soluciones
    soluciones.addTo(mymap); // AGREGO CAPA AL MAPA!
    return true
  }
  return false
};


/* Chequea si esta en counter_sols, o sea, Si ya esta agregado el grafico */
function check_grafico(nom){
  var c = counter_grafs.indexOf(nom);

  if( c != -1){
    return true // SI esta en el grafico
  }
  return false // NO esta en el grafico
}

/* Agrega a counter_grafs el grafico ABC agregado */
function add_counter_graf(nomnom){
  var comparando = $(".comparar-nat").is(":checked");
  if (comparando){
    counter_grafs.push(nomnom);
  }
  else{
    counter_grafs = [];
    counter_grafs.push(nomnom);
  }
}





function agregar_capa_norequest(nom,variab,colorlayer,ter,sol){

  /* check_select: Chequea si la capa esta en soluciones(FeaturesGroup)
  y devuelve true si NO ESTA o false SI ESTA y eso sirve para saber si
  agregar al select-capa la solucion o no.
    */
  var check_select = check_yaesta(variab,colorlayer);

  check_areas(nom,variab)
  counter_sols.push(nom);
  if(check_select){
    $(".select-capa").append("<option value='"+nom+"' class='select-naturemap' data-sol="+sol+" data-ter="+ter+"> "+nom+" </option>");
  }

}

/* Agrego Capa Request */
function agregar_capa2(ter,sol,colorlayer){
  var variab = L.geoJSON(request_out,{onEachFeature: eachsolucion});
  var nom = "sol"+ter+"_"+sol;
  check_yaesta(variab,colorlayer);
  check_areas(nom,variab)
  counter_sols.push(nom);
  areas.push({nombre:nom,variable:variab});
  $(".select-capa").append("<option value='"+nom+"' class='select-naturemap' data-sol="+sol+" data-ter="+ter+"> "+nom+" </option>");
}

function check_remove_traces(id,data){
  var comparando = $(".comparar-nat").is(":checked");
  if(comparando==false){
    remove_traces(id,data);
  }
}


/* Agrego grafico ABC */
function add_grafico_abc(ter,sol,colorlayer,ap=false){
 /* Crea el Grafico de Especies con su respectiva info de las sols */

  var elemen = ["cos","cbm","h2o"];
  var y123 = [];

  for(var i=0;i<elemen.length;i++){
    var val1 = metas_elem["b"+ter+"_"+sol][elemen[i]];
    y123.push(val1.toFixed(3));
  };
  y123.push(bio_prom["b"+ter+"_"+sol].toFixed(3));
  y123.push(bio_prom_endemicos["b"+ter+"_"+sol].toFixed(3));

  var nomm = ter+"% "+sol

  Plotly.addTraces("barras1", {
    x:x11,
    y: y123,
    type: "histogram",
    name:nomm,
    showlegend: true,
    opacity:1,
    nbinsx:1,
    xbins:{
      size:0.1
    },
    histfunc:"sum",
    marker:{
      // line:{width:10,color:"red"}, BORDE
      color:colorlayer
    }
  });

  graf_toolbar();



};

/* Request AJAX a Servidor */
var request_out;
function request_capasol_addtodo(ter,sol){
  var color = random_color();
  $.ajax({
    type: "GET",
    //url:"http://maueli.scienceontheweb.net/naturemap/"+ter+"/"+ter+"_"+sol+".js",
    url:"https://maueli.github.io/naturemaparg/capas/naturemap/"+ter+"/"+ter+"_"+sol+".js",
    dataType: "script",
    cache: true,
    async:false
  }).then(function(){
    request_out = eval("natmap_"+ter+"_"+sol); // Agarro variable de geojson
    check_comparar_accion();
    agregar_capa2(ter,sol,color); // Agrego capa chequeando (No sirve chequear aca porque ajax da distinto id)
    check_remove_traces("barras1",datata); //Check si no esta "comparar" y remuevo todo
    add_grafico_abc(ter,sol,color); // Agrego grafico.
    //areas.push({nombre:})
/*
    var nom ="sol"+ter+"_"+sol;
    allsolutions2["sol"+ter+"_"+sol] = L.geoJSON(nom_var,{onEachFeature: eachsolucion});
    agregar_capa("sol"+ter+"_"+sol, allsolutions2["sol"+ter+"_"+sol] , color_out);
*/

  }); // TERMINA THEN
};












/*
 Agregar guion intermedio en el nombre de las especies.
 guion="_" es un input opcional, que si no se pone nada tipo add_guion(a) entonces
toma como valor por default: "_"
*/
function add_guion(word,guion="_"){
  var word2="";
  for (i of word){
    if(i!=" "){
      word2 = word2+i
    }
    else{
      word2 = word2+guion
    }
  }
  return word2
};
/*
function remove_guion(word){
  var word2="";
  for (i of word){
    if(i!="_"){
      word2 = word2+i
    }
    else{
      word2 = word2+" "
    }
  }
  return word2
};
*/


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// ESTO ME CREARIA TODAS LAS FAMILIAS Y ESPECIES
// data-id: Nombre de la capa. data-class:Para eliminarla del select y llamarla online. data-info: para poner especies de la familia. id=Para el Label.
// PARA QUE FUNCIONE TODOO CAMBIAR rtaV0

//input: especies (json)
function agregar_fam_y_spp(especies){

  //ORDENO ALFABETICAMENTE LAS FAMILIAS:
  especies.sort(function(a,b){
    if(a.Family > b.Family){
      return 1;
    }
    if(a.Family < b.Family){
      return -1;
    }
      return 0;
  });

  var clases = {"Amphibia":"anfibios","Aves":"aves","Mammalia":"mamiferos", "Reptilia":"reptiles"}
  for (i of especies){
    var clase_animal = i.Class;
    var fam = i.Family;
    var fam_min = fam.toLowerCase();
    var fam_s = fam+"s";
    var spp = i.Species;
    var nom_esp = add_guion(spp);
    var sorted=[];
    if($("#"+fam).length==0){
      var inputcapanueva ="<input class='rtaV1 btn-acordion' id='"+fam+"' data-id='"+fam+"' data-class='"+fam+"' data-info='"+fam_s+"'  type='checkbox'>";
      var labelcapanueva = "<label for='"+fam+"'> <div class='imgimg'> <div class='boton-animales-texto text-center'>"+fam+"</div> <div class='chequeado'> <img src='img/check.png' width='30px'> </div> </div> </label>";
      var capas_especies = "<div id='"+fam_s+"' style='display:none; padding-bottom:20px;'> </div>";
      var todo = inputcapanueva+labelcapanueva+capas_especies;
      sorted.push([fam,todo])
      $("#animales").find("#animales-"+clases[clase_animal]).append(
        todo
      );
      var pp = $("#"+fam).next("label").children(".imgimg");
      var inputcapanueva2 ="<input class='imgimg5 rtaV0' id='"+nom_esp+"' data-id='"+spp+"' data-class='"+nom_esp+"' type='checkbox' style='display:none'>";
      var labelcapanueva2 = "<label for='"+nom_esp+"'> <div class='imgimg4 text-center'> "+spp+" <div class='chequeado'> <img src='img/check.png' width='15px'> </div> </div> </label>";
      //$("#"+fam+"s").append("<button class='imgimg4' id='"+nom_esp+"' data-id='"+spp+"'>"+spp+"</button>");
      $("#"+fam+"s").append(
        inputcapanueva2+labelcapanueva2
      );
      $(pp).css("background-image","url('img/animales/familias/"+fam+".jpg')");
  //    areas.push({nombre: fam, variable: L.geoJSON(this[fam],{
  //      onEachFeature: eachfamilia,
  //      style:stylefamilia
  //    })});
    }
    else{
      var inputcapanueva2 ="<input class='imgimg5 rtaV0' id='"+nom_esp+"' data-id='"+spp+"' data-class='"+nom_esp+"' type='checkbox' style='display:none'>";
      var labelcapanueva2 = "<label for='"+nom_esp+"'> <div class='imgimg4 text-center'> "+spp+" <div class='chequeado'> <img src='img/check.png' width='15px'> </div> </div> </label>";
      //$("#"+fam+"s").append("<button class='imgimg4' id='"+nom_esp+"' data-id='"+spp+"'>"+spp+"</button>")
      $("#"+fam+"s").append(
        inputcapanueva2+labelcapanueva2
      );
    }

  }
  $(".imgimg4").click(function(){
    $(this).children(".chequeado").fadeToggle();
  });
  $(".boton-animales-texto").attr('unselectable', 'on').on('selectstart', false);

}



// FUNCIONES PARA AGREGAS ESPECIES DE LAS FAMILIAS

function lista_especies(fam){
  for(i of especies){
    if(i.Family==fam){
      var nom_esp2 = i.Species;
      var nom_esp = add_guion(i.Species);

      $("#"+fam+"s").append("<button class='imgimg4' id='"+nom_esp+"' data-id='"+spp+"'>"+nom_esp2+"</button>")
    }
  }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/* Agregar Ecorregiones */

for (i of ecorregiones){
  var nom = i[0];
  var nom_guion = i[1];
  var inputcapanueva ="<input class='rtaV0 rtaV2' id='"+nom_guion+"' data-id='"+nom+"' data-class='"+nom_guion+"' type='checkbox'>";
  var labelcapanueva = "<label for='"+nom_guion+"'> <div class='imgimg2'> \
    <div class='boton-animales-texto text-center'>"+nom+"</div> \
    <div class='chequeado'> <img src='img/check.png' width='30px'> </div> </div> </label>";
  var todo = inputcapanueva+labelcapanueva;
  $("#ecorregiones").append(todo);

  $("#"+nom_guion).next("label").children(".imgimg2").css("background-image","url('img/ecorregiones/"+nom_guion+".jpg')");

  var nom_peq = "Monte_de_Llanuras_y_Mesetas"== nom_guion || "Monte_de_Sierras_y_Bolsones" == nom_guion;
  if(nom_peq){
    $("#"+nom_guion).next("label").children(".imgimg2").css({'padding-top':'10px'});
    $("#"+nom_guion).next("label").children(".imgimg2").children(".boton-animales-texto").css({'font-size':'27px'});

  }
}




//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%






// Funcion para COMBINAR COLOR de: CAPA_SOLUCION con GRAFICO

function graf_layer(id_btn_chk,capaseleccionada,colorlayer,idgraf,counter_sols){
  if($("#"+id_btn_chk).is(":checked") && idgraf=="barras1"){
    var pp = "sol";
    var mm="";
    for (i=0;i<3;i++){
      /* Los primeros 3 son "sol" y quiero editar el grafico solo si es "sol" */
      mm+=capaseleccionada[i]
    }
    if(mm==pp){
      var update={marker:{color:colorlayer}};
      var indexx1 = counter_sols.indexOf(capaseleccionada);
      Plotly.restyle(idgraf, update, indexx1)
      graf_toolbar();
    };
  }
  else{
    var pp = "sol";
    var mm="";
    for (i=0;i<3;i++){
      mm+=capaseleccionada[i]
    }
    if(mm==pp){
      Plotly.restyle(idgraf, 'marker.color', colorlayer)
      graf_toolbar();
    };
  }
}


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                    // Funciones: SECTOR ESPECIES

function vec_sp_eco(ter,sol,nombrecapa2){
    /* Hace 2 listas, Nombre de Ecorregiones y los valores de la meta en esa Eco*/
    /* metas_spps es una variable definida en el archivo de metas cumplidas */
    var x123 = []; // Lista de Eco
    var y123 = []; // Lista de Valores en la Eco
    var y1233 = [];
    var z123 = [];
    var l=0;
    for ( i in metas_spps[nombrecapa2]["b0_pa"] ){
      z123.push(metas_spps[nombrecapa2]["b0_pa"][i])
      x123.push(i);
    };
    for (i in metas_spps[nombrecapa2]["b"+ter+"_"+sol]){
      x123.push(i);
      y123.push(metas_spps[nombrecapa2]["b"+ter+"_"+sol][i]);
      y1233.push(y123[l]-z123[l])
      l+=1;
    };

    return [x123,y1233,z123]
};


                  // GENERADOR DE trace para PLOTLY
function traces(xx,yy,zz,colorlayer,nombrecapa2,ter,sol,ap=true){
  if (ap){
    var trace22 = {
      x: xx,
      y:zz,
      type: "bar",
    //  width:0.5  ,
      name:"Areas Protegidas",
      showlegend: true,
      opacity:1,
      nbinsx:1,
      xbins:{
        size:0.1
      },
      histfunc:"sum",
      marker:{
        color: "green"
      }
    };
    return [trace22]
  }
  else{
    var trace11 = {
      x: xx,
      y:yy,
      type: "bar",
    //  width:0.5  ,
      name: ter+"% "+sol,
      showlegend: true,
      opacity:1,
      nbinsx:1,
      xbins:{
        size:0.1
      },
      histfunc:"sum",
      marker:{
        color: colorlayer
      }
    };
    return [trace11]
  }
}


              // GENERADOR DE layout

function layoutes(nombrecapa2){
//  var solu = ter+"% "+sol;

  var layout2 = {
    barmode: "group",//"stack",
    bargap: 0.2,
    bargroupgap: 0,
    paper_bgcolor:"rgba(0,0,0,0)",
    plot_bgcolor:"rgba(0,0,0,0)",
    width: 500,
    height: 450,
    legend:{
     font:{
        color:"white"
      },
    //  xanchor:"right",
    //  x:1,
    //  y:1,
    // yanchor: "bottom"
    },
    title:{
      text:"<i>"+nombrecapa2+"</i>",
      font:{
        color:"white"
      }
    },
    xaxis:{color:"white",
    showgrid:false,
    tick0:0,
    automargin:true
    //,gridcolor: 'red'
    },
    yaxis:{color:"rgba(255,255,255,1)",
    gridcolor: 'rgba(255,255,255,0.8)',
    showgrid:true,
    type:"linear",
    range:[0,1],
    tickmode:"linear",
  //  nticks:100,
    tick0:0,
    dtick:0.1
  }
  };
  return layout2
}

/* sol=15 lo tengo que definir porque depende de la seleccion */
function add_grafico_spp(ter,sol=15,nombrecapa2,colorlayer,idd,neww=true){
/* Agrega graficos de spp */

  var xyz = vec_sp_eco(ter,sol,nombrecapa2);
  var layout2 = layoutes(nombrecapa2);
  var config2 = {
    displaylogo:false,
    showEditInChartStudio: true,
    plotlyServerURL: "https://chart-studio.plotly.com"
  };


  var datis = traces(xyz[0],xyz[1],xyz[2],colorlayer,nombrecapa2,ter,sol,true);
  Plotly.newPlot('barras-'+idd, datis, layout2,config2);


  var cc = 0;

  for( i of $(".select-naturemap")){
    /*
    -- Itera sobre la lista de "select" y toma las sols y ter y las agrega al grafico
    -- Los dataset tienen que estar primeros siempre
    */
    var sol2 = i.dataset.sol.toString();
    var ter2 = i.dataset.ter.toString();
    cc +=1;
    var colorlayer2;
    if(cc>1){
      colorlayer2 = random_color(); // Al ser muchas barritas, no puedo sincronizar
    }
    else{
      colorlayer2 = colorlayer;
    };

    var xyz2 = vec_sp_eco(ter2,sol2,nombrecapa2);
//    var colorlayer2 = random_color(); // Viejo
    var datis2 = traces(xyz2[0],xyz2[1],xyz2[2],colorlayer2,nombrecapa2,ter2,sol2,false);
    Plotly.addTraces("barras-"+idd, datis2);

  }


  /*
  if(neww){
    var datis = traces(xyz[0],xyz[1],xyz[2],colorlayer,nombrecapa2,ter,sol);
    Plotly.newPlot('barras-'+idd, datis, layout2,config2);
  }
  else{
    var datis = traces(xyz[0],xyz[1],xyz[2],colorlayer,nombrecapa2,ter,sol,false);
    Plotly.addTraces("barras-"+idd, datis);
  }
*/
  graf_toolbar();
};






// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/*
especies.sort(function(a,b){
  if(a.Family>b.Family){
    return 1;
  }
  if(a.Family<b.Family){
    return -1;
  }
    return 0;
});

*/

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                        /// rtaV0 Seccion ///

/*
function rtaV0(clase){
  $(clase).
}
*/
function add_remove_layer(selector,capagroup,capaclase,nombrecapa,mymap,searchlayers){
  var check = selector.is(":checked");
  if(check){
    /* Si esta chequeado agrego al mapa, al buscador y a "select-capas" */
    capagroup.addTo(mymap);
    capagroup.addTo(searchlayers);
    $(".select-capa").append("<option value='"+capaclase+"' class='"+capaclase+"'>"+nombrecapa+"</option>")
  }
  else{
    /* Si NO esta chequeado saco del mapa, del buscador y del "select-capas" */
    mymap.removeLayer(capagroup);
    searchlayers.removeLayer(capagroup);
    $("."+capaclase+" ").remove();
  }
}

var no_layer_hist = true;
function add_historial(selector, capaclase, nombrecapa,mymap,areas){

// Chequeo si existe, si no existe lo creo y sino no hago nada.
  var elem_exist = $(selector+capaclase).length==0;
  if(elem_exist){
    var inputcapanueva="<input style='display:none' data-class='"+capaclase+"' data-id='"+nombrecapa+"' id='"+nombrecapa+"' type='checkbox' checked>";
    var labelcapanueva= "<label for='"+nombrecapa+"'> <div class=' imgimg3'> Capa "+nombrecapa+" <div style='display:block' class='chequeado'> <img src='img/check.png' width='20px'> </div> </div> </label>"

    $("#capas-historial").append("<div class='capashistorial-"+capaclase+"'>"+inputcapanueva+labelcapanueva+"</div>");

    $("label[for='"+nombrecapa+"']").click(function(){
      $(this).children(".imgimg3").children(".chequeado").fadeToggle();
    });





    $(".capashistorial-"+capaclase).on("click",function(){

      var capanueva2 = $(this).children("input").is(":checked");
      var nombrecapa2 = $(this).children("input").attr("data-id");
      var capaclase2 = $(this).children("input").attr("data-class");
      var capagroup2 = areas.find(function(e){
        return e.nombre === capaclase2;
      }).variable;


      if(capanueva2){
        capagroup2.addTo(mymap);
        $(".select-capa").append("<option value='"+capaclase2+"' class='"+capaclase2+"'>"+nombrecapa2+"</option>");
      }
      else{
        mymap.removeLayer(capagroup2);
        $(".select-capa").children("."+capaclase2+" ").remove();
        // $("."+capaclase+" ").remove();
      }
    });

  }


}




function loading(elem){
  while(elem==undefined){
    $(".loading").show();
  }
  $(".loading").hide();
};



$(document).ajaxStart(function(){
  $(".loading").show();
});
$(document).ajaxStop(function(){
  $(".loading").hide();
});



function loading2(){
  $(".loading").show();
  setTimeout(function(){ $(".loading").hide() }, 3000);
}


/* NO BORRAR, FUTURO TAL VEZ SE USE */
//function mymaps_events(mymap){
/*
  mymap.on("layeradd",function(){
    $(".loading").show();
    setTimeout(function(){ $(".loading").hide() }, 2000);
  });
  */

  /* mymap.on("zoom",function(){
    $(".loading").show();
    setTimeout(function(){ $(".loading").hide() }, 1000);
  });
  mymap.on("move",function(){
    $(".loading").show();
    setTimeout(function(){ $(".loading").hide() }, 1000);
  }); */
  //mymap.on("baselayerchange",loading2());
// }




function add_grafico_bio(){
  var elemen = ["cos","cbm","h2o"];
  var y123 = [];
  for(var i=0;i<elemen.length;i++){
    var val1 = metas_elem["b0_pa"][elemen[i]];
    y123.push(val1.toFixed(3));
  };

  y123.push(bio_prom["b0_pa"].toFixed(3));
  y123.push(bio_prom_endemicos["b0_pa"].toFixed(3));

  Plotly.addTraces("barras1", {
    x:x11,
    y: y123,
    type: "histogram",
    name:"Areas protegidas",
    showlegend: true,
    opacity:1,
    nbinsx:1,
    xbins:{
      size:0.1
    },
    histfunc:"sum",
    marker:{
      // line:{width:10,color:"red"}, BORDE
      color:"green"
    }
  });


  graf_toolbar();

}



/* FullScreen Toggle */

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
      }
  }



/*
function random_color_v2(){
  var color = []
  for (i=0;i<3;i++){
    var ran_num = Math.floor(Math.random()*255);
    color.push(ran_num);

  }
  var out = "rgb("+color[0]+","+color[1]+","+color[2]+")";
  return out
}
*/


/* H2O LAYER - STYLE */
function h2o_color(idid){
  var grad_azules = [ "#869EFF", "#6E8BFF", "#5B7CFF", "#3D64FF", "#3D64FF",
  "#0033FF", "#002EE4", "#0029CB", "#0023AF", "#00197D", "#001050" ];
  var num = idid-1;
  return grad_azules[num]
}

function style_h2o(feature){
    var idid = feature.properties.h2o_2km_re;
    var color = h2o_color(idid);
    var estilo = fullstyle(color)
  return estilo
}

function each_h2o(feature,layer){
  var idid = feature.properties.h2o_2km_re;
  layer.on({
    click: function(e){
      alert(idid)
      //e.target.bindPopup(idid);
    }
  })

}


function carbono_color(idid){
  var grad_rojos = ["#FFA5A5","#FF8484","#FF6B6B","#FF4343","#FF0000",
"#E10000", "#BF0000", "#980000", "#750000", "#510000"];
  var grad_marrones = ["#FFB56B","#FDA44B","#FF972F","#FF8000","#F37A00",
"#E17000", "#C76400", "#B05800", "#904800", "#7A3D00"];
  var num = idid-1;
  return grad_marrones[num]
}

function style_carbono(feature){
    var idid1 = feature.properties.cbm_2km_re;
    var idid2 = feature.properties.cos_2km_re;
    var idid;
    if (idid1 != undefined){
      idid = idid1;
    }
    else{
      idid = idid2;
    }
    var color = carbono_color(idid);
    var estilo = fullstyle(color)

  return estilo
}


$("label[for ='cbm_label']").children(".imgimg").css("background-image","url('img/abc/cbm.png')");
$("label[for ='cos_label']").children(".imgimg").css("background-image","url('img/abc/cos.png')");
$("label[for ='h2o_label']").children(".imgimg").css("background-image","url('img/abc/agua.jpg')");



/*    $( this ).dialog({
      buttons: [
        {
          text: "Agregar Metas",
          click: function(e) {
            $( this ).dialog( "close" );
            add_grafico_spp(valores_territorio[p_t5],sol_num2,nom,color_bar_layer,idid,false);
          //  $(this).triggerHandler("click");
          }
        },
        {
          text: "Sacar capa y grafico",
          click: function(e) {
            $( this ).dialog( "close" );
            var index1 = counter.indexOf(idid);
            var index2 = counter.length - 1 - index1;
            $('#carousel_barras').trigger('remove.owl.carousel', index2 );
            $('#carousel_barras').trigger('refresh.owl.carousel');
            counter.pop(index1);
          }
        },
      ]
    })
*/


/*

$(".capa-bio").click(function(){
  $(this).children(".icono").children("div").toggleClass("imgicono1");
  $(this).children(".icono").children("div").toggleClass("imgicono2");
  //$(this).children(".icono").children(".imgicono1").fadeToggle(100);
//  $(this).children(".icono").children(".imgicono2").fadeToggle();
});

*/




/* CREANDO Funcion para agregar capas FACIL */

 // $("#prueba_load").load("https://maueli.github.io/naturemap/nuevo_btn.txt")


/* ACA EMPIEZA ZONA CULTIVOS - RASTER */


var raster_layers = {};
function raster_call( file , nom, georaster ){
  $(".loading").show();
  var out
  fetch( file )
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
        parseGeoraster( arrayBuffer ).then( georaster => {
          //console.log("georaster:", georaster);
          out = new GeoRasterLayer({
              attribution: "Planet",
              georaster: georaster,
              opacity: 1,
              pixelValuesToColorFn: values => values[0] <= 0 ? null :
                      (values[0] <=  10 )					? '#f6ffff' :
                      (values[0] > 10 && values[0] <= 25) 	? '#48fef5' :
                      (values[0] > 25 && values[0] <= 50) 	? '#f6e016' :
                      (values[0] > 50 && values[0] <= 75) 	? '#ff7f00' :
                      '#f00a06',
                      //(values[0] > 75) 	? '#f00a06' :
                      //'rgba(255,255,255,0)',

              resolution: 350
          });
          out.addTo(rasters);
          raster_layers[nom] = out;
          rasters.addTo(mymap);
          areas.push({nombre:nom, variable:out});
          $(".select-capa").append("<option value='"+nom+"' class='"+nom+"' data-layer='raster'>"+nom+"</option>")
          //mymap.fitBounds(aluminio.getBounds());
          $(".loading").hide();
        });
    });
}



/* Defino URL generica y FeatureGroup para rasters */
const url_git = "https://maueli.github.io/naturemaparg/capas/cultivos";
const rasters = new L.FeatureGroup();

/* En el primer click llamo a la funcion mediante "AJAX" o fetch */
$(".capa_raster").one("click", function(){
  var nom_file = $(this).attr("data-id");
  var nom = $(this).attr("data-name");
  var file = url_git + "/" + nom + "/" + nom_file + ".tif";
  raster_call( file, nom_file , nom+"a")
});

$(".capa_raster").click( function(){
  var nom = $(this).attr("data-id");
  if( $(this).is(":checked") ){
    raster_layers[nom].addTo(mymap)
  }
  else{
    raster_layers[nom].remove(rasters)
  }
});









//
