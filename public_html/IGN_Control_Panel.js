  /*
   
   Section: IGN Control Panel
   
   The IGN Control Panel widget contents the components following:
		- -	Linear and polygonal distance measure, a rubber for vector overlays and a center map tool
		- -	A form to add a custom vector layer to the map (in KML, GPX or GeoJSON formats) from an URL or from a file, both provided by the user 
*/

( function( $ ) {
	
  $.widget( "IGN.IGN_Control_Panel", {
    
    options: {
    },
    	//reference to the widget
    	this_Control_Panel: null,
    	disableLineal: false,
		disablePoligonal: false,
		disableBorrado: false,
		disableZoomRect: false,
		/*
    	  Private Function: _create
    	  Create a "control panel" widget instance with the default options.
    	*/
    _create: function(){
	  //reference to  widget object
    	this_Control_Panel = this,
      
	// cdPanel =   
		 this.element.html(
			  
			  '<div class="apiIgn-baselayerSelector">' +
			  '<a href="#0" id="apiIgn-toolsMenu" class="apiIgn-toolsMenu icon-list" title="Caja de Herramientas"></a>' +
			  '</div>' +
			  '<!--panel de herramientas-->' +
			  '<div class="apiIgn-cdPanel from-right">' +
			  '<div class="apiIgn-toolsPanel">' +
			  '<div class="apiIgn-toolspanelTitle">' +
			  '<a href="javascript:void(0);" title="Herramientas" class="apiIgn-Herramientas icon-tools" >' + i18n.t("Herramientas") + '</a>' +
			  '</div>' +
			  '<div class="toolsPanel">' +
			  '<div class="apiIgn-toolDistLineal apiIgn-toolsPanelBox">' +
			  '<a href="#" title="Distancia lineal" class="apiIgn-distLineal icon-ruler">' +
			  '</a>' +
			  '</div>' +
			  '<div class="apiIgn-toolDistPoligonal apiIgn-toolsPanelBox">' +
			  '<a href="#" title="Distancia poligonal" class="apiIgn-distPoligonal icon-ruler2"></a>' +
			  '</div>' +
			  '<div class="apiIgn-toolsPanelBox">' +
			  '<a href="#" title="Borrar" class="apiIgn-borrado icon-magic"></a>' +
			  '</div>' +
			  '<div class="apiIgn-toolSetCenter apiIgn-toolsPanelBox">' +
			  '<a class="apiIgn-centerMap" href="#" title="Centrar Mapa" ><img id="centrarMapaImg" class="apiIgn-centrarMapaImg" style="position:relative; margin-top:8px;" src="' + IGN_URL_REPOSITORY + '/images/btn_recenter_on.png" title="Centrar Mapa" alt="Centrar Mapa"/></a>' +
			  '</div>' +
			  '</div>' +
			  '</div>' +
			  '<div class="apiIgn-panelBlock">' +
			  '<div class="apiIgn-panelTitle">' +
			  '<a href="#CapaVectorial" title="A&ntilde;adir capa vectorial" class="apiIgn-addVectorialLayer apiIgn-panelTag  icon-plus">' + i18n.t("Anadir capa vectorial") + '</a>' +
			  '</div>' +
			  '<div class="apiIgn-contentCapaVectorial apiIgn-panel">' +
			  '</div>' +
			  '</div>' +
			  '</div>'
	  );
      
  // $( this_API_CORE.options.divIdMap).append(cdPanel);

//      var addPanel = function(panelTitle) {
//          var newPanel = "<div id='panelBlock'>"+
//      		           "<div class='panel-title'>"+
//      			       "<a href='#' title="+panelTitle+" class='panelTag  icon-plus'>"+panelTitle+"</a>"+
//      			       "</div>"+
//      			       "<div class='panel'>"+
//      				   "Inserte su contenido aquí;"+
//      			       "</div>"+
//      		           "</div>";
//      		
//      	$('.cd-panel').append(newPanel);
//      };

      
    },
     
    /*
	  Function: AddNewPanel
	  
	    Add new panel
  
		Parameters:
     			- panelTitle: panel title
     			- panelId: panel ID
     			- newCompDiv: new component div  
	 */
     AddNewPanel: function(panelTitle,panelId,newCompDiv) {
    	 
  
	    	 var id = panelId.replace(/ /g,"_");
	    	 
	         var newPanel = "<div class='apiIgn-panelBlock'>"+
	     		           "<div class='apiIgn-panelTitle'>"+
	     			       "<a href='#' title='"+i18n.t(panelTitle)+"' class='apiIgn-panelTag  icon-plus'>"+i18n.t(panelTitle)+"</a>"+
	     			       "</div>"+
	     			       "<div class='apiIgn-panel' id='"+id+"'>"+
	     			       "</div>"+
	     		           "</div>";
	     		
	     	$('.apiIgn .apiIgn-cdPanel').append(newPanel);
	     	newCompDiv.appendTo('#'+id);

     },



    
});
  
  
})( jQuery );


  
  
  
  