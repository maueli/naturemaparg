function cultivo( nom ){
  //var url_base = "https://maueli.github.io/pruebaserver/"+nom.toLowerCase();
  var cult = {
    "presente_inta":{
      //"name": "soja_presente_inta",
      "name" : nom.toLowerCase() + "_p_maxent",
      "title": nom + " Presente INTA",
  //    "url": url_base + "_p_maxent.tif"
    },
    "presente_maxent":{
      "name" : nom.toLowerCase() + "_presente_maxent",
      "title": nom + " Presente MDS",
  //    "url": url_base + "_p_maxent.tif"
    },
    "2030_maxent":{
      "name": nom.toLowerCase() + "_30_maxent",
      "title": nom + " 2030 MDS",
//      "url": url_base + "_30_maxent.tif"
    },
    "2050_maxent":{
      "name": nom.toLowerCase() + "_50_maxent",
      "title": nom + " 2050 MDS",
  //    "url": url_base + "_50_maxent.tif"
    }
  };
  return cult;
};



function add_cultivos_html(nom_cult, cult){
  var todo = "";
  for (i in cult){
    var input_raster = ` <input class='rtaV0 capa_raster' id='`+cult[i].name+`' data-id='`+cult[i].name+`'
    data-class='`+cult[i].name+`' data-name='`+ nom_cult.toLowerCase() +`' type='checkbox'> `;
    var check_raster = "<div class='chequeado'> <img src='img/check.png' width='30px'> </div>";
    var label_raster = `<label for='`+cult[i].name+`'> <div class='imgimg4'>
    <div class='sojaaa'>`+cult[i].title+`</div> `+ check_raster +` </div> </label>`;

    todo = todo + input_raster + label_raster;
  };

  /* Defino funcion que lo inserta adentro de un row y col-12 */
  function row_in(txt){
    var out = "<div class='row'> <div class='col-md-12 text-center '>" + txt + "</div> </div>";
    return out
  };
  var titulocapa = "<h3 class='titulo-cultivos'> Capas </h3>";
  var titulovideo = "<h3 class='titulo-cultivos'> TimeLine </h3>";
  var videos = `<div class="row text-center">
                  <div class="col-md-6">
                    <button class= "btn-others" id="movie"> Start </button>
                  </div>
                  <div class="col-md-6">
                    <button class= "btn-others" id="movie_out"> End </button>
                  </div>
                </div> `

  todo = row_in(titulocapa) + row_in(todo) + row_in(titulovideo) + videos ;

  $("#"+nom_cult.toLowerCase() ).children().append(
    todo
  );
};


/* Agrego todo al DOM */
const cultivos = [ "Maiz" , "Soja", "Girasol", "Vid" ];
for ( j=0; j < 4; j++ ){
  var info_cultivo = cultivo( cultivos[j] ); // Info del cultivo y sus Tiffs
  $( "#"+cultivos[j].toLowerCase() ).append("<div class='container pt-3 pb-3 '></div>");
  add_cultivos_html(cultivos[j], info_cultivo );
}


/* Defino Soja */
/*
var soja = {
  "presente_inta":{
    //"name": "soja_presente_inta",
    "name" : "13_1v2",
    "title": "Soja Presente INTA",
    "url": "www"
  },
  "presente_maxent":{
    "name" : "soja_presente_maxent",
    "title": "Soja Presente MaxEnt",
    "url": "www"
  },
  "2030_maxent":{
    "name": "soja_2030_maxent",
    "title": "Soja 2030 MaxEnt",
    "url": "www"
  },
  "2050_maxent":{
    "name": "soja_2050_maxent",
    "title": "Soja 2050 MaxEnt",
    "url": "www"
  }
};

/* Agrego container */
//$("#soja").append("<div class='container pt-3 pb-3 '></div>")

/* Defino todo lo que hay que insertar */
