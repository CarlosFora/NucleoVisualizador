  
 /*
   
   Section: IGN Service Layers

   
   Advanced level configuration includes default level configuration and allows the users add more functionalities programmatically.
	-	Add a new WMS, Web Map Service, as a layer from an URL provided by the user
	-	Add a new WMTS, Web Map Tile Service, as a tiled web map from an URL provided by the user

   
*/  
(function ($){
$.widget( "IGN.IGN_Service_Layers", {
    
    	//reference to the widget
    	this_Service_Layers:null,
    	_wmsServices: [],
    	_wmtsServices: [],
    	_errorImage: false,
    	_errorImages: [],
    	options:{
    		map: null,
    	},
    	
    	/*
    	  Private Function: _create

    	  Create a "Management Layers" widget instance with the default options.
    	  
    	*/
    _create: function(){
	  //reference to  widget object
    	this_Service_Layers = this,
      
	  //search box
	  this.element.html(
        '<div class="apiIgn-gestorLayer">' +
        '<div class="apiIgn-name-layer">' +
        '<label for="apiIgn-nameLayer">' + i18n.t("URL del servicio WMS") + '&nbsp;</label>' +
        '</br>' +
        '<input id="apiIgn-nameLayer" class="apiIgn-nameLayer" type="text" placeholder="' + i18n.t("Introduzca la URL del servicio WMS") + '"/>' +
        '</br></br>' +
        '<label for="apiIgn-serviceType">' + i18n.t("Seleccione tipo de servicio") + '&nbsp;</label>' +
        '</br>' +
        '<select id="apiIgn-serviceType" class="apiIgn-serviceType" name="serviceType">' +
          '<option value="WMS" selected>WMS</option>'+
          '<option value="WMTS" >WMTS</option>'+
        '</select>' +
        '</br></br>' +
        '<input class="apiIgn-addLayer" type="button" value="' + i18n.t("Anadir") + '"></input>' +
        '</br></br>' +
        '</div>' +
        '<div class="apiIgn-loadedMap" style="display:none;color:red;font-size:13px;">' +
        '</div>' +
        '</div>'
        );
    	
    },
    
  });

})( jQuery );