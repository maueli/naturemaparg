var suelos_wms = ["wrb", "silt", "clay", "bdod", "cec", "cfvo",
"nitrogen", "phh2o", "sand", "soc", "ocs", "ocd"]


function get_soil_url(source, type = "map"){
  var web0 = "https://maps.isric.org/mapserv?map=/map/";
  var web_wms = ".map&SERVICE=WMS&";
  var web_cap = "version=1.3.0&request=GetCapabilities";

  var web_map = web0 + source + web_wms;

  if ( type == "map"){
    return web_map;
  }
  else{
    return web_map+web_cap
  }
}
