  /*
   
   Section: IGN Vector Layer
   
   This component allows to programmatically create a html structure to add vectorial layers to the map.
   This widget is added to the Viewer API basic functionalities into the Tool Box.  
   
   The IGN_Vector_Layer widget is used to load a vector layer based on OpenLayers 3.
   
*/
 (function ($){
$.widget( "IGN.IGN_Vector_Layer", {

    	//reference to the widget
    	this_vector:null,
    	vectorLayer:[],
    	
    	
    	/*
    	  Private Function: _create

    	  Create a "Vector Layer" widget instance with the default options.
    	  
    	*/
    _create: function(){
	  //reference to  widget object
    	this_vector = this,
      	
	  //search box
	  this.element.html(
        '<div class="apiIgn-vectorLayer">' +
        '<div class="apiIgn-selectTypeUpload">' +
        '<label for="apiIgn-uploadType">' + i18n.t("Seleccionar tipo de carga del fichero") + ' &nbsp;</label>' +
        '</br>' +
        '<select id="apiIgn-uploadType" class="apiIgn-uploadType" name="vectorType">' +
          '<option value="URL">' + i18n.t("Seleccionar URL") + '</option>'+
          '<option value="Local" selected>' + i18n.t("Seleccionar fichero local") + '</option>'+
        '</select>' +
        '</br></br>' +
        '</div>'+
        '<div class="apiIgn-UrlUpload" style="display:none">' +
        '<label for="apiIgn-vectorIGN">' + i18n.t("URL de la capa vectorial") + '&nbsp;</label>' +
        '</br>' +
        '<input id="apiIgn-vectorIGN" class="apiIgn-vectorIGN" type="text" placeholder="' + i18n.t("Introduzca la URL del vector") + '"/>' +
        '</br></br>' +
        '<label for="apiIgn-vectorType">' + i18n.t("Seleccione Formato") + '&nbsp;</label>' +
        '</br>' +
        '<select id="apiIgn-vectorType" class="apiIgn-vectorType" name="vectorType">' +
          '<option value="KML" selected>KML</option>'+
          '<option value="GPX" >GPX</option>'+
          '<option value="GeoJSON" >GeoJSON</option>'+
        '</select>' +
        '</br></br>' +
        '<input class="apiIgn-send" type="button" value="' + i18n.t("Aceptar") + '"></input>' +
        '</br></br>' +
        '</div>' +
        
		        '<form class="apiIgn-uploadForm" action="'+ IGN_URL_REPOSITORY + '/uploadFile.do" method="post" enctype="multipart/form-data">' +
		        '<div class="apiIgn-LocalUpload" style="display:block">' +
				        '<div class="apiIgn-fileUpload">' +
				        '<label for="apiIgn-uploadFile">' + i18n.t("Fichero local de la capa vectorial") + ' &nbsp;</label>' +
				        '<input id="apiIgn-uploadFile" class="apiIgn-uploadFile" placeholder="'+ i18n.t("Fichero vectorial local") + '" disabled="disabled"/>' +
				    	'<input class="apiIgn-uploadBtn upload" type="file" name="uploadBtn" title="'+ i18n.t("Fichero vectorial local") + '"/>' +
				    	'</br></br>' +
				    	'</div>' +
				    	'<div class="apiIgn-fileUpload">' +
				    	'<label for="apiIgn-vectorTypeLocal">' + i18n.t("Seleccione Formato") + '&nbsp;</label>' +
				        '</br>' +
				        '<select id="apiIgn-vectorTypeLocal" class="apiIgn-vectorTypeLocal" name="vectorType">' +
				          '<option value="KML" selected>KML</option>'+
				          '<option value="GPX" >GPX</option>'+
				          '<option value="GeoJSON" >GeoJSON</option>'+
				        '</select>' +
				        '</div>' +
				        '</br></br>' +
				        '<input class="apiIgn-sendLocal" type="button" value="' + i18n.t("Aceptar") + '"></input>' +
				        '</br></br>' +
				   '</div>' + 
				  '</form>' +
			      '<div class="apiIgn-errorLog" style="display:block;color:red;">' +
			      '</div>' +
        '</div>' 
        );
    	
    }, //end create
    
					
  });//end js

})( jQuery );
  