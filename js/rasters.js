function cultivo( nom ){
  //var url_base = "https://maueli.github.io/pruebaserver/"+nom.toLowerCase();
  var cult = {
/*    "presente_inta":{
      "name" : nom.toLowerCase() + "_p_inta",
      "title": nom + " Presente INTA",
},*/
    "presente_maxent":{
      "name" : nom.toLowerCase() + "_p_maxent",
      "title": nom + " Presente MDS (CMIP6)", //v2
    },
    "2030_maxent":{
      "name": nom.toLowerCase() + "_30_maxent",
      "title": nom + " 2030 MDS (GCMs)", //v1
    },
    "2050_maxent_v2":{
      "name": nom.toLowerCase() + "_50_maxent_v2",
      "title": nom + " 2050 MDS (CMIP6)", //v2 LINDA (rios)
    },
    "2050_maxent":{
      "name": nom.toLowerCase() + "_50_maxent",
      "title": nom + " 2050 MDS (GCMs)", //v1
    }
  };
  return cult;
};


/*
  data-id : Nombre del archivo y sirve para agregar(addTo) y eliminar(remove) de
  rasters = L.FeatureGroup
  data-name: nombre del cultivo y de la carpeta github
  data-class: Mismo que toda la APP.
  "capa raster" para llamar a los clicks genericamente
 */
function add_cultivos_html(nom_cult, cult){
  var todo = "";
  for (i in cult){
    var input_raster = ` <input class='rtaV0 capa_raster' id='`+cult[i].name+`' data-id='`+cult[i].name+`'
    data-class='`+cult[i].name+`' data-name='`+ nom_cult.toLowerCase() +`' type='checkbox'> `;
    var check_raster = "<div class='chequeado'> <img src='img/check.png' width='15px'> </div>";
    var label_raster = `<label for='`+cult[i].name+`'> <div class='imgimg4'>
    <div>`+cult[i].title+`</div> `+ check_raster +` </div> </label>`;

    todo = todo + input_raster + label_raster;
  };

  /* Defino funcion que lo inserta adentro de un row y col-12 */
  function row_in(txt){
    var out = "<div class='row'> <div class='col-md-12 text-center '>" + txt + "</div> </div>";
    return out
  };
  var titulocapa = "<h3 class='titulo-cultivos'> Capas </h3>";
  var titulovideo = "<h3 class='titulo-cultivos'> TimeLapse </h3>";
  var videos = `<div class="row text-center">
                  <div class="col-md-6">
                    <button class= "btn-others movie" data-id='`+nom_cult.toLowerCase()+`'> Start </button>
                  </div>
                  <div class="col-md-6">
                    <button class= "btn-others movie_out"> End </button>
                  </div>
                </div> `

  todo = row_in(titulocapa) + row_in(todo) + row_in(titulovideo) + videos ;

  $("#"+nom_cult.toLowerCase() ).children().append(
    todo
  );
};


/* Agrego todo al DOM */
const cultivos = [ "Maiz" , "Soja-Trigo", "Girasol", "Vid" ];
for ( j=0; j < 4; j++ ){
  var info_cultivo = cultivo( cultivos[j] ); // Info del cultivo y sus Tiffs
  $( "#"+cultivos[j].toLowerCase() ).append("<div class='container pt-3 pb-3 '></div>");
  add_cultivos_html(cultivos[j], info_cultivo );
}


/* DEFINO TODO EL SECTOR VIDEO */


function raster_call_video( file , nom, georaster , rasters_layers, end="false" ){
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
          rasters_layers.push(out);
          //raster_layers[nom] = out;
          //console.log("cargue una")
          if(end){
            //console.log("llegue al final")
            rasters_video_group.addTo(mymap);
            //console.log("FeatureGroup cargado en el mapa")
            $(".loading").hide();
            movie_active(rasters_layers);
          }

        });
    });
}

var rasters_video_group = new L.FeatureGroup();

function add_movie(e){
  e.addTo(rasters_video_group)
}
function rmv_movie(e){
  e.remove(rasters_video_group);
}

var rasters_video_layers = []; // Arr para poner capas en video

function movie_active( arr ){
  for (i=0;i<arr.length;i++){
    //console.log(arr[i])
    setTimeout(add_movie, 100+i*3000 , arr[i] )
    setTimeout(rmv_movie, 3000+i*3000 , arr[i] )
  }
  rasters_video_layers = []; // Reseteo Arr luego de visualizarlo
}






$(document).ready(function(){
  $(".movie").click( function(){ // 1 - CLICK VIDEO
    $(".loading").show(); // Cargando....
    var nom_cult = $(this).attr("data-id"); // Info de qué cultivo es
    var info_cult = cultivo(nom_cult); // Info del cultivo en particular

  //  delete info_cult["presente_inta"];
    delete info_cult["2050_maxent"];
    var end = false; //

    for (i in info_cult){ // Itero en toda la info del cultivo en particular
      var file = url_git + "/" + nom_cult + "/" + info_cult[i].name + ".tif";
    //  console.log(i);
      if( i == "2050_maxent_v2" ){
        end = true;
      }
    //  console.log(end);
      raster_call_video( file ,nom_cult, nom_cult+"a", rasters_video_layers, end)
    }

  });
});
