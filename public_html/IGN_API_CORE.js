 
/*
   
   Section: IGN API
   
   The Viewer API aims to be a component which allows to programmatically create Viewers on a simple and customizable manner, so that it is reusable not only for new Viewers but also to update existing ones, providing technological standardization and significantly reducing redundant efforts.
   
   Group: Features
   
   	The API component may be programmatically invoked with a simple JavaScript call involving only two code lines to get a preconfigured viewer with default options.  
	In order to do that, a constructor function is provided which links an HTML DIV element of choice to the viewer, so that the developer chooses exactly where he wants the Viewer on his page and which size (width and height). The internal map object is also returned for detailed customization, if it is required.
	Whenever that function is called, the following features are present in a preconfigured viewer (by default):
	-	Multilingual (i18n) behavior:
		 - -	User browser language is automatically used. If the selected language is not available, English is used by default
		 - -	Currently English and Spanish are available
		 - -	All text strings are stored in separate text files. Adding another language is quick and easy, only another copy with the translated strings and language filename is required.
		
	-	An option to switch among three different backgrounds
		- -	Map: Usually a background based on vector base cartography: http://www.ign.es/wmts/ign-base
		- -	Image: usually a pure raster background with satellite imagery or orthoimagery: http://www.ign.es/wmts/pnoa-ma
		- -	Hybrid:a mix of both, usually with the Map vector as background and imagery on top
	-	A dynamic and predictive search widget enabling both place name gazetteer searches and street gazetteer ones when entering any term
	-	Basic navigation tools: pan, zoom in, zoom out, mouse wheel zoom, zoom box, zoom to default extent
	-	Basic navigation info: scale and mouse coordinates
	-	A toolbox implementing an accordion interface and containing additional components, by default, the following:
		- -	Additional toolbar containing linear and polygonal distance measure, a rubber for vector overlays and a center map tool
		- -	A form to add a custom vector layer to the map (in KML, GPX or GeoJSON formats) from an URL or from a file, both provided by the user
	
	The following features are also provided but are not present by default, rather, they should be called to be used:
	-	A form to add a new WMS or WMTS service as a layer or tiled map from an URL provided by the user
	-	A full table-of-contents (TOC): to manage both vector and service layers, with options to activate/deactivate them, remove them, change layer visualization order and choose which one should be used to get contextual info.
	-	Getting contextual info from the selected layer by clicking on a feature (calling GetFeatureInfo operation for WMS layers and showing feature details for vector ones).

	The map projection is "EPSG:4258". 
   
   Group: Usage
   
   The IGN_API_CORE widget is used to load a map based on OpenLayers 3. 
   
   This widget is designed to offer two levels of configuration: default and advanced.
   
   Default level includes next components: 
	   	- Zoom
	   	- Zoom to extent 
	   	- Zoom box
	   	- Coordinates
	   	- Scale
	   	- Place name or address search 
	   	- Switch among: Base map, Image map or Hybrid map
	   	- Tool Box (sometimes referenced as Menu Panel), where other components are included: 
	   		- - Tools: measure linear distance, measure area, clear vectorial and measure selection, centre on map.
	   		- - Add vector layer from URL or local file. The allowed formats are: KML, GPX or GeoJSON.
	   	
   This API allows the next default options:
     - divIdMap: "div" element identifier where the widget will be loaded.
	 - SRS: reference system for the map (default: 4258)
	 - defaultZoom: check to load or unload zoom control. Possible values are true or false.
	 - defaultExtension: check to load or unload to fit the full extent control. Possible values are true or false.
	 - defaultZoomBox: check to load or unload to zoom rectangular box in the map. Possible values are true or false.
	 - defaultSearching: check to load or unload the IGN_search widget as a control. Possible values are true or false.
	 - defaultTools: check to load or unload the display tools control panel. Possible values are true or false. The default tools loaded are:
	  	- - Tools: lineal and polygonal measurements.
	  	- - Add vector layer: to load vectorial layers.
	 
	 
	Default level API configuration needs:
	- To include in the HTML the IGN_basic.js JavaScript file.
	- To define a HTML DIV for the map whose identifier matches with the identifier added in the invocation to the constructor widget method IGN_API_CORE.
	- To include the invocation to the API widget. 

	Two performed events have been created to define the callback function for asyncronous operations:
	- completeVectorial: Only for vectors added with AddNewVector and AddNewVectorCluster functions. This event is triggered when the vectorial layers management is finished. See AddNewVector and AddNewVectorCluster function.
	- completeSearch: Only for place names or address searchs with SearchFeatures function. This event is triggered when the resultant geojson related to the selected candidate is got. See Search SearchFeatures function. 
	
	To get started, an example is shown describing how to use this API widget in an HTML document, please pay attention to the comments included in the example:
	(start code)
		<!doctype html>
		<html>
		  <head>
		  	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"> 
		  	<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge">-->
		
		    <title>API Visualizador</title>
		  </head>
		  <body>
		  
		  <!-- To load necessary JavaScript libraries -->
		  <script type="text/javascript" src="http://componentes.ign.es/PruebasNucleoVisualizador/IGN_basic.js"></script> 
		  
		  <!-- To define HTML Div map -->
		  <div id="map" class="map" style="height:700px"></div>
		     
		    <script type="text/javascript">
		    
		    //Invocation to the IGN_API_CORE
		    $( document ).ready( function () {
		    
		    	// divIdMap must match with the HMTL Div map identifier  
		    	// To create the map, all default control are activated.
		        
				var apiMap = $('#map').IGN_API_CORE({
					divIdMap: 'map'
		    	});
				       	
		       	//Method to get map object reference
       			var objMap = apiMap.IGN_API_CORE("GetMap");
		       	               	
			});
		      
		    </script>
		     
		  </body>
		</html>
	(end)
	
	The next example shows the use of some functions offered to the users enable, disable and get references to default controls:  
	
	(start code)
		<!doctype html>
		<html>
		  <head>
		  	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"> 
		  	<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge">-->
		
		    <title>API Visualizador</title>
		  </head>
		  <body>
		  
		  <!-- To load necessary JavaScript libraries -->
		  <script type="text/javascript" src="http://componentes.ign.es/PruebasNucleoVisualizador/IGN_basic.js"></script> 
		  
		  <!-- To define HTML Div map -->
		  <div id="map" class="map" style="height:700px"></div>
		     
		    <script type="text/javascript">
		    
		    //Invocation to the IGN_API_CORE
		    $( document ).ready( function () {
		    
		    	//divIdMap must match with the HMTL Div map identifier  
		    	// To create the map, all default control are activated.
				// To deactivate default controls:
				//	var apiMap = $('#map').IGN_API_CORE({divIdMap: 'map', 
		        //	defaultZoom: false,
		        //	defaultExtension: false,
		    	//	defaultZoomBox: false,
		    	//	defaultSearching: false,
		    	//	defaultTools:false});
		        
				var apiMap = $('#map').IGN_API_CORE({
					//completeVectorial:function(event,result){
					//if (result.input.length>0) 
						//alert(result.result + " "  + result.input[0] + " "  + result.input[1] + " "  + result.input[2]);
					//else
						//alert(result.result);},
					divIdMap: 'map', 
		        	defaultZoom: true,
		        	defaultExtension: true,
		    		defaultZoomBox: true,
		    		defaultSearching: true,
		    		defaultTools: true
		    	});
				
						
				//Methods to enable and to disable map default control and get references to these controls
				var zoomControl = apiMap.IGN_API_CORE("GetZoomControl");
		       	
		       	apiMap.IGN_API_CORE("RemoveZoomControl");
		       	
		       	apiMap.IGN_API_CORE("AddZoomControl");
		       	
				var initExtControl = apiMap.IGN_API_CORE("GetInitExtensionControl");
		       	
		       	apiMap.IGN_API_CORE("RemoveInitExtensionControl");
		       	
		       	apiMap.IGN_API_CORE("AddInitExtensionControl");
		       
				var zoomBoxControl = apiMap.IGN_API_CORE("GetZoomBoxControl");
		       	
		       	apiMap.IGN_API_CORE("RemoveZoomBoxControl");
		       	
		       	apiMap.IGN_API_CORE("AddZoomBoxControl");
		       	
		       	var buscControl = apiMap.IGN_API_CORE("GetSearchControl");
			    
		       	$(window).load(function() {
			       	var buscWidget = apiMap.IGN_API_CORE("GetSearchWidget");
		      	});
		
		       	apiMap.IGN_API_CORE("RemoveSearchControl");
		       	
		       	apiMap.IGN_API_CORE("AddSearchControl");
		       	
				var displayControl = apiMap.IGN_API_CORE("GetDisplayMenuPanel");
		       	
		       	apiMap.IGN_API_CORE("RemoverDisplayMenuPanel");
		       	
		       	apiMap.IGN_API_CORE("AddDisplayMenuPanel");
		       	
		       	//Method to get map object reference
       			var objMap = apiMap.IGN_API_CORE("GetMap");
		       	
		       	// Add programmatically a new vectorial layer, the result is returned when the event "completeVectorial" is launched, 
		       	// the management for the callback function is defined in the IGN_API_CORE widget creation  
				apiMap.IGN_API_CORE("AddNewVector","EPSG:4326","http://componentes.ign.es/PruebasNucleoVisualizador/vectorial_examples/proximos.kml","KML");
				// Add programmatically a new vectorial layer with clustering the vectors, the result is returned when the event "completeVectorial" is launched, 
		       	// the management for the callback function is defined in the IGN_API_CORE widget creation  
				apiMap.IGN_API_CORE("AddNewVectorCluster","EPSG:4326","http://www.ign.es/resources/concurso/delegacionesIGN.kml","KML","40",true);
				                     	
			});
		      
		    </script>
		     
		  </body>
		</html>
	(end)
	
	
 	Advanced level configuration includes default level configuration and allows the users add more functionalities programmatically.
	-	Add a new WMS, Web Map Service, as a layer from an URL provided by the user
	-	Add a new WMTS, Web Map Tile Service, as a tiled web map from an URL provided by the user
	-	Maps table-of-contents (TOC): to manage both vector and service layers, with options to activate/deactivate them, remove them, change layer visualization order and choose which one should be used to get contextual info.

	The functionalities are added to the tool box as new components. The way to add this new components is:
		- To include in the HTML the IGN_middle.js JavaScript file.
		- To define a HTML DIV for the map whose identifier matches with the identifier added in the invocation to the constructor widget method IGN_API_CORE.
		- To define the selector pointing to the HTML DIV element that links the new component.
		- To invoke the AddNewComponent function.
		- To invoke the new constructor widget method, corresponding to the new functionalities.

	The next example shows the way to add these components:
	
	(start code)
		<!doctype html>
		<html>
	  	<head>
		  	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		  	<!-- <meta charset="iso-8859-1">-->
		  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
		  	
		  	
		    <title>IGN API</title>
	    
	     
	  	</head>
	  	<body>
   			
   			<!-- To load necessary JavaScript libraries -->
		   	<script type="text/javascript" src="http://componentes.ign.es/PruebasNucleoVisualizador/IGN_middle.js"></script>
		    
		    <!-- To define HTML Div map -->
		    <div id="map" class="map" style="height:700px"></div>
		    
		    <script type="text/javascript">
		    
		    $( document ).ready( function () {
				var apiMap = $('#map').IGN_API_CORE({
						divIdMap: 'map', 
			        	defaultZoom: true,
			        	defaultExtension: true,
			    		defaultZoomBox: true,
			    		defaultSearching: true,
			    		defaultTools: true
			    	});
			    
			    //Method to get map object reference
		       	var objMap = apiMap.IGN_API_CORE("GetMap");
		       	//Add new components to the tool box
		       	var newControlAddLayers = $('<div id="addNewLayers"></div>');
		       	// Method "AddNewComponent" to add the new component with title "Introducir Mapas" 
		       	apiMap.IGN_API_CORE("AddNewComponent",newControlAddLayers,"Introducir Mapas","Introducir_Mapas");
		       	
		        //Add new components to the tool box
		       	var newControlMapLayers = $('<div id="newMapLayers"></div>');
		       	// Method "AddNewComponent" to add the new component with title "Mapas" 
		       	apiMap.IGN_API_CORE("AddNewComponent",newControlMapLayers,"Mapas","Mapas");
		       	
		       	//Launch IGN_Map_Layers widget invocation
		       	var managMapLay = newControlMapLayers.IGN_Map_Layers({map: objMap});
		      	//Launch IGN_Service_Layers widget invocation
		       	var managLay = newControlAddLayers.IGN_Service_Layers({map: objMap});
		       	});
      
		    </script>
		     
		  </body>
		</html>
	(end)
	
*/
//	Included 4258, these are not defined in OL3
proj4.defs('EPSG:4258', '+proj=longlat +ellps=GRS80 +no_defs');
proj4.defs('urn:ogc:def:crs:EPSG::4258', proj4.defs('EPSG:4258'));
ol.proj.get('EPSG:4258').setExtent([-180, -90, 180, 90]);


( function( $ ) {
	
$.widget( "IGN.IGN_API_CORE", {
	this_API_CORE:null,
	map:null,
	
	searchLayer:[],
	components: [],
	_controls: [],
	vectorLayer: [],
	mapLayerId:null,
	
	//styles
	styleFeature: null,
	styleMeasure: null,

	_searching: null,
	_clearFlag: false,


	//type of map activation
	_activateMap: true,
	_activateImage: false,
	//_activateHybrid: false,
		
	//measures interactions
	_vectorMeasures: null,
	_drawElem: null,
	
	//zoombox interaction
	_boundingBox: null,
	
	//info
	_clickMapFromInfo:null,
	_errorImage:false,
	
	//controls activation/deactivation  control (exclusive controls)
	isCenter: false,
	isZoomBox: false,
	isInfo:true,
	isPolygonalMeasure:false,
	isLinealMeasure:false,
	isBorrado:false,

	//popups
	INFO_TYPE:'info-popup',
    MEASURE_TYPE:'info-measure',
    
    //widgets
	_wVectorLayer:null,
	_wControlPanel:null,
	_clearFlag: false,
	
	//defaultStyle for vector layers
	//for default style if not exist
	 defaultStyle : {
					  'Point': [new ol.style.Style({
					    image: new ol.style.Circle({
					      fill: new ol.style.Fill({
					        color: 'rgba(81, 130, 255,0.4)'
					      }),
					      radius: 5,
					      stroke: new ol.style.Stroke({
					        color:  'rgb(81, 130, 255)',
					        width: 3
					      })
					    })
					  })],
					  'MultiPoint':  [new ol.style.Style({
						    image: new ol.style.Circle({
							      fill: new ol.style.Fill({
							        color: 'rgba(81, 130, 255,0.4)'
							      }),
							      radius: 5,
							      stroke: new ol.style.Stroke({
							        color: 'rgb(81, 130, 255)',
							        width: 3
							      })
							    })
							  })],
					  'LineString': [new ol.style.Style({
					    stroke: new ol.style.Stroke({
					      color:'rgb(81, 130, 255)',
					      width: 3
					    })
					  })],
					  'MultiLineString': [new ol.style.Style({
					    stroke: new ol.style.Stroke({
					      color:'rgb(81, 130, 255)',
					      width: 3
					    })
					  })],
					  'MultiPolygon': [new ol.style.Style({
						    stroke: new ol.style.Stroke({
						      color:'rgb(81, 130, 255)',
						      width: 3
						    }),
						    fill: new ol.style.Fill({
						      color:  'rgba(81, 130, 255,0.4)'
						    })
						  })],
						  'Polygon': [new ol.style.Style({
						    stroke: new ol.style.Stroke({
						      color:'rgb(81, 130, 255)',
						      lineDash: [10,10],
						      width: 3
						    }),
						    fill: new ol.style.Fill({
						      color: 'rgba(81, 130, 255,0.4)'
						    })
						  })],				  
},
	
	options: {
		divIdMap:'apiIgn-map',
		SRS:'EPSG:4258',
		defaultZoom: true,
		defaultExtension: true,
		defaultZoomBox: true,
		defaultSearching: true,
		defaultTools:true,
		baseMap : 'map',
		minZoomLevel : '3',  // Set it to 3 to avoid a small map on the screen. ('' = 0)
    	maxZoomLevel : '',		
		useAttribution : false
	},
	

	

	/*
	  Private Function: _create

	  Create a "IGN_API_CORE" widget instance with the default options:
   
	     - divIdMap:'map'
		 - SRS: 'EPSG:4258'
		 - defaultZoom: true
		 - defaultExtension: true
		 - defaultZoomBox: true
		 - defaultSearching: true
		 - defaultTools: true
		 - completeVectorial: it is not necessary if the user doesn't call AddNewVector function. 
	  
	  
	  The map projection is "EPSG:4258".
	
	  The WMTS basic layers loaded in the map are: 
		 - http://www.ign.es/wmts/ign-base, corresponding to IGN Base Map.
		 - http://www.ign.es/wmts/pnoa-ma, corresponding to IGN Orthophoto PNOA.
	
	  
	*/
_create: function(){
  //reference to  widget object
  this_API_CORE = this;
	 
  i18n.init({ fallbackLng: 'en', 
	  		       resGetPath: IGN_URL_REPOSITORY + '/translations/__ns__-__lng__.json', 
		  		       getAsync: false});  
  
  //set styles for measures and popups
  	this_API_CORE.SetStyleMeasure();
  	this_API_CORE.SetStyleFeaturePopup();

	//projection	 	
    // use options SRS to configure the projection
    // check if SRS is supported if not use the default
    var crsValue = findCRSbyName(this_API_CORE.options.SRS);
    if (crsValue === null) {
        crsValue = crs[DEFAULT_CRS_KEY];
        this_API_CORE.options.SRS = crsValue.name;
    }

    var center = (new ol.geom.Point([-6, 36]))
    .transform('EPSG:4258', crsValue.name)
    .getCoordinates();
    var mZoom = 5;
    //this will only work with tilematrixset in wich
    //each tilematrix has the same origin
    var tilegrid = new ol.tilegrid.WMTS({
        extent: [crsValue.minX, crsValue.minY, crsValue.maxX, crsValue.maxY],
        origin: [crsValue.minX, crsValue.maxY],
        resolutions: crsValue.serverResolutions,
        matrixIds: crsValue.matrixIds
    });

	
	//Define a namespace for the application.
	window.app = {};
	var ign = window.app;
	
	//add zoom box control
	ol.inherits(this_API_CORE._SetZoomBoxControl, ol.control.Control);
	ol.inherits(this_API_CORE._setLocation, ol.control.Control);
	ol.inherits(this_API_CORE._setRotateNorth, ol.control.Control);	
// Button disable //	ol.inherits(this_API_CORE._setRotation, ol.control.Control);  

	
	//add 
//	var initExtension = this_API_CORE._InitExtensionControl(); 
    //always plot WGS84 coordinate
	var mousePositionControl = new ol.control.MousePosition({
//		 projection: PROJECTION_CODE,
		 projection: 'EPSG:4326',
		  coordinateFormat: function(coordinate) {
			  if (i18n.lng() === "es-ES" || i18n.lng() === "es" || i18n.lng()==="es-es"){		
//				  return ol.coordinate.format(coordinate, 'Coordenadas: {x}, {y} (lon-lat, WGS84)', 4);  
				  return ol.coordinate.format(coordinate, '{x}, {y} (lon-lat, WGS84)', 4);  
			  } else{	
				  return ol.coordinate.format(coordinate, '{x}, {y} (lon-lat, WGS84)', 4);
			  }
			  
		  },
		  // comment the following two lines to have the mouse position
		  // be placed within the map.
		  //className: 'custom-mouse-position',
		  //target: document.getElementById('mouse-position'),
		  //undefinedHTML:'&nbsp;'
		  undefinedHTML: i18n.t("Coordenadas")
	});
	
	// Boton para el movil, y solo para el movil
	ign.SetMovilCambioMapa = function(opt_options){
	  var options = opt_options || {};
	  
	  
	  var anchor = document.createElement('a');
	  anchor.href = '#set-movilMap';
	  anchor.id = 'SetMovilMap';
	  anchor.className = 'apiIgn-SetMovilMap';
	  anchor.title = i18n.t("Mapa Base");
	  

	  var handleSetMapaBase = function(e) {
	    // prevent anchor from getting appended to the url
	    e.preventDefault();
	    if (this_API_CORE._activateMap){
	    	// Ticket#: 2016122110000041
	    	this_API_CORE._activateLayers(["PNOA"]);
	    	this_API_CORE._desactivateLayers(["IGN-BASE", "IGN-HIBRIDO"]);
		    //this_API_CORE.GetMap().getLayers().item(0).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(1).setVisible(true);
		    //this_API_CORE.GetMap().getLayers().item(2).setVisible(false);
		    
		    $('.apiIgn-SetMovilMap').html('Mapa');
		    this_API_CORE._activateMap = false;
		    this_API_CORE._activateImage = true;
	    } else {
	    	// Ticket#: 2016122110000041
	    	this_API_CORE._activateLayers(["IGN-BASE"]);
	    	this_API_CORE._desactivateLayers(["PNOA", "IGN-HIBRIDO"]);	    	
	    	//   this_API_CORE.GetMap().getLayers().item(0).setVisible(true);
			//   this_API_CORE.GetMap().getLayers().item(1).setVisible(false);
			//   this_API_CORE.GetMap().getLayers().item(2).setVisible(false);
		
			    $('.apiIgn-SetMovilMap').html('Imagen');
			    this_API_CORE._activateMap = true;
			    this_API_CORE._activateImage = false;
	    }
	  };

	  anchor.addEventListener('click', handleSetMapaBase, false);
	  anchor.addEventListener('touchstart', handleSetMapaBase, false);

	  var className = "set-mapaMovil ol-unselectable";
	  var element = document.createElement('div');
	  element.id = "set-mapaMovil";
	  element.className = className;	  
	  element.appendChild(anchor);
	  
	  $(function(){
		  if (this_API_CORE.options.baseMap === 'image'){
			  $('.apiIgn .apiIgn-SetMovilMap').html('Mapa');
			  this_API_CORE._activateImage = true;
		  }
		  if (this_API_CORE.options.baseMap === 'map'){
			  $('.apiIgn .apiIgn-SetMovilMap').html('Imagen');
			  this_API_CORE._activateMap = true;
		  }
		  if (this_API_CORE.options.baseMap === 'hybrid'){
			  $('.apiIgn .apiIgn-SetMovilMap').html('Mapa');
			  this_API_CORE._activateImage = true;
		  }
	  });
	  
	  ol.control.Control.call(this, {
	    element: element,
	    target: options.target
	  });
	  
	};
	ol.inherits(ign.SetMovilCambioMapa, ol.control.Control);
		
	ign.SetMapaBase = function(opt_options) {

	  var options = opt_options || {};
	  
	  
	  var anchor = document.createElement('a');
	  anchor.href = '#set-mapa';
	  //anchor.id = 'SetMapa';
	  anchor.id = i18n.t("SetMapa");	  
	  anchor.className = 'apiIgn-SetMapa';	  
	  anchor.title = i18n.t("Mapa Base");
	  

	  var handleSetMapaBase = function(e) {
	    // prevent anchor from getting appended to the url
	    e.preventDefault();
	    if (!this_API_CORE._activateMap){
	    	// Ticket#: 2016122110000041
	    	this_API_CORE._activateLayers(["IGN-BASE"]);
	    	this_API_CORE._desactivateLayers(["PNOA", "IGN-HIBRIDO"]);   	
		    //this_API_CORE.GetMap().getLayers().item(0).setVisible(true);
		    //this_API_CORE.GetMap().getLayers().item(1).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(2).setVisible(false);
	
		    $('.apiIgn .apiIgn-SetMapa').addClass('selected');
		    $('.apiIgn .apiIgn-SetPnoa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetHib').removeClass('selected');
		    
		    this_API_CORE._activateMap = true;
		    this_API_CORE._activateImage = false;
		    this_API_CORE._activateHybrid = false;
		    
			// attribution
			$.apiVisualizador.ComprobarCondicionesAtribuciones();		    
	    } else {
	    	// Ticket#: 2016122110000041
	    	this_API_CORE._desactivateLayers(["IGN-BASE", "PNOA", "IGN-HIBRIDO"]);
	    	//this_API_CORE.GetMap().getLayers().item(0).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(1).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(2).setVisible(false);
	
		    $('.apiIgn .apiIgn-SetMapa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetPnoa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetHib').removeClass('selected');
		    
		    this_API_CORE._activateMap = false;
		    this_API_CORE._activateImage = false;
		    this_API_CORE._activateHybrid = false;
	    }

	  };

	  anchor.addEventListener('click', handleSetMapaBase, false);
	  anchor.addEventListener('touchstart', handleSetMapaBase, false);

	  var className = "set-mapa ol-unselectable";
	  var element = document.createElement('div');
	  element.id = "set-mapa";
	  element.className = className;	  
	  element.appendChild(anchor);
	  
	  
	  ol.control.Control.call(this, {
	    element: element,
	    target: options.target
	  });
	  
	  if (this_API_CORE.options.baseMap === 'map'){
		  $(function(){
			  $('.apiIgn .apiIgn-SetMapa').addClass('selected');
			  this_API_CORE._activateMap = true;
			  this_API_CORE._activateImage = false;
			  this_API_CORE._activateHybrid = false;
		  });
	  }	  
	};	
	
	ol.inherits(ign.SetMapaBase, ol.control.Control);
		
	ign.SetPnoa = function(opt_options) {

	  var options = opt_options || {};

	  var anchor = document.createElement('a');
	  anchor.href = '#set-pnoa';

	  anchor.id = 'SetPnoa';
	  anchor.className = 'apiIgn-SetPnoa';
	  anchor.title = i18n.t('Mapa PNOA');
	  

	  var handleSetPnoa = function(e) {
	    // prevent anchor from getting appended to the url
	    e.preventDefault();
	    if (!this_API_CORE._activateImage){
	    	// Ticket#: 2016122110000041
	    	this_API_CORE._activateLayers(["PNOA"]);
	    	this_API_CORE._desactivateLayers(["IGN-BASE", "IGN-HIBRIDO"]);	    	
		    //this_API_CORE.GetMap().getLayers().item(1).setVisible(true);
		    //this_API_CORE.GetMap().getLayers().item(0).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(2).setVisible(false);
	
		    $('.apiIgn .apiIgn-SetPnoa').addClass('selected');
		    $('.apiIgn .apiIgn-SetMapa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetHib').removeClass('selected');
		    
		    this_API_CORE._activateMap = false;
		    this_API_CORE._activateImage = true;
		    this_API_CORE._activateHybrid = false;
		    
			// attribution
			$.apiVisualizador.ComprobarCondicionesAtribuciones();		    
	    } else {
	    	// Ticket#: 2016122110000041
	    	this_API_CORE._desactivateLayers(["IGN-BASE", "PNOA", "IGN-HIBRIDO"]);	    	
	    	//this_API_CORE.GetMap().getLayers().item(0).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(1).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(2).setVisible(false);
	
		    $('.apiIgn .apiIgn-SetMapa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetPnoa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetHib').removeClass('selected');
		    
		    this_API_CORE._activateMap = false;
		    this_API_CORE._activateImage = false;
		    this_API_CORE._activateHybrid = false;
	    }

	  };

	  anchor.addEventListener('click', handleSetPnoa, false);
	  anchor.addEventListener('touchstart', handleSetPnoa, false);

	  
	  var className = "set-pnoa ol-unselectable";
	  var element = document.createElement('div');
	  element.id = "set-pnoa";
	  element.className = className;
	  element.appendChild(anchor);

	  ol.control.Control.call(this, {
	    element: element,
	    target: options.target
	  });
	  if (this_API_CORE.options.baseMap === 'image'){
		  $(function(){
			  $('.apiIgn .apiIgn-SetPnoa').addClass('selected');
			  this_API_CORE._activateImage = true;
			  this_API_CORE._activateMap = false;
			  this_API_CORE._activateHybrid = false;
		  });
	  }	  
	};
	ol.inherits(ign.SetPnoa, ol.control.Control);
	
	
	ign.SetHibrido = function(opt_options) {

	  var options = opt_options || {};

	  var anchor = document.createElement('a');
	  anchor.href = '#set-hibrido';

	  anchor.id = 'SetHib';
	  anchor.className = 'apiIgn-SetHib';
	  anchor.title= i18n.t('Mapa Hibrido');

	  var handleSetHibrido = function(e) {
	    // prevent anchor from getting appended to the url
	    e.preventDefault();
	    if (!this_API_CORE._activateHybrid){
	    	// Ticket#: 2016122110000041
	    	this_API_CORE._activateLayers(["IGN-HIBRIDO","PNOA"]);
	    	this_API_CORE._desactivateLayers(["IGN-BASE"]);
		    //this_API_CORE.GetMap().getLayers().item(0).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(2).setVisible(true);
		    //this_API_CORE.GetMap().getLayers().item(1).setVisible(true);
	
		    $('.apiIgn .apiIgn-SetHib').addClass('selected');
		    $('.apiIgn .apiIgn-SetMapa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetPnoa').removeClass('selected');
		    
		    this_API_CORE._activateMap = false;
		    this_API_CORE._activateImage = false;
		    this_API_CORE._activateHybrid = true;
		    
			// attribution
			$.apiVisualizador.ComprobarCondicionesAtribuciones();		    
	    } else {
	    	// Ticket#: 2016122110000041
	    	this_API_CORE._desactivateLayers(["IGN-BASE", "PNOA", "IGN-HIBRIDO"]);	    	
	    	//this_API_CORE.GetMap().getLayers().item(0).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(1).setVisible(false);
		    //this_API_CORE.GetMap().getLayers().item(2).setVisible(false);
	
		    $('.apiIgn .apiIgn-SetMapa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetPnoa').removeClass('selected');
		    $('.apiIgn .apiIgn-SetHib').removeClass('selected');
		    
		    this_API_CORE._activateMap = false;
		    this_API_CORE._activateImage = false;
		    this_API_CORE._activateHybrid = false;
	    }

	  };
	  
	  anchor.addEventListener('click', handleSetHibrido, false);
	  anchor.addEventListener('touchstart', handleSetHibrido, false);

	  var className = "set-hibrido ol-unselectable";
	  var element = document.createElement('div');
	  element.id = "set-hibrido";

	  element.className = className;
	  element.appendChild(anchor);

	  ol.control.Control.call(this, {
	    element: element,
	    target: options.target
	  });
	  if (this_API_CORE.options.baseMap === 'hybrid'){
		  $(function(){
			  $('.apiIgn .apiIgn-SetHib').addClass('selected');
			  this_API_CORE._activateMap = false;
			  this_API_CORE._activateImage = false;
			  this_API_CORE._activateHybrid = true;
		  });
	  }	  
	};
	ol.inherits(ign.SetHibrido, ol.control.Control);	

	//Search control
	ol.inherits(this_API_CORE._SetSearch, ol.control.Control);

	//Attribution
	ign.SetAttribution = function(opt_options) {

		  var options = opt_options || {};

		  var anchor = document.createElement('a');
		  anchor.href = 'http://www.ign.es';

		  anchor.id = 'ignAttribution';
		  anchor.title= "\u00A9 IGN";
		  var linkText = document.createTextNode("\u00A9 Instituto Geogr\u00e1fico Nacional");
		  anchor.appendChild(linkText);
		  anchor.target = "_blank";
		  anchor.style.textDecoration = "none";
		  anchor.style.color= "black";

		  var className = "apiIgn-attributionIGN";
		  var element = document.createElement('div');
		  element.id = "apiIgn-attribution";
		  element.className = className;
		  element.appendChild(anchor);

		  ol.control.Control.call(this, {
		    element: element,
		    target: options.target
		  });

		};
		ol.inherits(ign.SetAttribution, ol.control.Control);
		

//	var mZoom = 5;
//	var miTilegrid = new ol.tilegrid.WMTS({
//			          origin: ol.extent.getTopLeft(projection.getExtent()),
//			          resolutions: IGNBASEserverResolutions,
//			          matrixIds: IGNBASEmatrixIds
//			        });
	
	var maxZoomLevel = ((this_API_CORE.options.maxZoomLevel == 0) || (this_API_CORE.options.maxZoomLevel == null)) ? (crsValue.numberOfLevels - 1) : this_API_CORE.options.maxZoomLevel;

	var minZoomLevel = isNaN(parseInt(this_API_CORE.options.minZoomLevel,0)) ? 0:parseInt(this_API_CORE.options.minZoomLevel,0);
	
	// Mobile initial zoom
	if($.apiVisualizador.isMobile()){
		mZoom = 4;
	}		
	
	//map 
	map = new ol.Map({
	    target: this_API_CORE.options.divIdMap,
	    renderer: 'canvas',
	    layers: [
			new ol.layer.Tile({
			title:'IGN-BASE',
			url_layer: IGN_BASE_URL,
			type_layer: 'WMTS',
	        source: new ol.source.WMTS({
	            url: IGN_BASE_URL,
	           layer: IGN_BASE_TODO_LAYER,
	            matrixSet: crsValue.name,
	            format: 'image/jpeg',
	            projection: crsValue.name,
	            tileGrid: tilegrid
	        }),
	        visible:(this_API_CORE.options.baseMap !== 'image' && this_API_CORE.options.baseMap !== 'hybrid')
	      }),
	      
	      new ol.layer.Tile({
	    	  	title: 'PNOA',
	    	  	url_layer: IGN_PNOA_URL,
	    	  	type_layer: 'WMTS',
			    source: new ol.source.WMTS({
			        url: IGN_PNOA_URL,
			        layer: IGN_PNOA_LAYER,
			        matrixSet: crsValue.name,
			        format: 'image/jpeg',
			        projection: crsValue.name,
			        tileGrid: tilegrid			        
			    }),
			    visible:(this_API_CORE.options.baseMap === 'image' || this_API_CORE.options.baseMap === 'hybrid')
			  }), 
			  
			  new ol.layer.Tile({
			    	// Ticket#: 2016122110000041				  
					//title:'IGN-BASE',
					title:'IGN-HIBRIDO',				  
					url_layer: IGN_BASE_URL,
					type_layer: 'WMTS',
			        source: new ol.source.WMTS({
			            url: IGN_BASE_URL,
			            layer: IGN_BASE_ORTO_LAYER,
			            matrixSet: crsValue.name,
			            format: 'image/png',
			            projection: crsValue.name,
			            tileGrid: tilegrid
			        }),
			        visible:(this_API_CORE.options.baseMap === 'hybrid')
			      }),
			      //layerGroup
	      
	    ],
	    controls: ol.control.defaults({
	    	attribution: false
	      }).extend([
			new ign.SetAttribution(),
//			initExtension,
			mousePositionControl,
			new this_API_CORE._SetZoomBoxControl(),
			new this_API_CORE._setLocation(),
			new this_API_CORE._setRotateNorth(),	
// Button disable //			new this_API_CORE._setRotation(),			
			new ign.SetMovilCambioMapa(),
			new ign.SetMapaBase(),
			new ign.SetPnoa(),
			new ign.SetHibrido(),
			new this_API_CORE._SetSearch()
		]),
	    view: new ol.View({
	      projection: crsValue.name,
	      center: center,
	      zoom: mZoom,
//	      minZoom:mZoom,
//	      maxZoom:19
//        maxZoom: crsValue.numberOfLevels - 1,
	      minZoom: minZoomLevel,
	      maxZoom: maxZoomLevel 
	    })
	  });
	
	map.on('click', function(evt) {

		
		if (this_API_CORE.isCenter){
			var coordinate = evt.coordinate;
			map.getView().setCenter(coordinate);
		}
		
		if(this_API_CORE.isInfo){
		    this_API_CORE._SetInfoControl(evt);
		}
		
	});
	 
	$('.apiIgn .ol-zoom-in').attr("title",i18n.t("Acercar"));
	$('.apiIgn .ol-zoom-out').attr("title",i18n.t("Alejar"));
	
//	$('.ol-zoom-extent > button').html("");
//	$('.ol-zoom-extent > button').attr("title",i18n.t("Extension inicial")); //Extensi\xf3n Inicial
//	$('.ol-zoom-extent').attr("id","zoom-extent");
	this_API_CORE.AddInitExtensionControl();
	
	ol.inherits(this_API_CORE._SetScale, ol.control.Control);
	
	map.addControl(new this_API_CORE._SetScale);
	
	ol.inherits(this_API_CORE._DisplayMenuPanel, ol.control.Control);

	if(this_API_CORE.options.defaultTools){
	    map.addControl(new this_API_CORE._DisplayMenuPanel);
	    _wControlPanel = jQuery('.apiIgn .apiIgn-wrapper').IGN_Control_Panel();
	    var elementSetVector = document.createElement('div');
		elementSetVector.className = 'apiIgn-setVector';
		_wVectorLayer = $(elementSetVector).IGN_Vector_Layer({urlInput: i18n.t('Introduzca la URL del vector')});
		jQuery('.apiIgn .apiIgn-contentCapaVectorial').append(elementSetVector);
	}

	//Check default controls
	this_API_CORE._checkDefaultsControls();

	
  },
  
/*
  Function: GetMap
  
     Reference to created instance of map based on OpenLayers 3.

  Returns:

     The reference to the instance of map based on OpenLayers 3: "ol.Map".

*/
	
  GetMap: function(){
	  return map;
  },
  
  /*
  Function: AddNewComponent
  
     Create a new component in the Tool Box (Menu Control Panel).
     
  Parameters:

       - newCompDiv: selector pointing to the HTML DIV element that links with the new component.
       - title: tittle of the new component. 
       - id: identifier of the HTML DIV that is appended to the tool box.

  */

  AddNewComponent: function(newCompDiv,title,id){
	  this_API_CORE.mapLayerId = id;
	  _wControlPanel = $('.apiIgn .apiIgn-wrapper').IGN_Control_Panel();
		  _wControlPanel.IGN_Control_Panel("AddNewPanel",title,id,newCompDiv);	
//		  this_API_CORE.components.push(id);
  },
  
//  
//  //No se utiliza por el momento
//  GetComponentsById: function(){
//	return this_API_CORE.components;  
//  },
  
  /*
  Private Function: _checkDefaultsControls
  
     Private widget method to check the default controls to be loaded when the map is created.

  */
  
  _checkDefaultsControls: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			var removed = false;
			if ((map.getControls().item(i).element.className.indexOf("ol-zoom")!=-1) &&
				(map.getControls().item(i).element.className.indexOf("ol-zoom-extent")==-1) && !removed){
				if (this_API_CORE.options.defaultZoom === false){
					map.removeControl(map.getControls().item(i));
					removed = true;
				}
			} else if ((map.getControls().item(i).element.className.indexOf("ol-zoom-extent")!=-1) && !removed){
				if (this_API_CORE.options.defaultExtension === false){
					map.removeControl(map.getControls().item(i));
					removed = true;
				}
			} else if ((map.getControls().item(i).element.className === "apiIgn-setZoomBox") && !removed){
				if (this_API_CORE.options.defaultZoomBox === false){
					map.removeControl(map.getControls().item(i));
					removed = true;
				}
			} else if ((map.getControls().item(i).element.className === "apiIgn-wrapper") && !removed){
				if (this_API_CORE.options.defaultTools === false){
					    map.removeControl(map.getControls().item(i));
					    removed = true;
				}
			} else if ((map.getControls().item(i).element.className === "apiIgn-setBuscador")  && !removed){
				if (this_API_CORE.options.defaultSearching === false){
					map.removeControl(map.getControls().item(i));
					removed = true;
				}
			}
		}
  },
  
  _setLocation : function() {
	  	 var anchor = document.createElement('button');
	   	  anchor.type = 'button';
	   	  anchor.id = 'apiIgn-location';
	   	  anchor.className = 'apiIgn-location ol-unselectable ol-control';
	   	  anchor.title = i18n.t('Localizacion');
	   	  
	   	var getLocation = function(e) {
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function(position){
		        	map.getView().setCenter(ol.proj.transform([position.coords.longitude,position.coords.latitude], 'EPSG:4326', findCRSbyName(map.getView().getProjection().getCode()).name)); 
		        	map.getView().setZoom(15);

//		        	var featurething = new ol.Feature({
//		        	    name: "Home",
//		        	    geometry: new ol.geom.Point(ol.proj.transform(
//		        	    		[position.coords.latitude, position.coords.longitude], 'EPSG:4326', 'EPSG:3857'))
//		        	});
//		        	var vectorSource = new ol.layer.Vector({
//		        		source:new ol.source.Vector({})
//		        	});
//		        	vectorSource.getSource().addFeature(featurething);
//		        	var layers = map.getLayers().getArray();
//		    		for(var j = 0; j<layers.length; ++j){
//		    			if (layers[j].getVisible()){
//		    				layers[j].getSource().addFeature(featurething);
//		    			}
//		    		}
		        });
		    } else {
		        alert("Geolocation is not supported by this browser.");
		    }
	   	};
	   	anchor.addEventListener('click', getLocation, false);
	  	anchor.addEventListener('touchstart', getLocation, false);
	  	  
	   	ol.control.Control.call(this, {
	  	    element: anchor,
	  	    target: "location"
	  	  });
	},
	
//  _setRotation : function() {
//	  	 var anchor = document.createElement('button');
//	   	  anchor.type = 'button';
//	   	  anchor.id = 'apiIgn-rotation';
//	   	  anchor.className = 'apiIgn-rotation ol-unselectable ol-control';
//	   	  anchor.title = i18n.t('Rotacion');
//	   
//	      var rotateRight = function() {
//	    	  var currentRotation = map.getView().getRotation();
//	    	  var rot = ol.animation.rotate({
//	              duration: 1000,
//	              rotation: currentRotation
//	            });
//	            map.beforeRender(rot);
//	            map.getView().rotate(currentRotation + (Math.PI / 2));
//	          };
//	   	  
//	   	anchor.addEventListener('click', rotateRight, false);
//	  	anchor.addEventListener('touchstart', rotateRight, false);
//	  	  
//	   	ol.control.Control.call(this, {
//	  	    element: anchor,
//	  	    target: "rotation"
//	  	  });
//  },
	
  /*
   * Public Function: initRotateNorth
   * 
   * Called in the index.html to set the map to the north when the map is loaded at first time.
   * 
   */	
  initRotateNorth : function() { 
   	  map.getView().setRotation(0);
  },	  
	  
	
  /*
   * Private Function: _setRotateNorth
   * 
   * Set the map to the north when we click the button
   * 
   */	  
  _setRotateNorth : function() {
	  	 var anchor = document.createElement('button');
	   	  anchor.type = 'button';
	   	  anchor.id = 'apiIgn-rotateNorth';
	   	  anchor.className = 'apiIgn-rotateNorth ol-unselectable ol-control';
	   	  anchor.title = i18n.t('Rotar al norte');
	   
	      var goNorth = function() {
	    	  map.getView().setRotation(0);
	          };
	   	  
	   	anchor.addEventListener('click', goNorth, false);
	  	anchor.addEventListener('touchstart', goNorth, false);
	  	  
	   	ol.control.Control.call(this, {
	  	    element: anchor,
	  	    target: "rotateNorth"
	  	  });
},  
  
  /*
	Private Function: _SetZoomBoxControl
	  
	     Add control to zoom a rectangular box selected in the map.    	 
	
  */
  _SetZoomBoxControl: function(){
  	
  	 var anchor = document.createElement('a');
	   	  anchor.href = '#set-zoomBox';
	   	  anchor.id = 'ZB';
	   	  anchor.className = 'apiIgn-ZB';
	   	  anchor.title = i18n.t('Zoom Rectangular');
	   	  var element = document.createElement('div');
	   	  element.className = 'apiIgn-setZoomBox ol-unselectable ol-control';
	   	  element.id = "set-zoomBox";
	   	  element.appendChild(anchor);

	   	var handlerZoomBox = function(e) {
	   		
		   	e.preventDefault();
		   	
		   	if (this_API_CORE.isZoomBox==false){
		   	       //activate control and reset map
		   	    	this_API_CORE.isZoomBox = true;
		   	    	$('.apiIgn .apiIgn-ZB').addClass('selected');
		   	    	//Deactivate another exclusive controls except info
		   	    	this_API_CORE._ExclusiveControlsDeactivation();
	
		   			this_API_CORE._boundingBox = new ol.interaction.DragBox({
			      	      condition: ol.events.condition.always
//			      	      style: new ol.style.Style({
//			      	          stroke: new ol.style.Stroke({
//			      	              color: [0,0,255,1]
//			      	          })
//			      	      })
			      	  });
	
			      	  this_API_CORE.GetMap().addInteraction(this_API_CORE._boundingBox);
			      	  
			      	  this_API_CORE._boundingBox.on('boxend', function(evt){
			      		  var boxExtent = evt.target.getGeometry().getExtent(); 
   		      		      this_API_CORE.GetMap().getView().fit(boxExtent,this_API_CORE.GetMap().getSize());
			      	
			      		});
	   	    	}//end control activation
		   	else{
		   		//deactivate control
		   		this_API_CORE.DeactivateZoomBoxControl();
		   	}
	   	};

  	  anchor.addEventListener('click', handlerZoomBox, false);
  	  anchor.addEventListener('touchstart', handlerZoomBox, false);

  	  ol.control.Control.call(this, {
  	    element: element,
  	    target: "zoomBox"
  	  });

  	},
  	
	 /*
	  Private Function: _calculateScale
	  
	    Calculates the scale nivel of the map
  
		Parameters:
     			- map: The map which scale is calculated
		Returns:
				The value of the scale adjusted with the correct format.
	     
	 */
  	_calculateScale: function(map){
        var mpu = findCRSbyName(map.getView().getProjection().getCode()).metersPerUnit; //meters per unit in depending on the CRS 
//  		var mpu = 2*Math.PI*6378137/360; //2*Pi*r/360 -> lo que mide un grado en metros
  		var pix = map.getSize()[0]; // Numero de pixeles en el mapa
  		var pix2= map.getView().calculateExtent(map.getSize()); // Extension del mapa en grados (xmin, ymin, xmax, ymax)
  		var ang = pix2[2] - pix2[0]; // Extension angular del mapa (cuantos grados estan en el mapa)
  		var scale = (mpu*ang/pix)*1000/0.28; // (numero de metros en el mapa / numero de pixeles) / metros por pixel
  		var formatScale = this_API_CORE._addCommas(parseFloat(scale).toFixed(0).toString());
  		return formatScale;
  	},
  	
  /*
  Private Function: _SetScale
  
     Private widget method to scale map management.
     
 */
  	
    
  _SetScale: function() {

	  var element = document.createElement('div');
	  element.id = "set-scale";
	  element.className = 'apiIgn-setScale';
	 
//	  element.innerHTML = i18n.t('Escala') + ' 1/'+ this_API_CORE._calculateScale(map);
	  element.innerHTML = ' 1/'+ this_API_CORE._calculateScale(map);	  
	  var actualZoom = map.getView().getZoom();
	  
	  map.getView().on('change:resolution',function(e) {
		// prevent anchor from getting appended to the url
		//e.preventDefault();
		var zoomSense = map.getView().getZoom() - actualZoom;
		
		
		//Setting a zoom level for default style (especially for GeoJSON files).
		var actualDefault = this_API_CORE.defaultStyle["Point"][0].getImage().getScale();
		
		if(map.getView().getZoom()>4 || actualZoom >4){
			this_API_CORE.defaultStyle["Point"][0].getImage().setScale(actualDefault + zoomSense *7/(actualZoom*map.getView().getZoom()));
		}
		else{
			this_API_CORE.defaultStyle["Point"][0].getImage().setScale(actualDefault);
		}
		
		
		var layers = map.getLayers().getArray();
		for(var j = 0; j<layers.length; ++j){
			if(layers[j].getSource() instanceof ol.source.Vector){
				var factor = 0;
				var arr = [];
				if(layers[j].get("title") !== undefined){
					arr = layers[j].get("title").split(".");
				}
				factor = zoomSense *7/(actualZoom*map.getView().getZoom());
				if(arr.length > 0 && arr[arr.length - 1].toUpperCase() == "GEOJSON"){
					factor = factor * 0.1;
				}
				if(isNaN(factor)){ //En caso de movil, no siempre se ajusta el zoom con un nivel entero, resultando en un Nan
					factor=0;
				}
				
				if (layers[j].get("type_layer") !== "search" ){
				
				var features2 = layers[j].getSource().getFeatures();
				
				for (var i = 0;i<features2.length; ++i){
					var feature = features2[i].get('features');
					// If not cluster
					if((!(feature instanceof Array) || (feature === undefined)) && (features2[i].getGeometry().getType() === "Point")){
						var styles = features2[i].getStyleFunction().call(features2[i]);
						//If not JSON
						if(styles[0].getImage().getSrc!== undefined){
							var imgSrc = styles[0].getImage().getSrc();
							var scale = styles[0].getImage().getScale();
							if(map.getView().getZoom()<4 || actualZoom<4){
								factor = 0;
							}
							var featStyle = new ol.style.Style({
				         		geometry: styles[0].getGeometry(),
				         		fill: styles[0].getFill(),
				         		stroke:styles[0].getStroke(),
				         	    text:styles[0].getText(),
				         	    zIndex:styles[0].getZIndex(),
							        image: new ol.style.Icon( ({
							        	anchor: [0.5, 1],
							        	anchorXUnits: 'fraction',
									    anchorYUnits: 'fraction',
									    opacity: 1,
									    scale:scale + factor,
									    src: imgSrc
							        }))});
								features2[i].setStyle(featStyle);
						}
					}
					else{ // cluster
						if(feature instanceof Array){
							for(var feat=0;feat<feature.length;feat++){
								var currentFeature = feature[feat];
								styles = currentFeature.getStyleFunction().call(currentFeature);
								if(styles[0].getImage().getSrc!== undefined){
									var imgSrc = styles[0].getImage().getSrc();
									var scale = styles[0].getImage().getScale();
									if(map.getView().getZoom()<4 || actualZoom<4){
										factor = 0;
									}
									var featStyle = new ol.style.Style({
						         		geometry: styles[0].getGeometry(),
						         		fill: styles[0].getFill(),
						         		stroke:styles[0].getStroke(),
						         	    text:styles[0].getText(),
						         	    zIndex:styles[0].getZIndex(),
									        image: new ol.style.Icon( ({
									        	anchor: [0.5, 1],
									        	anchorXUnits: 'fraction',
											    anchorYUnits: 'fraction',
											    opacity: 1,
											    scale:scale + factor,
											    src: imgSrc
									        }))});
									currentFeature.setStyle(featStyle);
								}
							}
						}
					}
				}
			}
			}
		}
		
//		element.innerHTML = i18n.t('Escala') + ' 1/'+this_API_CORE._calculateScale(map);
		element.innerHTML = ' 1/'+this_API_CORE._calculateScale(map);		
		actualZoom = map.getView().getZoom();
	  }); 
	  
	  ol.control.Control.call(this, {
	    element: element,

	  });

	},
	
	 /*
	  Private Function: _addCommas
	  
	    Add commas
    
  		Parameters:
       			- nStr: string value
		Returns:
				string value with commas
	     
	 */
	_addCommas: function(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + '.' + '$2');
		}
		return x1 + x2;
	},
	
	/*
	  Private Function: _SetSearch
	  
	     Private widget method to include the search place names or address candidates from IDEE and CartoCiudad services using autocomplete functionality, and select one of them from the list of candidates.
	     
	*/
	_SetSearch: function() {
	  
	    //The following code is used to call the IGN_search plugin
	      var element = document.createElement('div');
		  element.className = 'apiIgn-setBuscador ol-unselectable';
		  element.id = 'searching';
	   
		 ol.control.Control.call(this, {
		    element: element
		  });

		 
		 
		},
	

/*
  Private Function: _DisplayMenuPanel
  
     Private widget method to include:
     	- Tools: lineal and polygonal measurements, remove tool and rectangular zoom.
	  	- Add vector layer: to load vectorial layers.
	  	- New components added by AddNewComponent function.
     
 */
	_DisplayMenuPanel: function() {
		
		var element = document.createElement('div');
		element.id = 'apiIgn-wrapper';
		element.className = 'apiIgn-wrapper';
	
		ol.control.Control.call(this, {
			element: element,

		});
		
	},
	
/*
  Function: AddZoomControl
  
     Add zoom control to the map, based on OpenLayers 3 ol.control.Zoom.

*/
	AddZoomControl: function(){
		  var zoom = new ol.control.Zoom();
		  
		  map.addControl(zoom);
		  $('.apiIgn .ol-zoom-in').attr("title",i18n.t("Acercar"));
		  $('.apiIgn .ol-zoom-out').attr("title",i18n.t("Alejar"));
	  },
	
/*
  Function: AddInitExtensionControl
  
     Add initial zoom extension control to the map, based on OpenLayers 3 ol.control.ZoomToExtent.

*/	
	AddInitExtensionControl: function(){
		var ext;
        ext = ol.geom.Polygon.fromExtent([-22.1055, 25.5996, 11.07732, 44.8916])
        .transform('EPSG:4258', this_API_CORE.options.SRS)
        .getExtent();

		  
		var extension = new ol.control.ZoomToExtent({
			  //extent: [-22.1055, 25.5996, 11.07732, 44.8916]
			  extent:ext
		});
		  map.addControl(extension);
//		  map.addControl(this_API_CORE._InitExtensionControl());
		  
		  $('.apiIgn .ol-zoom-extent > button').html("");
		  $('.apiIgn .ol-zoom-extent > button').attr("title",i18n.t("Extension inicial"));
		  $('.apiIgn .ol-zoom-extent').attr("id","zoom-extent");
	},
	  
/*
  Function: AddZoomBoxControl
  
     Add control to zoom rectangular box in teh map.

*/	  
	AddZoomBoxControl: function() {
		 
		 ol.inherits(this_API_CORE._SetZoomBoxControl, ol.control.Control);
		 map.addControl(new this_API_CORE._SetZoomBoxControl);
	},
	
/*
  Function: AddSearchControl
  
     Add control to include the search place names or address candidates from IDEE and CartoCiudad services using autocomplete functionality, and select one of them from the list of candidates.

*/
	
AddSearchControl: function() {
	
		ol.inherits(this_API_CORE._SetSearch, ol.control.Control);
		map.addControl(new this_API_CORE._SetSearch);
},
		

/*
  Function: AddDisplayMenuPanel
  
  	Add control to display tool box components
        
        - Tools: lineal and polygonal measurements, remove tool and rectangular zoom.
	  	- Add vector layer: to load vectorial layers.
	  	- New components added by AddNewComponent function.

*/			
	AddDisplayMenuPanel: function() {
		
		ol.inherits(this_API_CORE._DisplayMenuPanel, ol.control.Control);
		map.addControl(new this_API_CORE._DisplayMenuPanel);		  	
	    var elementSetVector = document.createElement('div');
		elementSetVector.className = 'apiIgn-setVector';
	},
	
/*
  Function: RemoveZoomControl
  
     Remove zoom control from the map.

*/	  
	RemoveZoomControl: function(){
			for (var i = 0; i < map.getControls().getLength(); i++ ){
				if (map.getControls().item(i).element.className.indexOf("ol-zoom")!=-1 &&
					map.getControls().item(i).element.className.indexOf("ol-zoom-extent")==-1)
					map.removeControl(map.getControls().item(i));
			}
	  },
	
/*
  Function: RemoveZoomBoxControl
  
     Remove control to zoom rectangular box in the map.

*/	
	  RemoveZoomBoxControl: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			if (map.getControls().item(i).element.className === "apiIgn-setZoomBox")
				map.removeControl(map.getControls().item(i));
		}
	},

/*
  Function: RemoveSearchControl
  
     Remove control to include the search place names or address candidates from IDEE and CartoCiudad services using autocomplete functionality, and select one of them from the list of candidates.

*/
	RemoveSearchControl: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
		if (map.getControls().item(i).element.className === "apiIgn-setBuscador")
				map.removeControl(map.getControls().item(i));
		}
	},

/*
  Function: RemoveInitExtensionControl
  
     Remove initial zoom extension control from the map.

*/
	RemoveInitExtensionControl: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			if (map.getControls().item(i).element.className.indexOf("ol-zoom-extent")!=-1)
				map.removeControl(map.getControls().item(i));
		}
	},
	  
/*
  Function: RemoverDisplayMenuPanel
  
     Remove display menu panel control from the map.

*/
   RemoverDisplayMenuPanel: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			if (map.getControls().item(i).element.className === "apiIgn-wrapper"){
				map.removeControl(map.getControls().item(i));
				$(function(){
					$(".apiIgn-setVector").remove();
				});
			}
		}
	},
	
/*
  Function: GetZoomControl
  
     Reference to zoom control instance based on OpenLayers 3.

  Returns:

     The reference to the zoom control based on OpenLayers 3: "ol.control.Zoom".

*/
	  
	GetZoomControl: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			if (map.getControls().item(i).element.className.indexOf("ol-zoom")!=-1 && map.getControls().item(i).element.className.indexOf("ol-zoom-extent")==-1)
				return map.getControls().item(i);
		}
	},

/*
  Function: GetZoomBoxControl
  
     Reference to zoom rectangular box control instance based on OpenLayers 3.

  Returns:

     The reference to the zoom rectangular box control.

*/
	  
	GetZoomBoxControl: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			if (map.getControls().item(i).element.className === "apiIgn-setZoomBox")
				return map.getControls().item(i);
		}
	},
	
/*
  Function: GetSearchControl
  
     Reference to the control for searching place names or address candidates from IDEE and CartoCiudad services using autocomplete functionality, and select one of them from the list of candidates.

  Returns:

     The reference to the control for searching place names or address candidates, based on OpenLayers 3: "ol.control.Control".

*/
	  
	GetSearchControl: function(){
	  var widgetObject;
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			if (map.getControls().item(i).element.className === "apiIgn-setBuscador"){
				return map.getControls().item(i);
			}
		}
	},

/*
  Function: GetSearchWidget
  
     Reference to the selector IGN_search for searching place names or address candidates from IDEE and CartoCiudad services using autocomplete functionality, and select one of them from the list of candidates.
     Important: It`s necessary to load all windows content before to get the reference, so the way to call the funtion shall be: 
     
     	(start code)
	     $(window).load(function() {
		       	var buscWidget = apiMap.IGN_API_CORE("GetSearchWidget");
	     });
	    (end)

  Returns:

     The reference to the selector IGN_search for searching place names or address candidates.

*/
	  
	GetSearchWidget: function(){
	  return $(":IGN-search");
	},

/*
  Function: GetInitExtensionControl
  
     Reference to initial extension control instance based on OpenLayers 3.

  Returns:

     The reference to the initial extension control based on OpenLayers 3: "ol.control.ZoomToExte".

*/
	GetInitExtensionControl: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			if (map.getControls().item(i).element.className.indexOf("ol-zoom-extent")!=-1)
				return map.getControls().item(i);
		}
	},

/*
  Function: GetDisplayMenuPanel
  
     Reference to the display menu panel control (Tool box).

  Returns:

     The reference to the display menu panel control instance based on OpenLayers 3: "ol.control.Control".

*/
	GetDisplayMenuPanel: function(){
		for (var i = 0; i < map.getControls().getLength(); i++ ){
			if (map.getControls().item(i).element.className === "apiIgn-wrapper")
					return map.getControls().item(i);
		}
	},
	 
/*
  Function: AddNewVector
  
     Add new vectorial layers. This is an asyncronous operation, the result is sent when the completeVectorial event is triggered.
     The user can define the callback function in the IGN_API_CORE widget creation.
     
     (start code)
        	var apiMap = $('#map').IGN_API_CORE({
			completeVectorial:function(event,result){
				if (result.input.length>0) 
					alert(result.result + " "  + result.input[0] + " "  + result.input[1] + " "  + result.input[2]);
				else
					alert(result.result);},
			divIdMap: 'map', 
			SRS:'4258',
        	defaultZoom: true,
        	defaultExtension: true,
    		defaultZoomBox: true,
    		defaultSearching: true,
    		defaultTools:true
    	});
    (end)

  Parameters:

    - projType: projection type. Possible values are EPSG:4258, EPSG:4326 or EPSG:3857.
    - vectorIGN: url vector layer.
    - vectorType: GPX [EPSG:4326], KML [EPSG:4326] or GeoJSON [EPSG:4258,EPSG:4326,EPSG:3857].
  	- zoomLevel: set initial zoom level
  
  Returns:
  	returnValue: _ResultNewVector structure:
  			- returnValue.result: "Error", "Valid" or "Repeated".
  			- returnValue.input: input parameters.
  	 

*/
	AddNewVector: function(projType,vectorIGN,vectorType, zoomLevel){
		jQuery.apiVisualizador.docAddVector(projType,vectorIGN,vectorType, this_API_CORE,zoomLevel);
 
	},
	
	
	/*
	  Private Function: _drawFeature
	  
	     Add the input vector layer to the map, draw its features and add the layer into the TOC.
	     
	   Parameters:

	    - source: ol.source.Vector object containing all features.
	    - url: url vector layer.

	  Returns:

	    vector layer or null if the vector was already loaded 

	*/
	
	_drawFeature: function(source, url){

    	
  	    var loadedMsg = '<p id="alreadyLoadedVect">' + i18n.t("El servicio ha sido cargado con anterioridad") + '</p>';
  	    var exist = false;
  	    var visibleOnMap=true;
  	    
  	    var j = 0;
    	while (!exist && j< this_API_CORE.GetMap().getLayers().getLength()){
  	    	if (this_API_CORE.GetMap().getLayers().item(j).get("url_layer") === url)
  	    		exist = true;
  	    	else
  	    		j++;
  	    }	
  	    
  	    
		if (!exist){
			
		  	  var layerTitle = url.split('/').pop();
	    	  layerTitle = url.split('\\').pop();

	    	var vector = new ol.layer.Vector({
				type_layer: 'vector',
				title: layerTitle,//url
				url_layer: url,
				source: source ,
				visible: visibleOnMap//; false
			});
	    	
	    	// Update the property firetree of the map -> add the vector to the node tree	    	
	    	map.set("fireTree", vector);
			this_API_CORE.GetMap().addLayer(vector);
			this_API_CORE.vectorLayer.push(vector);
			return vector;
		} else {
			this_API_CORE._showError("El servicio ha sido cargado con anterioridad");
			return null;
		}

		//Change cursor to pointer when hover on features
		var cursorHoverStyle = "pointer";
		var target = this_API_CORE.GetMap().getTarget();
		//target returned might be the DOM element or the ID of this element dependeing on how the map was initialized
		//either way get a jQuery object for it
		var jTarget = typeof target === "string" ? $("#"+target) : $(target);
		this_API_CORE.GetMap().on("pointermove", function (event) {
	    var mouseCoordInMapPixels = [event.pixel[0], event.pixel[1]];
		 //detect feature at mouse coords
		 var hit = this_API_CORE.GetMap().forEachFeatureAtPixel(mouseCoordInMapPixels, function (feature, layer) {
		        return true;
		  });

		    if (hit) {
		        jTarget.css("cursor", cursorHoverStyle);
		    } else {
		        jTarget.css("cursor", "");
		    }
		});
		//end change cursor style

  },
	
	
	/*
	  Private Function: AddNewVectorCluster
	  
	     Add the input vector layer to the map, draw its features and add the layer into the TOC.
	     
	     (start code)
	        	var apiMap = $('#map').IGN_API_CORE({
				completeVectorial:function(event,result){
				if (result.input.length>0) 
					alert(result.result + " "  + result.input[0] + " "  + result.input[1] + " "  + result.input[2]);
				else
					alert(result.result);},
				divIdMap: 'map', 
				SRS:'4258',
	        	defaultZoom: true,
	        	defaultExtension: true,
	    		defaultZoomBox: true,
	    		defaultSearching: true,
	    		defaultTools:true
	    	});
	    (end)

	  Parameters:

	    - projType: projection type. Possible values are EPSG:4258 or EPSG:4326.
	    - vectorIGN: url vector layer.
	    - vectorType: KML.
	    - distance: distance between vectors.
	    - showFeatures: show grouped features on hover interaction when true. 
	    - zoomLevel: set initial zoom level
	  
	  Returns:
	  	returnValue: _ResultNewVector structure:
	  			- returnValue.result: "Error", "Valid" or "Repeated".
	  			- returnValue.input: input parameters.
	  	 

	*/
	AddNewVectorCluster: function(projType,vectorIGN,vectorType,distance,showFeatures, zoomLevel){
		jQuery.apiVisualizador.docAddVectorCluster(projType,vectorIGN,vectorType, this_API_CORE,distance,showFeatures, zoomLevel);

		},
			
	
		/*
		  Private Function: _estiloBasicoIconos
		  
		     Styles assigned to each vector
		     
		   Parameters:

		    - feature: ol.source.Vector object containing all features.
		    - imgSrc: url vector layer.
		    - zoomLevel: Set initial zoom level

		  Returns:

		    result: style.
		*/
		_estiloBasicoIconos: function(feature,imgSrc, zoomLevel){
			var style = new ol.style.Style({
			geometry: feature.getGeometry(),
			image: new ol.style.Icon({
//				  scale: 1,
				  scale: zoomLevel,
				  src: imgSrc
				})
			});
			return style;
		},
	
		/*
		  Private Function: _separacion
		  
		     Offset assigned to the symbols, do not appear overlapped
		     
		   Parameters:
	
		    - feature: ol.source.Vector object containing all features.
		    - numberIcon: number of icon in the cluster
	
		  Returns:
	
		    result: anchor.
		*/
		//Funcion que aplica un offset a los simbolos para que no aparezcan montados
		_separacion: function(feature,numberIcon){
			var anchor = [0,0];
			anchor = [numberIcon*0.2,numberIcon*0.2];
			return anchor;
		},
	
		/*
		  Private Function: _estiloBasicoIconosDobles
		  
		     Styles assigned to each vector of a cluster with two elements
		     
		   Parameters:
	
		    - feature: ol.source.Vector object containing all features.
		    - imgSrc: url vector layer.
		    - numberIcon: number of icon in the cluster
		    - zoomLevel: Set initial zoom level
	
		  Returns:
	
		    result: style.
		*/
		_estiloBasicoIconosDobles: function(feature,imgSrc,numberIcon, zoomLevel){
			var elementoCluster = feature;
			var style = new ol.style.Style({
			geometry: feature.getGeometry(),
			image: new ol.style.Icon({
				  scale: zoomLevel,
				  anchor: this_API_CORE._separacion(elementoCluster,numberIcon),
				  src: imgSrc,
				  anchorXUnits:'pixels',
				  anchorYUnits:'pixels'
				})
			});
			return style;
		},
	
	
	/*
	  Private Function: _drawFeatureCluster
	  
	     Add the input vector layer to the map, draw its features and add the layer into the TOC.
	     
	   Parameters:

	    - source: ol.source.Vector object containing all features.
	    - url: url vector layer.
	    - newIcon: vector with urls of the icon.
	    - distance: distance between vectors
	    -showFeatures: show grouped features on hover interaction when true. 
	    - zoomLevel: Set initial zoom level

	  Returns:

	    vector layer or null if the vector layer is already loaded

	*/
	
	_drawFeatureCluster: function(source, url, newIcon,distance,showFeatures,zoomLevel){
		var result = null;
		var exist = false;
  	    var j = 0;
    	while (!exist && j< this_API_CORE.GetMap().getLayers().getLength()){
  	    	if (this_API_CORE.GetMap().getLayers().item(j).get("url_layer") === url)
  	    		exist = true;
  	    	else
  	    		j++;
  	    }	
    	
    	
  	    
		if (!exist){
			var vectorTitle = url.split('/').pop();
		  vectorTitle = url.split('\\').pop();
		  
		  
		  /////////Cluster for markers/////////////
		  //Creation cluster
			var clusterPuntosKML = new ol.source.Cluster({
				distance: distance,
				source: source,
				wrapX: false
			});
			clusterPuntosKML.addFeatures(source.getFeatures());
		  
			//Estilo para el numero del Cluster
			var invisibleFill = new ol.style.Fill({
			  color: 'rgba(255, 255, 255, 0.01)'
			});
			var styleCache = {};
			//Creation Vector
			var vector = new ol.layer.Vector({
				    type_layer: 'vector',
				    title:vectorTitle,
					url_layer: url,
					source: clusterPuntosKML,
					//Diferentes estilos en funcion de la escala y del numero de puntos por cluster
					style: function(feature, resolution) {
						var view = map.getView();
			            var mpu = findCRSbyName(view.getProjection().getCode())
			                    .metersPerUnit;
			            var resolutionInM = resolution * mpu; // m / pixel
			            var commonPixelSize = 0.28 / 1000; // m / pixel
			            var scale = parseInt(resolutionInM / commonPixelSize);

					if(feature.get('features').length == 1){
						var styles = [new ol.style.Style({})];
						var size = feature.get('features').length;
						var originalFeatures = feature.get('features');
						for (var i = originalFeatures.length - 1; i >= 0; --i) {
									originalFeature = originalFeatures[i];
									var styleUrl = (originalFeature.get('icono') !== undefined) ? originalFeature.get('icono'):originalFeature.get('styleUrl');
									styleUrl=styleUrl.replace("#",'');
									styleUrl=styleUrl.concat('.');
									if(newIcon.length>0){
										for (var j = 0; j < newIcon.length; j++) {
											var iconFeature = newIcon[j].idStyle;
											if(iconFeature.indexOf(styleUrl) > -1){
												styles.push(this_API_CORE._estiloBasicoIconos(originalFeature,newIcon[j].urlStyle, originalFeature.getStyle().getImage().getScale()));
												break;
											}
										}
									}
									else{
										styles.push(this_API_CORE.defaultStyle[originalFeature.getGeometry().getType()][0])
									}
							}
							return styles;		  
					}
					else if(scale > 135173){
//					else if(resolution > 0.00034){
						var size = feature.get('features').length;
						var style = styleCache[size];
						if (!style) {
						  style = [new ol.style.Style({
							image: new ol.style.Circle({
							//  radius: 8+size,
							  radius: 14,
							  stroke: new ol.style.Stroke({
								//color: '#fff'
									  color: 'rgba(255, 153, 0, 0.6)',
									  width:4
							  }),
							  fill: new ol.style.Fill({
								//color: '#3399CC'
								  color: 'rgba(255, 153, 0, 0.7)'
							  })
							}),
							text: new ol.style.Text({
							  text: size.toString(),
							  fill: new ol.style.Fill({
								color: 'rgba(255, 255, 255, 1)',
								scale:1.1
							  })
							})
						  })];
						  styleCache[size] = style;
						}
						return style;
					  }else if((scale > 8348) && (feature.get('features').length == 1)){
//					  }else if((resolution > 0.000021) && (feature.get('features').length == 1)){
						var styles = [new ol.style.Style({})];
						var size = feature.get('features').length;
						var originalFeatures = feature.get('features');
						for (var i = originalFeatures.length - 1; i >= 0; --i) {
								originalFeature = originalFeatures[i];
								var styleUrl = (originalFeature.get('icono') !== undefined) ? originalFeature.get('icono'):originalFeature.get('styleUrl');
								styleUrl=styleUrl.replace("#",'');
								styleUrl=styleUrl.concat('.');
								for (var j = 0; j < newIcon.length; j++) {
									var iconFeature = newIcon[j].idStyle;
									if(iconFeature.indexOf(styleUrl) > -1){
										styles.push(this_API_CORE._estiloBasicoIconos(originalFeature,newIcon[j].urlStyle, originalFeature.getStyle().getImage().getScale()));
										break;
									}
								}
						}
						return styles;		  
					  }
//					  else if(resolution > 0.0000210){
					  else if(scale > 8348){
						var size = feature.get('features').length;
						var style = styleCache[size];
						if (!style) {
						  style = [new ol.style.Style({
							image: new ol.style.Circle({
							//  radius: 8+size,
								  radius: 14,
							  stroke: new ol.style.Stroke({
								color: 'rgba(255, 255, 255, 1)'
							  }),
							  fill: new ol.style.Fill({
								//color: '#3399CC'
									color: 'rgba(255, 153, 0, 0.8)'
							  })
							}),
							text: new ol.style.Text({
							  text: size.toString(),
							  fill: new ol.style.Fill({
								color: 'rgba(255, 255, 255, 1)'
							  })
							})
						  })];
						  styleCache[size] = style;
						}
						return style;
					  }
					  else {
								var styles = [new ol.style.Style({})];
								var size = feature.get('features').length;
								var originalFeatures = feature.get('features');
								for (var i = originalFeatures.length - 1; i >= 0; --i) {
											originalFeature = originalFeatures[i];
											var styleUrl = (originalFeature.get('icono') !== undefined) ? originalFeature.get('icono'):originalFeature.get('styleUrl');
											styleUrl=styleUrl.replace("#",'');
											styleUrl=styleUrl.concat('.');
											for (var j = 0; j < newIcon.length; j++) {
											var iconFeature = newIcon[j].idStyle;
												if(iconFeature.indexOf(styleUrl) > -1){
												styles.push(this_API_CORE._estiloBasicoIconos(originalFeature,newIcon[j].urlStyle, originalFeature.getStyle().getImage().getScale()));
													break;
												}
											}
									}
									return styles;		  
							}
					  
					  }
					});
			
			
			if(showFeatures){			
					//interaction when pointer move over the circle
					var _interationMarkers = new ol.interaction.Select({
						  condition: function(evt) {
							  return evt.originalEvent.type == 'pointermove' ||
								  evt.type == 'pointermove';
							},
			      	      layers: [vector],
					      style: function(feature, resolution){
							  var styles = [new ol.style.Style({
								  })];
							  
							
							  	  var originalFeatures = [];
								  originalFeatures = feature.get('features');
								  for (var i = originalFeatures.length - 1; i >= 0; --i) {
									originalFeature = originalFeatures[i];
									var styleUrl = (originalFeature.get('icono') !== undefined) ? originalFeature.get('icono'):originalFeature.get('styleUrl');
									styleUrl = styleUrl.replace("#",'');
									styleUrl = styleUrl.concat('.');
									for (var j = 0; j < newIcon.length; j++) {
										var iconFeature = newIcon[j];
										if(iconFeature.indexOf(styleUrl) > -1){
											if(originalFeatures.length == 2){
												styles.push(this_API_CORE._estiloBasicoIconosDobles(originalFeature,iconFeature,j, originalFeature.getStyle().getImage().getScale()));
											}else{
												styles.push(this_API_CORE._estiloBasicoIconos(originalFeature,iconFeature,originalFeature.getStyle().getImage().getScale()));
											}
											break;
										}
									}
								  }
								  return styles;
						}  
					
					});
		
			      	  this_API_CORE.GetMap().addInteraction(_interationMarkers);
			}
	      	  
			
	    	// Update the property firetree of the map -> add the vector to the node tree			
			map.set("fireTree", vector);
			this_API_CORE.GetMap().addLayer(vector);
			this_API_CORE.vectorLayer.push(vector);
			result = vector;
		} else {
			result = null;
		}
		return result;
    },
	
	
	/*
	  Private Function: _GetSearchFeatures
	  
	     Private widget method to get feature collection related to the search place names or address candidates from IDEE and CartoCiudad services using autocomplete functionality, and select one of them from the list of candidates.
	     
	 */
	_GetSearchFeatures: function() {
	  
		//It is the result of javascript function selectedItem
		var escuchador = {  
			//It is the function to invoke this plugin, search the results and respresent these results in the map
			selectedItem: function(event, geoJSONfeatureCollection){
				
				
				this_API_CORE._trigger('completeSearch',null,geoJSONfeatureCollection);
	
			}
	    };
	    
	    //The following code is used to call the IGN_search plugin
	    $(function(){
	  	  //The "searching" div is referenced to call the "search" widget, it is mandatory to use this name for the widget.
	      this_API_CORE._searching = $('.apiIgn .apiIgn-setBuscador').search({  
	        selected: escuchador.selectedItem,
	        //geographicNameType collects the types of included geographic names as candidates in the search
	        geographicNameType:[  
'Comunidad aut�noma',
'Ciudad con estatuto de autonom�a',
'Provincia',
'Municipio',
'EATIM',
'Isla administrativa',
'Comarca administrativa',
'N�cleos de poblaci�n',
'Entidad colectiva',
'Entidad menor de poblaci�n',
'Entidad singular',
'Alineaci�n monta�osa',
'Monta�a',
'Paso de monta�a',
'Llanura',
'Depresi�n',
'Vertientes',
'Comarca geogr�fica',
'Paraje',
'Elemento puntual del paisaje',
'Saliente costero',
'Playa',
'Isla',
'Otro relieve costero',
'Parque Nacional y Natural',
'Espacio protegido restante',
'Aeropuerto',
'Aer�dromo',
'Pista de aviaci�n y helipuerto',
'Puerto de Estado',
'Instalaci�n portuaria',
'Carretera',
'Camino y v�a pecuaria',
'V�a urbana',
'Ferrocarril',
'Curso natural de agua',
'Masa de agua',
'Curso artificial de agua',
'Embalse',
'Hidr�nimo puntual',
'Glaciares',
'Mar',
'Entrante costero y estrecho mar�timo'
],
	  			// title to include in the drop down menu 
	      		titleBox: 'Top&oacute;nimo o direcci&oacute;n'
	          });
	    	});

	      var element = document.createElement('div');
		  element.className = 'apiIgn-setBuscador ol-unselectable';
		  element.id = 'searching';
	   
		 ol.control.Control.call(this, {
		    element: element
		  });
		
	},
		
	/*
	  Function: SearchFeatures
	  
	     Add control to get geojson feature collection related to the search place names or address candidates from IDEE and CartoCiudad services using autocomplete functionality, and select one of them from the list of candidates.
	     This is an asyncronous operation, the result is sent when the completeSeacrh event is triggered.
     	 The user can define the callback function in the IGN_API_CORE widget creation.
     
     	(start code)
        	var apiMap = $('#map').IGN_API_CORE({
			completeSearch:function(event,result){
				apiMap.IGN_API_CORE("DrawSearchFeature",result);
			},
			divIdMap: 'map', 
			SRS: '4258'
        	defaultZoom: true,
        	defaultExtension: true,
    		defaultZoomBox: true,
    		defaultSearching: false,
    		defaultTools:true
    	});
    	(end)
    	
    	apiMap.IGN_API_CORE("SearchFeatures");
	     	     
	     This method musn`t be used with default searching control activated.
	     If user has fogotten put defaultSearching option to false, then this method performs it. 
	 */
	SearchFeatures: function() {
		if (this_API_CORE.options.defaultSearching === true){
			for (var i = 0; i < map.getControls().getLength(); i++ ){
				if (map.getControls().item(i).element.className === "apiIgn-setBuscador")
					map.removeControl(map.getControls().item(i));
			}
			this_API_CORE.options.defaultSearching = false;
		}
		
		ol.inherits(this_API_CORE._GetSearchFeatures, ol.control.Control);
		map.addControl(new this_API_CORE._GetSearchFeatures);

	},
			

	
	/*
	 * Returns a _ResultNewVector structure:
	 * 		- result: string showing whether the operation was successful [Error or Valid].
	 * 		- input: array with the input parameters 
	 * 		- layer: the loaded layer 
	 */
    _ResultNewVector: function(){
      return {
        result: "Error", 
        input: [],
        layer: null
      };
    },
        
	/*
	 * Returns a _FeaturesStyles structure:
	 * 		- idStyle: style id of the feature.
	 * 		- urlStyle: url of the feature
	 */
    _FeatureStyles: function(){
      return {
        idStyle: "default", 
        urlStyle: "default"
      };
    },
    
    /*
	  Function: MeasureLinearDistance
	  
	     Draw and calculate the lineal distance between two points in the map.
	     If other measures with their geometries are drawn before over the map then they are removed.
	     
	     
	 */
    MeasureLinearDistance: function(){
    	this_API_CORE.isLinealMeasure = true;
    	this_API_CORE._ExclusiveControlsActivation();
    	this_API_CORE._draw("linea");
    },
    
    /*
	  Function: MeasureArea
	  
	     Draw and calculate the area in the map.
	     If other measures with their geometries are drawn before over the map then they are removed.
	     
	 */
    MeasureArea: function(){
    	this_API_CORE.isPolygonalMeasure=true;
    	this_API_CORE._ExclusiveControlsActivation();
    	this_API_CORE._draw("area");
    },
    
    //No se utiliza por el momento
    _HexToRgb:function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    
    /*
	  Private Function: _draw
	  
	     Private widget method to draw and calculate the area or lineal distance in the map, depending on the input parameter.
	     
	     Parameters:
	     - typeGeometry: "linea" or "area" are possible values.
	     
	*/
    _draw: function(typeGeometry){
    	
		/**
		 * format length output
		 * @param {ol.geom.LineString} line
		 * @return {string}
		 */
		var formatLength = function(line) {
			var wgs84Sphere = new ol.Sphere(GRS80_semimajor_axis);
            // DO NOT TRANSFORM ORIGINAL LINE! Original geometry is modified
            // in place
            var wgs84line = line.clone();
            wgs84line.transform(map.getView().getProjection(), 'EPSG:4326');
            var length;
            var coordinates = wgs84line.getCoordinates();
			length = 0;
			for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
				length += wgs84Sphere.haversineDistance(coordinates[i], coordinates[i + 1]);	
			}
			var output;
			if (length > 100) {
				output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
			} else {
				output = (Math.round(length * 100) / 100) + ' ' + 'm';
			}
			return output;
		};


	

		/**
		 * format length output
		 * @param {ol.geom.Polygon} polygon
		 * @return {string}
		 */
		var formatArea = function(polygon) {
            var wgs84Sphere = new ol.Sphere(GRS80_semimajor_axis);
            var wgs84exteriorLinearRing = polygon.getLinearRing(0)
                    .clone()
                    .transform(map.getView().getProjection(), 'EPSG:4326');
            var area = Math.abs(wgs84Sphere.geodesicArea(
                    wgs84exteriorLinearRing.getCoordinates()));

			var output;
			if (area > 10000) {
				output = (Math.round(area / 1000000 * 100) / 100) +	' ' + 'km<sup>2</sup>';
			} else if (area > 100) {
				output = (Math.round(area / 100 * 100) / 100) +	' ' + 'ha';
			} else {
				output = (Math.round(area * 100) / 100) +' ' + 'm<sup>2</sup>';
			}
			return output;
			
		};
		
		
    	//delete all overlays
        this_API_CORE.RemoveAllOverlays();
    	
    	if (this_API_CORE._vectorMeasures !=null){
	    	this_API_CORE.GetMap().removeLayer(this_API_CORE._vectorMeasures);
	    	this_API_CORE._vectorMeasures.getSource().clear();
	    	this_API_CORE._vectorMeasures = null;
    	}

    	if(typeof this_API_CORE._drawElem != 'undefined') 
    		this_API_CORE.GetMap().removeInteraction(this_API_CORE._drawElem);
    	
    	
    	var source = new ol.source.Vector();

	
    	this_API_CORE._vectorMeasures = new ol.layer.Vector({
    	  type_layer: 'measures',
		  source: source,
		  style: new ol.style.Style({
		    fill: new ol.style.Fill({
		    	color:this_API_CORE.styleMeasure.geomFillColor 
		    }),
		    stroke: new ol.style.Stroke({
		      color: this_API_CORE.styleMeasure.geomEndBorderColor,
		      width: this_API_CORE.styleMeasure.geomEndBorderWidth
		    }),
		    image: new ol.style.Circle({
		      radius: this_API_CORE.styleMeasure.pointerRadius,
		      stroke: new ol.style.Stroke({
		    	 color: this_API_CORE.styleMeasure.pointerBorderColor 
		      }),
		      fill: new ol.style.Fill({
		        color: this_API_CORE.styleMeasure.pointerFillColor
		      })
		    })
		  })
		});
    	


		/**
		 * Currently drawed feature
		 * @type {ol.Feature}
		 */
		var sketch;
		
		/**
		 * Currently measure of drawed feature
		 * @type {ol.Feature}
		 */
		var outputMeasure="";

		  var type = (typeGeometry == 'area' ? 'Polygon' : 'LineString');
		  this_API_CORE._drawElem = new ol.interaction.Draw({
				source: source,
				type: /** @type {ol.geom.GeometryType} */ (type),
				style: new ol.style.Style({
				    fill: new ol.style.Fill({
				    	color: this_API_CORE.styleMeasure.geomEndFillColor
				}),
				stroke: new ol.style.Stroke({
				  color: this_API_CORE.styleMeasure.geomBorderColor,
				  lineDash: this_API_CORE.styleMeasure.geomLineDash,
				  width: this_API_CORE.styleMeasure.geomBorderWidth
				}),
				image: new ol.style.Circle({
				  radius: this_API_CORE.styleMeasure.pointerRadius,
				  stroke: new ol.style.Stroke({
				    color: this_API_CORE.styleMeasure.pointerBorderColor
				  }),
				  fill: new ol.style.Fill({
				    color: this_API_CORE.styleMeasure.pointerFillColor,
				      })
				    })
				  })
		  });
		  this_API_CORE.GetMap().addInteraction(this_API_CORE._drawElem);

		  this_API_CORE._drawElem.on('drawstart',
		      function(evt) {
		        // set sketch
		        sketch = evt.feature;
		        
		  }, this);
		  
		  
		  var toRad = function(num) {   return num * Math.PI / 180; }

		  this_API_CORE._drawElem.on('drawend',
		      function(evt) {
			  sketch = evt.feature;
			  var coordinate;
			  
			  var geom = (sketch.getGeometry());
			    if (geom instanceof ol.geom.Polygon) {
			    	outputMeasure = formatArea(/** @type {ol.geom.Polygon} */ (geom));
			    	var coordinates = sketch.getGeometry().getCoordinates();
				  	var coordPolygon = coordinates[0];
				  	coordinate = coordPolygon[coordPolygon.length-2];

			    } else if (geom instanceof ol.geom.LineString) {
			    	outputMeasure = formatLength( /** @type {ol.geom.LineString} */ (geom));
			    	var coordinates = sketch.getGeometry().getCoordinates();
				  	coordinate = coordinates[coordinates.length-1];
			    }
			    
			    //Show popup with measure data:
			    this_API_CORE.ShowPopup(this_API_CORE.MEASURE_TYPE, coordinate, outputMeasure);

		       // unset sketch
		        sketch = null;

	      }, this);
			
			/**
			 * handle pointer move
			 * @param {Event} evt
			 */
		  var mouseMoveHandler = function(evt) {
			  sketch = evt.feature;
			  if (sketch) {
			    
				  var coordinate;
				  
				  var geom = (sketch.getGeometry());
				    if (geom instanceof ol.geom.Polygon) {
				    	outputMeasure = formatArea(/** @type {ol.geom.Polygon} */ (geom));
				    	var coordinates = sketch.getGeometry().getCoordinates();
					  	var coordPolygon = coordinates[0];
					  	coordinate = coordPolygon[coordPolygon.length-2];

				    } else if (geom instanceof ol.geom.LineString) {
				    	outputMeasure = formatLength( /** @type {ol.geom.LineString} */ (geom));
				    	var coordinates = sketch.getGeometry().getCoordinates();
					  	coordinate = coordinates[coordinates.length-1];
				    }
			    
				    this_API_CORE.ShowPopup(this_API_CORE.MEASURE_TYPE, coordinate, outputMeasure);
				    
				
			  }
			};
		
			this_API_CORE.GetMap().addLayer(this_API_CORE._vectorMeasures);
			this_API_CORE.GetMap().getLayerGroup().getLayers().push(this_API_CORE._vectorMeasures);
			$(this_API_CORE.GetMap().getViewport()).on('mousemove', mouseMoveHandler);

    },
    
    /*
	  Function: DisableMeasures
	  
	     Disable the measure functionality over the map.
	     
	 */
    DisableMeasures: function(){
    	this_API_CORE._ExclusiveControlsDeactivation();
    	this_API_CORE.GetMap().removeInteraction(this_API_CORE._drawElem);
    },
    
    /*
	  Private Function: _disable
	  
	     Disable draw measures and bounding box interactions.
	     
	 */
    _disable: function(){
    	this_API_CORE.GetMap().removeInteraction(this_API_CORE._drawElem);
    	this_API_CORE.GetMap().removeInteraction(this_API_CORE._boundingBox);
    },
    
    /*
	  Function: DeleteSelection
	  
	     Delete all measures and vectorial layers displayed over the map.
	     
	 */
    DeleteSelection: function(){
    	this_API_CORE.isBorrado=true;
    	this_API_CORE._ExclusiveControlsActivation();
    	this_API_CORE._removeLayersGroup();
    },
    
    /*
	  Private Function: _removeLayersGroup
	  
	     Delete all measures and vectorial layers displayed over the map.
	     
	 */
    _removeLayersGroup: function(){
    	
    	this_API_CORE.RemoveAllOverlays();

// New petition to avoid removing the vectorial layer (12/07/16)    	
//    	var lengthLayers = this_API_CORE.vectorLayer.length;
//    	
//    	for (var i=0; i<lengthLayers; i++){
//    		var layer = this_API_CORE.vectorLayer[i]; 
//    		layer.getSource().clear();
//    		this_API_CORE.GetMap().removeLayer(layer);
//    	}
//    	this_API_CORE.vectorLayer = [];
    	
    	
    	var lengthSearch = this_API_CORE.searchLayer.length;
    	for (var j=0; j<lengthSearch; j++){
    		var layer = this_API_CORE.searchLayer[j];
    		layer.getSource().clear();
    		this_API_CORE.GetMap().removeLayer(layer);
    		delete this_API_CORE.searchLayer[j];
    	}
    	this_API_CORE.searchLayer = [];
    	
    	if (this_API_CORE._vectorMeasures !== null){
    		this_API_CORE._vectorMeasures.getSource().clear();
	    	this_API_CORE.GetMap().removeLayer(this_API_CORE._vectorMeasures);
	    	this_API_CORE._vectorMeasures = null;
    	}


    	this_API_CORE.GetMap().removeInteraction(this_API_CORE._drawElem);
    },
    
    /*
	  Function: SetCenter
	  
	     Set center in the coordinate pointed by the mouse click event.
	     
	 */
    SetCenter: function(){
    	this_API_CORE.isCenter = true;
    },
    
    /*
	  Function: DisableSetCenter
	  
	     Disable the Set center functionality.
	     
	 */
    DisableSetCenter: function(){
    	this_API_CORE.isCenter = false;
    },
    
    /*
	  Private Function: _StyleMeasure
	  
	     Style structure to perform a new style for measure geometries (line and area) and associated popups
	     
	     Parameters:
	     	- geomBorderColor: border color for geometry (line or area) while it is been drawing. 
			- geomFillColor: color for fill area geometry while it is been drawing. Following format is required 'rgba(red,green,blue,opacity)'. Eg: 'rgba(0,132,159,0.3)'.
			- geomLineDash: line dash for geometry, until it is finished of drawing. It is represented by a vector with two elements: [5,5] or [10,10] or [] for continuous line.  
			- geomBorderWidth: line border width for geometry while it is been drawing.
			- pointerRadius: pointer radius. Pointer is the circle image is used to draw geometry. 
			- pointerBorderColor: pointer border color.
			- pointerFillColor: pointer fill color.
			- geomEndBorderColor: border color for geometry (line or area) once it is finished. 
			- geomEndFillColor: color for fill area geometry once it is finished. Following format is required 'rgba(red,green,blue,opacity)'. Eg: 'rgba(0,132,159,0.3)'.
			- geomEndBorderWidth: line border width for geometry once it is finished.
			- popupBorderColor: border color for measure popup.
			- popupFontColor: font color for measure popup.
			- popupFontSize: font size for measure popup.
			- popupfontFamily: font family for measure popup.
			- popupWidth: width of measure popup.    	
    	  Returns:
    		Style structure for measure geometries and associated popups
	     
	 */
    _StyleMeasure: function(geomBorderColor, 
    						geomFillColor, 
    						geomLineDash, 
    						geomBorderWidth, 
    						pointerRadius, 
    						pointerBorderColor, 
    						pointerFillColor,
    						geomEndBorderColor,
    						geomEndFillColor,
    						geomEndBorderWidth,
    						popupMeasureBorderColor,
    						popupMeasureFontColor,
    						popupMeasureFontSize,
    						popupMeasurefontFamily,
    						popupMeasureWidth){
    	
    	var geomBorderColorDefault = "rgb(81, 130, 255)";//"#00849F";
    	var geomFillColorDefault = "rgba(81, 130, 255,0.4)";//"rgba(0,132,159,0.3)";
    	var geomLineDashDefault =[10,10];// [];
    	var geomBorderWidthDefault =1//; 3;
    	var pointerRadiusDefault =5;//6;
    	var pointerBorderColorDefault = "rgb(81, 130, 255)";//;"#00849F";  
    	var pointerFillColorDefault = "rgba(81, 130, 255,0.4)";//"#00849F";
    	var geomEndBorderColorDefault = "rgb(81, 130, 255)";//"#00849F"; 
    	var geomEndFillColorDefault ="rgba(81, 130, 255,0.4)";//"rgba(0,132,159,0.3)";
    	var geomEndBorderWidthDefault = 1;//3;
    	var popupBorderColorDefault = "rgb(81, 130, 255)";//"#00849F"; 
    	var popupFontColorDefault = "rgb(80,80,80)";//"#6e6e6e";
    	var popupFontSizeDefault ="11px";//"12px"; 
    	var popupfontFamilyDefault = "Verdana";//"monospace";
    	var popupWidthDefault = "150px";
    	
		//    	('SetStyleMeasure','rgb(81, 130, 255)','rgba(81, 130, 255,0.4)',[10,10],'1','5','rgb(81, 130, 255)','rgba(81, 130, 255,0.4)','rgb(81, 130, 255)','rgba(81, 130, 255,0.4)','1',
		//    			'rgb(81, 130, 255)','rgb(80,80,80)','11px','Verdana');
			
    	if (geomBorderColor){
    		geomBorderColorDefault = geomBorderColor;
    	}
    	if (geomFillColor){
    		geomFillColorDefault = geomFillColor;
    	}
    	if (geomLineDash){
    		geomLineDashDefault = geomLineDash;
    	}
    	if (geomBorderWidth){
    		geomBorderWidthDefault = geomBorderWidth;
    	}
    	if (pointerRadius){
    		pointerRadiusDefault = pointerRadius;
    	}
    	if (pointerBorderColor){
    		pointerBorderColorDefault = pointerBorderColor;
    	}
    	if (pointerFillColor){
    		pointerFillColorDefault = pointerFillColor;
    	}
    	if (geomEndBorderColor){
    		geomEndBorderColorDefault = geomEndBorderColor;
    	}
    	if (geomEndFillColor){
    		geomEndFillColorDefault = geomEndFillColor;
    	}
    	if (geomEndBorderWidth){
    		geomEndBorderWidthDefault = geomEndBorderWidth;
    	}
    	if (popupMeasureBorderColor){
    		popupBorderColorDefault = popupMeasureBorderColor;
    	}
    	if (popupMeasureFontColor){
    		popupFontColorDefault = popupMeasureFontColor;
    	}
    	if (popupMeasureFontSize){
    		popupFontSizeDefault = popupMeasureFontSize;
    	}
    	if (popupMeasurefontFamily){
    		popupfontFamilyDefault = popupMeasurefontFamily;
    	}
    	if (popupMeasureWidth){
    		popupWidthDefault = popupMeasureWidth;
    	}

    	return{
    		
    		geomBorderColor: geomBorderColorDefault, 
			geomFillColor: geomFillColorDefault, 
			geomLineDash: geomLineDashDefault, 
			geomBorderWidth: geomBorderWidthDefault, 
			pointerRadius: pointerRadiusDefault, 
			pointerBorderColor: pointerBorderColorDefault, 
			pointerFillColor: pointerFillColorDefault,
			geomEndBorderColor: geomEndBorderColorDefault,
			geomEndFillColor: geomEndFillColorDefault,
			geomEndBorderWidth: geomEndBorderWidthDefault,
			popupBorderColor: popupBorderColorDefault,
			popupFontColor: popupFontColorDefault,
			popupFontSize: popupFontSizeDefault,
			popupfontFamily: popupfontFamilyDefault,
			popupWidth: popupWidthDefault
    	};
    },
    
    /*
	  Function: SetStyleMeasure
	  
	     Set new values (see input parameters) to perform a new style for measure geometries (line and area) and associated popups.
	     
	     Parameters:
	     	- geomBorderColor: border color for geometry (line or area) while it is been drawing. 
			- geomFillColor: color for fill area geometry while it is been drawing. Following format is required 'rgba(red,green,blue,opacity)'. Eg: 'rgba(0,132,159,0.3)'.
			- geomLineDash: line dash for geometry, until it is finished of drawing. It is represented by a vector with two elements: [5,5] or [10,10] or [] for continuous line.  
			- geomBorderWidth: line border width for geometry while it is been drawing.
			- pointerRadius: pointer radius. Pointer is the circle image is used to draw geometry. 
			- pointerBorderColor: pointer border color.
			- pointerFillColor: pointer fill color.
			- geomEndBorderColor: border color for geometry (line or area) once it is finished. 
			- geomEndFillColor: color for fill area geometry once it is finished. Following format is required 'rgba(red,green,blue,opacity)'. Eg: 'rgba(0,132,159,0.3)'.
			- geomEndBorderWidth: line border width for geometry once it is finished.
			- popupBorderColor: border color for measure popup.
			- popupFontColor: font color for measure popup.
			- popupFontSize: font size for measure popup.
			- popupfontFamily: font family for measure popup.
			- popupWidth: width of measure popup.   
	     
	 */
    
    SetStyleMeasure: function(	geomBorderColor, 
								geomFillColor, 
								geomLineDash, 
								geomBorderWidth, 
								pointerRadius, 
								pointerBorderColor, 
								pointerFillColor,
								geomEndBorderColor,
								geomEndFillColor,
								geomEndBorderWidth,
								popupBorderColor,
								popupFontColor,
								popupFontSize,
								popupfontFamily,
								popupWidth){
    	var styleMeasure = this_API_CORE._StyleMeasure(geomBorderColor, 
														geomFillColor, 
														geomLineDash, 
														geomBorderWidth, 
														pointerRadius, 
														pointerBorderColor, 
														pointerFillColor,
														geomEndBorderColor,
														geomEndFillColor,
														geomEndBorderWidth,
														popupBorderColor,
														popupFontColor,
														popupFontSize,
														popupfontFamily,
														popupWidth);
    	this_API_CORE.styleMeasure = styleMeasure;
    },
    
    /*
	  Private Function: _StylePopupFeature
	  
	     Style structure for performing vectorial feature popups.
	     
	     Parameters:
	     	- popupBorderColor: color border popup.
  			- popupFontColor: font color popup.
  			- popupFontSize: font size popup.
  			- popupfontFamily: font family popup.
  			- popupWidth: popup width.
  			
  		Returns:
  			Style structure for vectorial feature popups
	     
	 */
    _StylePopupFeature: function(popupBorderColor,
								popupFontColor,
								popupFontSize,
								popupfontFamily,
								popupWidth){
    	var popupBorderColorDefault = "rgba(0, 132, 159, 1)"; 
    	var popupFontColorDefault = "rgba(110, 110, 110, 1)";
    	var popupFontSizeDefault ="12px"; 
    	var popupfontFamilyDefault = "monospace";
    	var popupWidthDefault = "300px";

    	if (popupBorderColor){
    		popupBorderColorDefault = popupBorderColor;
    	}
    	if (popupFontColor){
    		popupFontColorDefault = popupFontColor;
    	}
    	if (popupFontSize){
    		popupFontSizeDefault = popupFontSize;
    	}
    	if (popupfontFamily){
    		popupfontFamilyDefault = popupfontFamily;
    	}
    	if (popupWidth){
    		popupWidthDefault = popupWidth;
    	}

    	return{
			popupBorderColor: popupBorderColorDefault,
			popupFontColor: popupFontColorDefault,
			popupFontSize: popupFontSizeDefault,
			popupfontFamily: popupfontFamilyDefault,
			popupWidth: popupWidthDefault
    	};
    },
    
    /*
	  Function: SetStyleFeaturePopup
	  
	     Set new values (see input parameters) to perform a new style for vectorial features popups.
	     
	     Parameters:
	     	- popupBorderColor: color border popup.
  			- popupFontColor: font color popup.
  			- popupFontSize: font size popup.
  			- popupfontFamily: font family popup.
  			- popupWidth: popup width.
	     
	 */
  
	  SetStyleFeaturePopup: function(
			                        popupBorderColor,
									popupFontColor,
									popupFontSize,
									popupfontFamily,
									popupWidth){
	  		var styleFeature = this_API_CORE._StylePopupFeature(popupBorderColor,
					popupFontColor,
					popupFontSize,
					popupfontFamily,
					popupWidth);
	  		this_API_CORE.styleFeature = styleFeature;
	  },
	  
	
	  /*
	  Function: ShowPopup
	  
	     Show popup with the information.
	     
	     Parameters:
	     	- popupType: information or measure popup.
  			- popupPosition: position popup.
  			- popupInfo: content popup.
	 */
	  ShowPopup:function (popupType, popupPosition, popupInfo){
		  
	
		  
		  //Styles: depends on popupType:
		  var pBorderColor="";
		  var pFontColor="";
		  var pFontSize="";
		  var pFontFamily="";
		  var pWidth="";
		  
		  if(popupType==this_API_CORE.INFO_TYPE){
			  pBorderColor=this_API_CORE.styleFeature.popupBorderColor;
			  pFontColor=this_API_CORE.styleFeature.popupFontColor;
			  pFontSize=this_API_CORE.styleFeature.popupFontSize;
			  pFontFamily=this_API_CORE.styleFeature.popupfontFamily;
			  pWidth=this_API_CORE.styleFeature.popupWidth;
		  }else{
			  pBorderColor=this_API_CORE.styleMeasure.popupBorderColor;
			  pFontColor=this_API_CORE.styleMeasure.popupFontColor;
			  pFontSize=this_API_CORE.styleMeasure.popupFontSize;
			  pFontFamily=this_API_CORE.styleMeasure.popupfontFamily;
			  pWidth=this_API_CORE.styleMeasure.popupWidth;
		  }
		  
                        
					    //Create elements for info popup
				       var popupContainer = document.createElement('div');
				        popupContainer.id=popupType;
				        popupContainer.className="apiIgn-" + popupType;
		

				       
				       var popupArrow = document.createElement('div');
				       popupArrow.id="info-popup-arrow";
				       popupArrow.className="apiIgn-info-popup-arrow";
				       
				        var popupContent = document.createElement('div');
				        popupContent.id="info-popup-content";
				        popupContent.className="apiIgn-info-popup-content";
				        var popupCloser = document.createElement('a');
				        popupCloser.id="info-popup-closer";
				        popupCloser.className="apiIgn-info-popup-closer";
				        popupCloser.href="#";
				        
				        popupContainer.appendChild(popupCloser);
				        popupContainer.appendChild(popupArrow);
				        popupContainer.appendChild(popupContent);
				        
				        //Default 
				        if(($.apiVisualizador== undefined) || !$.apiVisualizador.isMobile()){
				        
				         //in case of screen resize
				        $(".apiIgn-info-panel").remove();
				        	
                        //Add overlay
				  		 var overlayPopup = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
				  			  map: this_API_CORE.GetMap(),
							  element: popupContainer,
							  position: /** @type {ol.Coordenate} */ popupPosition,
							  positioning: "top-center",
							  stopEvent: true,
							  autoPan: true,
							  autoPanAnimation: { duration: 250 }
							}));
				  		 
				  	       this_API_CORE.GetMap().addOverlay(overlayPopup);
	
				  	       //Add styles to popup
					  	  $(  '.apiIgn-' + popupType ).css({
					  		"min-width" : pWidth,
					  		"width" : "auto",
					  		"max-height" : $(window).height() / 2 - 20,
					  		"max-width" : $(window).width()/3,
					  		"border-color":pBorderColor,
		                    "font-size":pFontSize,
		                    "color":pFontColor,
		                    "font-family":pFontFamily
					  	  });
					  	  $(  '.apiIgn-info-popup-arrow' ).css({"border-top-color":pBorderColor });
					  	  
					      //Close button function
					        popupCloser.onclick = function() {
					        	overlayPopup.setPosition(undefined);
					        	popupCloser.blur();
					        	this_API_CORE.GetMap().removeOverlay(overlayPopup);
					        	  return false;
					        };
					        
				       $(  '.apiIgn-info-popup-closer' ).css({"color":pBorderColor});
						  	
					        //Add content
				        	$('#info-popup-content').append(popupInfo);
					      // popupContent.innerHTML(popupInfo);
				        	$('#info-popup-content').find( "a" ).attr("target","_blank");	
				        	$('#info-popup-content').css({"max-height": this_API_CORE.GetMap().getSize()[1] / 2 - 31, "overflow":"auto"});

				         	if(popupType==this_API_CORE.INFO_TYPE){
						 		
					 		$('.apiIgn-lyrListElem').children(".apiIgn-featInfo").hide();
					 		$('.apiIgn-lyrListElem').bind("click", function(){
						 		$(this).children().toggle();
						 			
						 	      });	
						 	}
						 	
				        	//Recalculate left position based on real with of popup
						  	var currentWitdth=   $(  '#'+popupType ).width();
						  	var newLeft = parseInt(currentWitdth) / 2;
			  	            var sLeft = "-"+newLeft+"px";
			  	            
			  	          $(  '#'+popupType  ).css({ "left":sLeft });
			  	        map.getView().setCenter(popupPosition);
				        }
				        
				        //Mobile
				        else{
				        	
				        	$(".apiIgn-info-panel").remove();
				        	
				        	if(!$(".apiIgn-cdPanel").is(":visible")){
				        		$(".apiIgn-cdPanel").addClass("is-visible");
				        		var close = "<div class='apiIgn-closer'>x</div>";
				        		$(".apiIgn-cdPanel").append(close);
				        	}

				        	var mobileInfo="<div class=\"modern-skin apiIgn-info-panel\">"+
				        	               	"<span style='width:100%;'>Informaci&oacute;n disponible:</span><br/>"+
				        	               "</div>";
			        		$(".apiIgn-cdPanel").append(mobileInfo);

			        		$('.apiIgn-info-panel').append(popupInfo);

							$(".apiIgn-closer").on("click", function(){
								$(".apiIgn-cdPanel").removeClass("is-visible");
								$(".apiIgn-closer").remove();
							});
							$('.apiIgn-info-panel .apiIgn-featInfo .closeInfo').each(function (index) { 			  
							   $(this).bind("click", function(){
							     $(this).parent().parent().css("border","none");
					        	 $(this).parent().parent().html("");
					        	  return;
					           });
							   
                            });
				        	
				        } //end choose mobile or not
			  	  
				        

	  },//end showPopup
	  
	
	  /*
	  Function: RemovePopup
	  
	     Remove popup.
	     
	     Parameters:
	     	- popupToRemove: popup to remove.    
	 */
	  
	  RemovePopup:function(popupToRemove){
		    this_API_CORE.GetMap().removeOverlay(popupToRemove);
	  },
	  
	  
	  /*
	  Function: RemoveInfoPopups
	  
	     Remove information of the popup.     
	 */
	  
	  RemoveInfoPopups:function(){
		  this_API_CORE.GetMap().getOverlays().getArray().slice(0).forEach(function(overlay) {
				if ($(overlay.getElement()).attr('id') === "info-popup")
					this_API_CORE.GetMap().removeOverlay(overlay);
			});
	  },
	  
	  /*
	  Function: RemoveMeasurePopups
	  
	     Remove measure of the popup.     
	 */
	  RemoveMeasurePopups:function(){
		  this_API_CORE.GetMap().getOverlays().getArray().slice(0).forEach(function(overlay) {
				if ($(overlay.getElement()).attr('id') === "info-measure")
					this_API_CORE.GetMap().removeOverlay(overlay);
			});
	  },
	  
	  
	  /*
	  Function: RemoveAllPopups
	  
	     Remove all popups.    
	 */
	  RemoveAllPopups:function(){
		  this_API_CORE.GetMap().getOverlays().getArray().slice(0).forEach(function(overlay) {
				if ($(overlay.getElement()).attr('id') === "info-popup" || $(overlay.getElement()).attr('id') === "info-measure")
					this_API_CORE.GetMap().removeOverlay(overlay);
			});
	  },
	  
	  /*
	  Function: RemoveAllOverlays
	  
	     Remove all overlays.  
	 */
	  
	  RemoveAllOverlays:function(){
	    	this_API_CORE.GetMap().getOverlays().getArray().slice(0).forEach(function(overlay) {
	    		this_API_CORE.GetMap().removeOverlay(overlay);
	    	});
	  },
	  
	  
	  /*
	  Private Function: _SetInfoControl
	  
	     Set info control functionality.
	     
	     Parameters:
	     	- evt: event triggered.
	 */
	  
	  _SetInfoControl: function(evt){
	  					 
	    this_API_CORE._ExclusiveControlsActivation();
	      
        var pixel = evt.pixel;
		var infoPosition = evt.coordinate; 

  		var thereisVectorLayers = false;                   	
    	var thereisData = false;
    	var infoContent ="";
    	var infoLayers="";

  		var viewResolution =   this_API_CORE.GetMap().getView().getResolution();
  		var projectionCode =   this_API_CORE.GetMap().getView().getProjection().getCode();
  	    var counterLayer= 0;
  	    
  	    var info = [];
	  	  
	  	var totalLayersVector =0;
	  	var totalLayersOthers=0;
	  	this_API_CORE.GetMap().getLayers().forEach(function (lyr) {
	  	      if(lyr.get('visible')==true){
	  	    	    if (lyr.get('type_layer')=='vector' ){totalLayersVector=totalLayersVector+1;}
	  	    	    if (lyr.get('type_layer')=='WMS' ){totalLayersOthers=totalLayersOthers+1;}  
	  	    	 }
	  	     });
	 	  	 
        if(totalLayersVector > 0){
        	 
//          	 var pixel = evt.pixel;
          	var vectorFeaturesInfo = [];
          	vectorFeaturesInfo = this_API_CORE._GetVectorFeaturesInfo(pixel);
          	if (vectorFeaturesInfo.length>0){	
          		var totalLayerVectorInfo=1;
          		thereisData = true;
      			if(totalLayersOthers==0 ){
      				
      				for (var j = 1; j < vectorFeaturesInfo.length; j++){
      			      	if (vectorFeaturesInfo[j][0]!=vectorFeaturesInfo[j-1][0]){
      			          	totalLayerVectorInfo = totalLayerVectorInfo +1;
      			      	}
      				}
      			}
      			if(totalLayerVectorInfo==1){
						if(!(jQuery.apiVisualizador== undefined) && jQuery.apiVisualizador.isMobile()){
							info.push("<li class=\"apiIgn-lyrListElem\"><span class=\"apiIgn-infoList\">"+vectorFeaturesInfo[0][0]+"</span>");
						}
          				for (var j = 0; j < vectorFeaturesInfo.length; j++){
	          				var mobileStyle = ""
							//mobile
          					if(!(jQuery.apiVisualizador== undefined) && jQuery.apiVisualizador.isMobile()){
							var imgSrcUrl=vectorFeaturesInfo[j][2];
							//var imgSrcUrl=IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent("http://www.ign.es/ign/img/delegaciones/mapmarker.png");
	          					var textPopup = "<div class=\"apiIgn-featInfo\" style=\"float:left;clear:both;width:100%;padding:0.3em;\">"+
													"<div style=\"float:left;width:49%;\">" +
													"<img style=\"width:16px;\" src=\"" + imgSrcUrl + "\"/>" + 
													"</div>" +
													"<div  style=\"float:right;width:49%;text-align:right;\">" +
													"<a class=\"closeInfo\">X</a>" +
													"</div>"+
													"<div  style=\"float:left;clear:both;width:100%;\">"+
													vectorFeaturesInfo[j][1] +
													"</div>"+
												"</div>";
								info.push(textPopup);
	          				}
							//default
          					else{
          					info.push(
	          				"<div class=\"apiIgn-featInfo\" style=\"clear;both;float:left;width:100%;border: 1px dotted rgba(226, 226, 226, 1)!important;margin:3px auto; padding:3px!important;\">"+
	          				//"<div class=\"featInfo\" style=\"clear;both;float:left;width:auto!important;height:auto!important;max-width:100px;max-height:100px; overflow: scroll;border: 1px dotted #e2e2e2!important;margin:3px auto!important; padding:3px!important;\">"+
	      					vectorFeaturesInfo[j][1] +
	      					"</div>");
          					}
      				    }
						if(!(jQuery.apiVisualizador== undefined) && jQuery.apiVisualizador.isMobile()){
							info.push("</li>");
						}
      			}else{
	          		for (var j = 0; j < vectorFeaturesInfo.length; j++){
	          			
		              if(j>0 && vectorFeaturesInfo[j][0]!=vectorFeaturesInfo[j-1][0]){
	          				info.push("</li>");
	          			}
		
	          			if(j>0 && vectorFeaturesInfo[j][0]==vectorFeaturesInfo[j-1][0]){
						    //mobile
	          				if(!(jQuery.apiVisualizador== undefined) && jQuery.apiVisualizador.isMobile()){
							var imgSrcUrl=vectorFeaturesInfo[j][2];
								var textPopup = "<div class=\"apiIgn-featInfo\" style=\"float:left;clear:both;width:100%;padding:0.3em;\">"+
													"<div style=\"float:left;width:49%;\">" +
													"<img style=\"width:16px;\" src=\"" + imgSrcUrl + "\"/>" + 
													"</div>" +
													"<div  style=\"float:right;width:49%;text-align:right;\">" +
													"<a class=\"closeInfo\">X</a>" +
													"</div>"+
													"<div style=\"float:left;clear:both;width:100%;\">"+
													vectorFeaturesInfo[j][1] +
													"</div>"+
												"</div>";
								info.push(textPopup);
							//default		
	          				}else{
								info.push(
	              					"<div class=\"apiIgn-featInfo\" style=\"clear;both;float:left;width:100%;border: 1px dotted rgba(226, 226, 226, 1)!important;margin:3px auto; padding:3px!important;\">"+
	              					vectorFeaturesInfo[j][1] +
	              					"</div>");
	          				}
	          			}else{
	              			info.push(
	                	    		"<li class=\"apiIgn-lyrListElem\"><span class=\"apiIgn-infoList\">"+vectorFeaturesInfo[j][0]+"</span>");
	              			if(!(jQuery.apiVisualizador== undefined) && jQuery.apiVisualizador.isMobile()){
								//mobile
								var imgSrcUrl=vectorFeaturesInfo[j][2];
								var textPopup = "<div class=\"apiIgn-featInfo\" style=\"float:left;clear:both;width:100%;padding:0.3em;\">"+
													"<div style=\"float:left;width:49%;\">" +
													"<img style=\"width:16px;\" src=\"" +imgSrcUrl + "\"/>" + 
													"</div>" +
													"<div  style=\"float:right;width:49%;text-align:right;\">" +
													"<a class=\"closeInfo\">X</a>" +
													"</div>"+
													"<div style=\"float:left;clear:both;width:100%;\">"+
													vectorFeaturesInfo[j][1] +
													"</div>"+
												"</div>";
								info.push(textPopup);
	          				}else{
							//default
	          				info.push(
	              					"<div class=\"apiIgn-featInfo\" style=\"clear;both;float:left;width:100%;border: 1px dotted rgba(226, 226, 226, 1)!important;margin:3px auto; padding:3px!important;\">"+
	              					vectorFeaturesInfo[j][1] +
	              					"</div>");
	          				}
	          			}
	          		}//end for
      			}//end vector info size		
          	}//end there is vector features info
          }//end there is vector layers
	  	  
	  	this_API_CORE.GetMap().getLayers().forEach(function (lyr) {
	  									  
           if((lyr.get('visible')==true && lyr.get('type_layer')=='WMS')) {
        	   
            	   counterLayer = counterLayer + 1;
        	       var dataFormat = "";
           	       var wmsSource = lyr.getSource();  
           	       
           	       //by default text/html
               	   dataFormat="text/html";
    	           var URLInfoQuery =  wmsSource.getGetFeatureInfoUrl(evt.coordinate, viewResolution, projectionCode,{'INFO_FORMAT': dataFormat, 'FEATURE_COUNT':10});                   	        	
    	           var wmsFeaturesInfo="";
    	           var layerTitle =lyr.get('title');
    	           wmsFeaturesInfo = this_API_CORE._GetWMSInfo(URLInfoQuery,dataFormat);
    	        	
    	            //if there is some path relative in the html, dataFormat changes text/plain, because it is not possible resolve url with path relative
    	        	var containsPathRelative = "./";
    		    	if (wmsFeaturesInfo.indexOf(containsPathRelative) != -1){
    		    		dataFormat="text/plain";
    		    		var URLInfoQuery =  wmsSource.getGetFeatureInfoUrl(evt.coordinate, viewResolution, projectionCode,{'INFO_FORMAT': dataFormat, 'FEATURE_COUNT':10});
    		    	    wmsFeaturesInfo = this_API_CORE._GetWMSInfo(URLInfoQuery,dataFormat);
    		    	}

    	        	if (wmsFeaturesInfo!="" && wmsFeaturesInfo!=null && wmsFeaturesInfo!="undefined"){
        	        		thereisData=true; 
							if(!(jQuery.apiVisualizador== undefined) && jQuery.apiVisualizador.isMobile()){
									//mobile
									var imgSrcUrl=IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(IGN_URL_REPOSITORY + "/images/infoLocation.png");
									var textPopup = "<li class=\"apiIgn-lyrListElem\"><span class=\"apiIgn-infoList\">"+layerTitle+"</span>"+
													"<div class=\"apiIgn-featInfo\" style=\"float:left;clear:both;width:100%;padding:0.3em;\">"+
														"<div style=\"float:left;width:49%;\">" +
														"<img style=\"width:16px;\" src=\"" +imgSrcUrl + "\"/>" + 
														"</div>" +
														"<div  style=\"float:right;width:49%;text-align:right;\">" +
														"<a class=\"closeInfo\">X</a>" +
														"</div>"+
														"<div style=\"float:left;clear:both;width:100%;\">"+
														wmsFeaturesInfo +
														"</div>"+
													"</div>"+
													"</li>";
									info.push(textPopup);
							}else{							
								//default
								info.push(
										"<li class=\"apiIgn-lyrListElem\"><span>"+layerTitle+"</span>"+
										"<div class=\"apiIgn-featInfo\" style=\"clear;both;float:left;width:100%;border: 1px dotted rgba(226, 226, 226, 1)!important;margin:3px auto!important; padding:3px!important;\">"+
										 wmsFeaturesInfo +
										"</div></li>");
							}
            	    }                   	                    

           	 }     //wms
               
             if((lyr.get('visible')==true && lyr.get('type_layer')=='vector')) {
            	thereisVectorLayers = true;
             }		                           
	  	 }); // all layers
	  	

         
         if (thereisData==false){
		 
		    
			 if(!(jQuery.apiVisualizador== undefined) && jQuery.apiVisualizador.isMobile()){
									//mobile
									var imgSrcUrl=IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(IGN_URL_REPOSITORY + "/images/infoNoInfo.png");
									var textPopup = "<ul id=\"lryList\"><li class=\"apiIgn-lyrListElem\"><span class=\"apiIgn-infoList\">Sin informaci&oacute;n</span>"+
													"<div class=\"apiIgn-featInfo\" style=\"float:left;clear:both;width:100%;padding:0.3em;\">"+
														"<div style=\"float:left;width:49%;\">" +
														"<img style=\"width:16px;\" src=\"" +imgSrcUrl + "\"/>" + 
														"</div>" +
														"<div  style=\"float:right;width:49%;text-align:right;\">" +
														"<a class=\"closeInfo\">X</a>" +
														"</div>"+
														"<div style=\"float:left;clear:both;width:100%;\">"+
														i18n.t("No info")+
														"</div>"+
													"</div>"+
													"</li></ul>";
									info.push(textPopup);
							}else{							
								//default
								info.push( i18n.t("No info"));
							}
		  
        	 
             this_API_CORE.RemoveInfoPopups();
             this_API_CORE.ShowPopup(this_API_CORE.INFO_TYPE, infoPosition,info);
         }else{
        	 infoContent=("<ul class=\"apiIgn-lryList\">");
             for(var k=0;k<info.length;k++){
            	infoContent = infoContent + info[k];
             }
             infoContent = infoContent + "</ul>";
             this_API_CORE.RemoveInfoPopups();
             this_API_CORE.ShowPopup(this_API_CORE.INFO_TYPE, infoPosition,infoContent);
         }
         
	  },
	
	  /*
	  Private Function: _GetVectorFeaturesInfo
	  
	     Get vector features info
	     
	     Parameters:
	     	- pixel: pixel coordinate of the feature
	     
	     Returns: vector information
	 */
	  _GetVectorFeaturesInfo:function(pixel){
            var vectorInfo = [] ;
           	var features = [];
 
           	
            this_API_CORE.GetMap().forEachFeatureAtPixel(pixel, function(feature, layer) {
          		features.push([feature, layer.get("title")]);
           	  });
           	  if (features.length > 0) {
           	    var i, ii;
           	    var layerTitle="";
           	    var img="";
           	    var imgMovil = IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(IGN_URL_REPOSITORY + "/images/infoLocation.png");
           	    var z=this_API_CORE.GetMap().getView().getZoom();

		           	 for (i = 0, ii = features.length; i < ii; ++i) {
			             var infoLine = "";
			              layerTitle = features[i][1];
						  layerTitle = layerTitle.split('/').pop();
					       layerTitle = layerTitle.split('\\').pop();
						
						  for (var j = 0; j < features[i][0].getKeys().length; j++){
							var attr =features[i][0].getKeys()[j];
							
							///////////Features Cluster Icon////////////
							if (attr == "features"){
//								 features[i][0].forEach(function (ff) {
									 features[i].forEach(function (ff2) {
						 	             try{
								 	          var featuresInCluster = [];
								 	          var lengthfeaturesInCluster = ff2.get('features').length;
								 	          
								 	          if(lengthfeaturesInCluster==1){
								 	        	  
									 	          featuresInCluster = ff2.get('features'); 
									 	          for (var k = 0; k < lengthfeaturesInCluster; k++){
											 	      var descriptionFeature = featuresInCluster[k].get('description');
											 	      //In a JSON file, the desccription field may be empty, in that case we display a list of the fields.
											 	      if(descriptionFeature !== undefined){
											 	    	  infoLine = infoLine + "<span class='apiIgn-description'>" + descriptionFeature + "</span><br/>";							 
											 	      }
											 	      else{
											 	    	  properties=featuresInCluster[k].getKeys();
											 	    	  for(var l=0; l<properties.length;l++){
											 	    		  var property = properties[l];
											 	    		  attrFeature= featuresInCluster[k].get(property);
											 	    		  if(property!=="geometry" && property!=="Style" && property!=="style" && property!=="styleUrl" && property!=="style Hash"){
											 	    			 if(property.toLowerCase()=="name" || property.toLowerCase()=="description"){
																		infoLine = "<span class='apiIgn-" + property + "'>" + attrFeature + "<br/></span>";
																}else{
											 	    			  infoLine = infoLine + "<span class='apiIgn-" + property + "'>" + attrFeature + "<br/></span>";							 
											 	    		  }
											 	    	}
											 	      }
											 	  }
									 	          if(featuresInCluster[0].getStyle().length == undefined){
									 	        	 imgMovil=featuresInCluster[0].getStyle().getImage().getSrc();
									 	          }
									 	          else{
									 	        	 imgMovil = IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(IGN_URL_REPOSITORY + "/images/infoLocation.png");
									 	          }
									 	          }
									 	        }else{
									 	        	
									 	           featuresInCluster = ff2.get('features'); 
									 	           //for (var k = 0; k < lengthfeaturesInCluster; k++){
									 	           		//var nameFeature = featuresInCluster[0].get('name');
									 	           		//var descriptionFeature = featuresInCluster[0].get('description');
									 	           		//infoLine = infoLine + "<span>" + nameFeature + "</span><br/>";
									 	           		//infoLine = infoLine + "<span>" + descriptionFeature + "</span><br/>";		
												 	      
												 		 this_API_CORE.GetMap().getView().setCenter(ff2.getGeometry().getCoordinates());
												 		 //alert(this_API_CORE.GetMap().getView().getZoom());
												 		 
												 		 
												 		if(lengthfeaturesInCluster>2){
												 		 this_API_CORE.GetMap().getView().setZoom(z+3);
												 		} else{
													 		 this_API_CORE.GetMap().getView().setZoom(z+4);
												 		 }
												 		 
												 		 infoLine="Haga click en el icono que desea obtener la informaci&oacute;n";
												 		 imgMovil = IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(IGN_URL_REPOSITORY + "/images/infoCluster.png");
												 		 //alert(this_API_CORE.GetMap().getView().getZoom());
												 		 //this_API_CORE.GetMap().getView().setCenter( pixel);
												 		 //this_API_CORE.GetMap().getView().setZoom(13);
											 	       //  }
									 	        	
												 	//var view = this_API_CORE.GetMap().getView()
												 	//var coords = pixel;
												 	//var resolution = view.getResolution();    
												 	//var projection = view.getProjection();
												 	//var resolutionAtCoords = projection.getPointResolution(resolution, coords);									 	        	
												 	//alert(resolutionAtCoords);
									 	        	//alert(ff2.getGeometry().getExtent());
									 	        	//var c = v.constrainResolution(ff2.getExtent());
												 	//this_API_CORE.GetMap().getView().getZoom(c);	 
												 	//map.getView().fitExtent(ff2.getExtent());									 	        	
												 	//var boxExtent = ff2.getGeometry().getExtent();
												 	//this_API_CORE.GetMap().getView().fit(boxExtent,this_API_CORE.GetMap().getSize());
												 	//this_API_CORE.GetMap().getView().setZoom(6);
												 	//this_API_CORE.GetMap().getView().fitExtent(boxExtent);									 	        	
									 	        	//zoom to sigle features
												 	//this_API_CORE.GetMap().getView().setZoom(6);
												 	//var boxExtent = ff.getExtent();
												 	//this_API_CORE.GetMap().getView().fit(boxExtent,this_API_CORE.GetMap().getSize());
												 	//vectorInfo="";
									 	        }
						 	             }catch(e) {}
						 	         });  
//						       	  });
								 
							}						
							///////////End Features Cluster Icon////////////
							
							else{
								if(attr!=="geometry" && attr!=="Style" && attr!=="style" && attr!=="styleUrl" && attr!=="style Hash"){

										var value =features[i][0].get(attr);
										if(attr.toLowerCase()=="name" || attr.toLowerCase()=="description"){
												infoLine = "<span class='apiIgn-" + attr + "'>" + value + "<br/></span>";
										}else{
											infoLine = infoLine + "<span class='apiIgn-" + attr + "'>" + value + "<br/></span>";							 
								        }
										if(features[i][0].getStyle().length == undefined){
											imgMovil= features[i][0].getStyle().getImage().getSrc();
									}
								}
						  	}
                            }
					vectorInfo.push([layerTitle,infoLine,imgMovil]);
					imgMovil = IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(IGN_URL_REPOSITORY + "/images/infoLocation.png");
      	    }
           	    
           	  }
			
           	  return vectorInfo;
           	  
		},//end vector info

/*
Function: DeactivateInfoControl
		  
    Deactivate information control.
*/

  DeactivateInfoControl: function(){
	  	this_API_CORE.isInfo = false;
	    this_API_CORE.RemoveInfoPopups();
 },
 
 /*
 Function: DeactivateZoomBoxControl
 	Deactivate zoom box control.
  
*/
 DeactivateZoomBoxControl: function(){
		this_API_CORE.isZoomBox=false;
		  $('.apiIgn-ZB').removeClass('selected');
		  $('.apiIgn-ZB').addClass('ol-unselectable');
		  this_API_CORE.GetMap().removeInteraction(this_API_CORE._boundingBox);
},
  
/*
Private Function: _ExclusiveControlsDeactivation
 	Deactivation controls included in Control Panel.     
 
*/
_ExclusiveControlsDeactivation:function(){

	 
	 if(this_API_CORE.options.defaultTools ){
			//Control panel:
		   $('.apiIgn .apiIgn-toolsPanelBox').removeClass( 'active' );
			this_Control_Panel.disableCenter = false;
			this_Control_Panel.disableLineal = false;
			this_Control_Panel.disablePoligonal = false;
			this_Control_Panel.disableBorrado = false;
	 }
	this_API_CORE.isPolygonalMeasure=false;
	this_API_CORE.isLinealMeasure=false;
	this_API_CORE.isCenter=false;
	this_API_CORE.isBorrado=false;
	this_API_CORE.isInfo = true;

    //remove interactions
	  this_API_CORE.GetMap().removeInteraction(this_API_CORE._drawElem);
	  
},


/*
Private Function: _ExclusiveControlsActivation

Activate controls included in Control Panel 
 
*/
_ExclusiveControlsActivation:function(){
	 
  		if (this_API_CORE.isLinealMeasure){
  			this_API_CORE._ExclusiveControlsDeactivation();
	  		this_API_CORE.DeactivateInfoControl();
	  		this_API_CORE.DeactivateZoomBoxControl();
	  		if(this_API_CORE.options.defaultTools ){
	  			this_Control_Panel.disableLineal = true;
	  		    $('.apiIgn-toolDistLineal').addClass('active');	 	
	  		}
	  		this_API_CORE._draw("linea");
	  		this_API_CORE.isInfo = false;
  		}
	  	
  		else if (this_API_CORE.isPolygonalMeasure){
  			this_API_CORE._ExclusiveControlsDeactivation();
	  		this_API_CORE.DeactivateInfoControl();
	  		this_API_CORE.DeactivateZoomBoxControl();
	  		if(this_API_CORE.options.defaultTools ){
	  		    this_Control_Panel.disablePoligonal = true;
	  		   $('.apiIgn-toolDistPoligonal').addClass('active');	 
	  		 }
	  		
	  		  this_API_CORE._draw("area");
	  		  this_API_CORE.isInfo = false;
 		}
  		
  		else if (this_API_CORE.isBorrado){
  			this_API_CORE._ExclusiveControlsDeactivation();
  			this_API_CORE._removeLayersGroup();
 		}
  		
	  	if (this_API_CORE.isCenter){
	  		this_API_CORE._ExclusiveControlsDeactivation();
	  		this_API_CORE.DeactivateInfoControl();
	  		if(this_API_CORE.options.defaultTools ){
	  		    this_Control_Panel.disableCenter=true;
	  		   $('.apiIgn-toolSetCenter').addClass('active');	 
	  		 }
	  		this_API_CORE.isCenter=true;
	  		
	  	}

	  	else if(this_API_CORE.isInfo){	  	   	    
	        this_API_CORE._ExclusiveControlsDeactivation();
	  		this_API_CORE.isInfo = true;
	  	}
},	  


/*
Private Function: _GetWMSInfo

   Get WMS info
   
   Parameters:
   	- infoQuery: query
   	- infoFormat: text/plain (default) or text/html
   	
   	Returns: info from WMS feature into info format parameter
*/

_GetWMSInfo:function(infoQuery,infoFormat){

//infoFormat has tow values: text/html> (default) or text/plain
var resultData ='<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"></head><body>'+ i18n.t("No info")+'</body></html>';
var thereIsInfo= false;
var pos = [];     
		$.ajax({    			  
			url: IGN_URL_REPOSITORY + "/proxyRedirect.do?url="+encodeURIComponent(infoQuery),
		      dataType: "html",
		      success: function( data, textStatus, jqXHR) {
		    	  
		    	
		    	  if(infoFormat=="text/plain"){
		    		  
			    		  if ( data.toUpperCase().indexOf( "SERVICEEXCEPTIONREPORT" )<0){
			    			  thereIsInfo = true;
			    		  }
			    		  
			    		  if(data.toUpperCase().indexOf( "NO FEATURES" )>=0){
			    			  thereIsInfo=false;
			    		  }
			    		  
			    		  if(thereIsInfo){
			    			  resultData ='<html><head><meta content="text/html; charset=ISO-8859-1" http-equiv="content-type"></head><body>'+
			    			                       '<pre style=\"word-wrap: break-word; white-space: pre-wrap;\'">'+data+'</pre>'+
			    			                       '</body></html>';
			    				   
			    		  }

		    	  }
		    	  
		    	  else if(infoFormat=="text/html"){
		    		  
					      var html = $.parseHTML(data);
						      
						      $.each( html, function( i, el ) {
		
						    	  if( el.nodeName !="STYLE" && el.nodeName !="TITLE" && el.nodeName !="META"){
						    		  if(el.textContent!=undefined && el.textContent.trim()!=""  && el.childElementCount > 0){
						    			  thereIsInfo = true;
						    		  }
						    	  }
						    	 
						  	});
						      
						      //Remove scripts from features info 
						      while (data.indexOf("<SCRIPT") > 0){
						    	  var indexStart = data.indexOf("<SCRIPT");
						    	  var indexEnd = data.indexOf("</SCRIPT>");
						    	  var newDataStart = data.slice(0,indexStart);
						    	  var newDataEnd = data.slice(indexEnd+9,data.length-1);
						    	  data = newDataStart + newDataEnd;
						      }
						      
						      while (data.indexOf("<script") > 0){
						    	  var indexStart = data.indexOf("<script");
						    	  var indexEnd = data.indexOf("</script>");
						    	  var newDataStart = data.slice(0,indexStart);
						    	  var newDataEnd = data.slice(indexEnd+9,data.length-1);
						    	  data = newDataStart + newDataEnd;
						      }
						      
						    if (thereIsInfo && data.toUpperCase().indexOf( "SERVICEEXCEPTIONREPORT" )>0){
						    	thereIsInfo=false;
						    }
						    
						    if(thereIsInfo){
					    		  resultData = data;
					    	  }
		    		  
		    	  }
				      
				      return resultData;
		      },
		      error: function(jqXHR, textStatus, errorThrown){ 
		    	      resultData = "<span>Service error</span>";
		    	      return resultData;
		      },
		      async: false
		  });
return  resultData;
},

get_: function (url, callback) {
	  var client = new XMLHttpRequest();
	  client.open('GET', url);
	  client.onload = function() {
	    callback(client.responseText, client.status);
	  };
	  client.onerror = function() {
	    callback(client.statusText, client.status);
	  };
	  client.send();
	},
	


	
/////////////////Add WMS and WMTS Layers///////////////////////////////// 
    /*
	  Function: AddWMSLayers
	  
	     Show WMS layers
	     
	     Parameters:
	     	- wmsLayer: url of wms Layer.    
	 */
	AddWMSLayers: function(wmsLayer){

    	var cap = "?service=WMS&request=GetCapabilities&version=1.1.0";
    	var wmsLayerRes = wmsLayer;
    	var length = wmsLayer.length;
    	if (wmsLayer.lastIndexOf("?") === length-1){
    		wmsLayerRes = wmsLayer.slice(0,length-1);
    	}
  	    var exist = false;
  	    
  	    var j = 0;
    	while (!exist && j< map.getLayers().getLength()){
  	    	if (map.getLayers().item(j).get("url_layer") === wmsLayerRes)
  	    		exist = true;
  	    	else
  	    		j++;
  	    }	

    	//URL not empty and valid format
    	if(!this_API_CORE._validUrl(wmsLayer)){
    		this_API_CORE._showServiceError("InvalidURL");
		    return;
    	}
  	      	    
    	//Service previously loaded
		if(exist){
			this_API_CORE._showServiceError("AlreadyLoad");
		    return;
		}

		if (!exist){
			 $.ajax({    			  
			      url: IGN_URL_REPOSITORY + "/proxyRedirect.do?url="+encodeURIComponent(wmsLayerRes+cap),
			      dataType: "text",
			      success: function( data, textStatus, jqXHR) {
			    	  
		    	  if (data.indexOf("Error") > -1){
			    		  this_API_CORE._showServiceError(data);
					    	
			    	  }else{
			    		  
				    	 var parser = new ol.format.WMSCapabilities();
				    	 parser.version="1.1.0";
				    	 
				    	  try{
				    	      var result = parser.read(data);

				    	      if (result !== null){
				    	    	  if (data.indexOf(this_API_CORE.options.SRS) >= 0 ||
	                                        data.indexOf(findCRSKeybyName(this_API_CORE.options.SRS)) >= 0) {
			    		    	  if (result.Capability){
			    		    		  
			    		    		  this_API_CORE._hideErrorPanels();

									  var str = result.Service.Title;
					    			  str = str.split('/').pop();
					    		      str = str.split('\\').pop();
										
										//mtm: capability
										var serviceCapability = result.Capability;
										var version = result.version;
										var infoFormat = "";
										
										//info format 
										if (serviceCapability.Request.GetFeatureInfo){
											var featureFormat = serviceCapability.Request.GetFeatureInfo.Format;
											infoFormat =this_API_CORE._setInfoFormat(featureFormat);
										}
										
										// Creating the layer with new properties needed in the node tree
										this_API_CORE._errorImage = "Valid";

										var layerWMS = new ol.layer.Image({
											type_layer: 'WMS',
											parentLayer: null,
											title: result.Service.Title,
											url_layer: wmsLayerRes,
											style: null,
											queryable: false,
											infoFormat: infoFormat,
											source: null,
											visible:true,
											isRoot: true
										});
								  
										// Update the property firetree of the map -> add the layer to the node tree
										map.set("fireTree", layerWMS);
										var newLayerWMS = this_API_CORE._addWMSTree(wmsLayerRes, serviceCapability.Layer, version, infoFormat, layerWMS);
										this_API_CORE._addWMS(wmsLayerRes,serviceCapability.Layer, version, infoFormat, newLayerWMS);
			    		    	  } else {
			    		    		  this_API_CORE._showServiceError("ParseCap");
						    	  }
				    	  } else {
				    	    		  this_API_CORE._showServiceError("ProjectionDifferent");
				    	    	  }
				    	  } else {
				    		  this_API_CORE._showServiceError("ParseCap");
				    	  }
			    	  }catch (err){
			    		  this_API_CORE._showServiceError("TestURL");
			    	  }
				    } 
			    	  
			      },
		      error: function(jqXHR, textStatus, errorThrown){
		    	  this_API_CORE._showServiceError(errorThrown);
		      }
		  });
		}
    },

    /*
	  Private Function: _addWMS
	  
	     Add layers WMS to build the layers tree
	     
	     Parameters:
	     	- url: url of the WMS service
	     	- serviceCapability: service Capability
	     	- version: service response version
	     	- infoFormat: info format feature
	     	- parentLayer: parent layer
	 */
    _addWMS: function(url, serviceCapability, version, infoFormat, parentLayer){

    	if (serviceCapability != null){
    		    //several layers
	    		if (serviceCapability.Layer && serviceCapability.Layer.length > 0){
	    			for (var i =0; i < serviceCapability.Layer.length; i++)
	    			{
	    				serviceLayer = serviceCapability.Layer[i];
						var layerWMS = this_API_CORE._addWMSTree(url, serviceLayer, version,  infoFormat, parentLayer);
	    				this_API_CORE._addWMS(url, serviceLayer, version,  infoFormat, layerWMS);
	    			}
	    		}
	    		//one layer
	    		else{
					return;
	    		}
    	}
        else {return;}
    },
    
    /*
	  Private Function: _addWMSTree
	  
	     Add layer WMS. This function is called recursively to build the tree layers
	     
	     Parameters:
	     	- url: url of the WMS service.
	     	- serviceLayer: service Capability
	     	- version: service response version
	     	- infoFormat: info format feature 
	     	- parentLayer: parent layer
	     Returns:
	     	Layer WMS to be added 
	 */
    _addWMSTree:function(url, serviceLayer, version, infoFormat, parentLayer){
    	
    	var layerWMS = null;
    	var queryable=false;
		var title = serviceLayer.Title;
		var str = title;
		str = str.split('/').pop();
	    str = str.split('\\').pop();
	      
		var style = "default";
		if (serviceLayer.Style != null){
			if (serviceLayer.Style.length > 0)
				style =serviceLayer.Style[0].Name;
			else
				style = serviceLayer.Style.Name;
		}
		
		var styles = [];
		if (serviceLayer.Style != null){
			if (serviceLayer.Style.length > 0){
				for (var j= 0; j < serviceLayer.Style.length; j++){
					styles[j] = serviceLayer.Style[j];	
				}
			}
			else
				styles[0] = serviceLayer.Style;
		}	    				
		
		//Si la capa es de ultimo nivel (capa de datos)
		if (typeof serviceLayer.Name !== "undefined"){
			isFolder = false;
		}else{ //Capa contenedora de otras capas
			isFolder=true;
		}
		
		//Si el "title" es nulo, ense�amos en el IHM el "name"
		if(title== null || title=="undefined" || title==""){
			title=serviceLayer.Name;
		}
	
		
		if (!isFolder){ //final node with information
				var imageElement = null;
				var source= new ol.source.ImageWMS({
					ratio: 1,
					url: url,
					format: 'image/png',
					imageLoadFunction: function(image, src) {
					     imageElement = image.getImage();
					     imageElement.onload = function() {
			    			
					     };
					     imageElement.onerror = function() {
					    	 
						       $.ajax({    			  
								      url: IGN_URL_REPOSITORY + "/proxyRedirect.do?url="+encodeURIComponent(src),
								      dataType: "text",
								      success: function( data, textStatus, jqXHR) {
									    	  console.log(data);
									    	  this_API_CORE._errorImage = "Error";
								    		
									    		var xml = $.parseXML(data);
									    		if (xml != null && xml != 'undefined'){
										    	    var x = xml.getElementsByTagName('ServiceException')[0];
										    	    var y = x.childNodes[0];
										    		this_API_CORE._showServiceError("Error in layer " + title + " : " + y.nodeValue);
									    		} else {
									    			this_API_CORE._showServiceError("Error loading layer " + title);
									    		}
								      },
								      error: function(jqXHR, textStatus, errorThrown){
								    	  this_API_CORE._showServiceError(errorThrown);
								          console.log( textStatus);
								      }
								  });
						       	 
						     };
					     imageElement.src = src;
					   },
					params: {'LAYERS': serviceLayer.Name, 'STYLES': style, "EXCEPTIONS":"XML"}
				});
		    				
				var indFirstDig = version.indexOf(".");
				var firstDig = version.substring(0, indFirstDig);
				var indSecDig = version.lastIndexOf(".");
				var secDig = version.substring(indFirstDig+1, indSecDig);
	            var projectionCode = this_API_CORE.options.SRS;
				if (parseInt(firstDig) < 1 || (parseInt(firstDig) === 1 && parseInt(secDig) < 3)){
					source.updateParams({'VERSION': version, 'SRS': projectionCode});
			}

			queryable = serviceLayer.queryable;
		
			var style = "default";
			if (serviceLayer.Style != null){
				if (serviceLayer.Style.length > 0)
					style =serviceLayer.Style[0].Name;
				else
					style = serviceLayer.Style.Name;
			  }
			// Creating the layer with new properties needed in the node tree
			layerWMS = new ol.layer.Image({
				type_layer: 'WMS',
				parentLayer: parentLayer,
				title: serviceLayer.Title,
				name: serviceLayer.Name,
//				extent: map.getView().calculateExtent(map.getSize()),
				url_layer: url,
				style: style,
				styles: styles,
				queryable: queryable,
				infoFormat: infoFormat,
				source: source,
				visible:true,
				isFolder: isFolder,
				version: version,
				isRoot: false
			});
			map.addLayer(layerWMS);
		} else { //folder node
			// Creating the layer with new properties needed in the node tree
			 layerWMS = new ol.layer.Image({
					type_layer: 'WMS',
					parentLayer: parentLayer,
					title: serviceLayer.Title,
					url_layer: url,
					style:null,
					styles: null,
					queryable: queryable,
					infoFormat: infoFormat,
					source: null,
					visible:true,
					isFolder: isFolder,
					version:version,
					isRoot: false
				});
		}
		// Update the property firetree of the map -> add the layer to the node tree
		map.set("fireTree", layerWMS);
		return layerWMS;
	    	  
    },
	    
	    
	    //---------------------------------WMTS-----------------------------------------------------------------------------------
	    /*
		  Function: AddWMTSLayers
		  
		     Show WMTS layers
		     
		     Parameters:
		     	- wmtsLayer: url of wmts Layer.    
		 */
    	AddWMTSLayers: function(wmtsLayer){  
	    	var cap="?service=WMTS&request=GetCapabilities";
	    	var wmtsLayerRes = wmtsLayer;
	    	var length = wmtsLayer.length;
	    	var exist = false;
	    	
	    	if (wmtsLayer.lastIndexOf("?") === length-1){
	    		wmtsLayerRes = wmtsLayer.slice(0,length-1);
	    	}

	  	    var j = 0;
	    	while (!exist && j< map.getLayers().getLength()){
	  	    	if (map.getLayers().item(j).get("url_layer") === wmtsLayerRes)
	  	    		exist = true;
	  	    	else
	  	    		j++;
	  	    }	
	    	
	    	//URL not empty and valid format
	    	if(!this_API_CORE._validUrl(wmtsLayer)){
	    		this_API_CORE._showServiceError("InvalidURL");
			    return;
	    	}
	  	      	    
	    	//Service previously loaded
			if(exist){
				this_API_CORE._showServiceError("AlreadyLoad");
			    return;
			}
 
			if (!exist){
				 $.ajax({    			  
				      url: IGN_URL_REPOSITORY + "/proxyRedirect.do?url="+encodeURIComponent(wmtsLayerRes+cap),
				      dataType: "text",
				      success: function( data, textStatus, jqXHR) {
				    	  
				    	  if (data.indexOf("Error") > -1){
				    		  this_API_CORE._showServiceError(data);	
				    	  }else{
				    		  var parser = new ol.format.WMTSCapabilities();  
					    	  
				    		  try{
							    	  var result = parser.read(data);
							    	  
							    	  if (result !== null){
//							    		  var searchProjection = data.indexOf("EPSG:4258");
//							    		  var searchProjection1 = data.indexOf("EPSG::4258");
		                                    //if ((searchProjection > -1) || (searchProjection1 > -1)) {
		                                    if (data.indexOf(this_API_CORE.options.SRS) >= 0 ||
		                                        data.indexOf(findCRSKeybyName(this_API_CORE.options.SRS)) >= 0) {
						    		    	  if (result.Contents){
						    		    		  
						    		    		  this_API_CORE._hideErrorPanels();
												  
												  var str = result.ServiceIdentification.Title;
												  str = str.split('/').pop();
				    		    	              str = str.split('\\').pop();
    		    	 
												  this_API_CORE._errorImage = "Valid";
										  
												// Creating the layer with new properties needed in the node tree
												  var layerWMTS = new ol.layer.Tile({
														type_layer: 'WMTS',
														parentLayer: null,
														title: result.ServiceIdentification.Title,
														url_layer: wmtsLayerRes,
														style: null,
														queryable: false,
														source: null,
														visible:true,
														isRoot: true
													});
									  	    			
												  // Update the property firetree of the map -> add the layer to the node tree
												  map.set("fireTree", layerWMTS);
										    	  var version = result.ServiceIdentification.ServiceTypeVersion;
														
										    	  this_API_CORE._addWMTS(wmtsLayerRes, result.Contents,  version, layerWMTS);
		
						    		    	  } else {
						    		    		  this_API_CORE._showServiceError("ParseCap");
									    	  }
							    		  }else{
							    			  this_API_CORE._showServiceError("ProjectionDifferent");
							    		  }
							    	  } else {
							    		  this_API_CORE._showServiceError("ParseCap");
							    	  }
				    	  } catch(err){
				    		  this_API_CORE._showServiceError("TestURL");
				    	  }
				      }
				      },
			      error: function(jqXHR, textStatus, errorThrown){
			    	  this_API_CORE._showServiceError(errorThrown);
			      }
			  });
				
			}
		
	    },
	    
	    
	    /*
		  Private Function: _addWMTS
		  
		     Add layers WMTS
		     
		     Parameters:
		     	- url: url WMTS service
		     	- serviceContents: service WMTS Capability Contents
		     	- version: WMTS service version
		     	- parentLayer: parent layer
		 */	    
	    _addWMTS: function(url, serviceContents, version, parentLayer){
	    	
	    	if (serviceContents.Layer != null){
	    		if (serviceContents.Layer.length > 0){
	    			for (var i =0; i < serviceContents.Layer.length; i++)
	    			{
	    				var title = "";
	    				var str = "";
	    				
	    				if (serviceContents.Layer[i].Title){
		    				title = serviceContents.Layer[i].Title;
		    				str=title;
		    				str = str.split('/').pop();
		    		    	str = str.split('\\').pop();
		    		    	  
	    				} else if (serviceContents.Layer[i].Identifier){
		    				title = serviceContents.Layer[i].Identifier;
		    				str=title;
		    				str = title.split('/').pop();
		    		    	str = title.split('\\').pop();
		    			}

	    				var style = "default";
	    				if (serviceContents.Layer[i].Style != null){
	  	    				if (serviceContents.Layer[i].Style.length > 0)
	  	    					if (serviceContents.Layer[i].Style.isDefault)
	  	    						style = serviceContents.Layer[i].Style[0].Identifier;
	  	    				else
	  	    					style = serviceContents.Layer[i].Style[0].Identifier;
	  	    			}
	    				
					  	var infoFormat = "";
					  	var queryable = false;

	    				if (typeof serviceContents.Layer[i].Format !== 'undefined'){
	    					var featureFormat = serviceContents.Layer[i].Format;
                            infoFormat = this_API_CORE._setInfoFormat(featureFormat);
                            queryable = true;
	    				}
	    				
	    				
	    				
	    				//use the CRS definition to configure the WMTS options
                        //find the CRS using the SRS option
                        var crsValue = findCRSbyName(this_API_CORE.options.SRS);
                        //this will only work with tilematrixset in wich
                        //each tilematrix has the same origin
                        var tilegrid = new ol.tilegrid.WMTS({
                            "extent": [crsValue.minX, crsValue.minY, crsValue.maxX, crsValue.maxY],
                            "origin": [crsValue.minX, crsValue.maxY],
                            "resolutions": crsValue.serverResolutions,
                            "matrixIds": crsValue.matrixIds
                        });
                        var imageElement = null;
                     // Creating the layer with new properties needed in the node tree
	    				var source =  new ol.source.WMTS({
	    					url: url,
	    					tileLoadFunction: function(imageTile, src) {
	    						imageElement = imageTile.getImage();
	    						imageElement.src = src;
	    					},
				            layer: serviceContents.Layer[i].Identifier,
				            style: style,
				            matrixSet: crsValue.name,
				            wrapX: false,
				            format: 'image/png',
				            projection: crsValue.name,
				            tileGrid: tilegrid
				        });
	    				
	    				source.on('tileloaderror', function() {
	    					this_API_CORE._showServiceError("ErrorLoadLayer",title);
	    				});
	    				
                      //OMFG this is a nightmare
                        //TODO redesign ths to googlemapscompatible
	    				var layerWMTS = new ol.layer.Tile({
	    						title:title,
	    						name:serviceContents.Layer[i].Identifier, 
	    						url_layer: url,
	    						type_layer: 'WMTS',
	    						parentLayer: parentLayer,
	    						queryable: queryable,
	    						style: style,
	    						styles: [],
	    				        source: source,
	    				        visible:true,
	    				        isFolder: false,
	    				        version: version,
	    				        isRoot: false
	    				      });
	    				
	    				
	    				 map.addLayer(layerWMTS);		
	    				 map.set("fireTree", layerWMTS);
				    	  
	    			}
	    		} // end there are layers
	    		
	    	} else {
	    			return;
	    	}
	    },
/////////////////End: Add WMS and WMTS Layers////////////////////////
	    
	    
	    
	    /*
	    Function: SetExtent
	    
	       Set initial zoom extension.
	       
	       Parameters:
		     	- xmin: Bottom-left X-coordinate of an extent.
		     	- ymin: Bottom-left Y-coordinate of an extent.
		     	- ymin: Top-right X-coordinate of an extent.
		     	- ymax: Top-right Y-coordinate of an extent.

	  */	
	    SetExtent: function(xmin,ymin,xmax,ymax){
	  		var ext;
		  	ext=[xmin, ymin, xmax, ymax] ;
		  	
		  	var mapSize = this_API_CORE.GetMap().getSize();
		  	this_API_CORE.GetMap().getView().fit(ext, mapSize);
	  	},
	  	
	    /*
	    Function: SetZoom
	    
	       Add initial zoom.
	       
	       Parameters:
		     	- zoom: specific zoom level.

	  */	
	  	SetZoom: function(zoom){
	  		this_API_CORE.GetMap().getView().setZoom(zoom);
	  	},
	  	
	  	/*
	  	 Function: ActivateLayers
	  	 
	  	 	Activate Service Layers.
	  	 	
	  	 	Parameters:
	  	 		- layers: Layers names
	  	 
	  	 */
	  	ActivateLayers: function(layers){
	  		$( '.apiIgn .apiIgn-layers' ).ajaxComplete(function( event,request, settings ) {
	  			var nodeName = this_API_CORE._activateLayers(layers);
		  		
				$(".apiIgn .apiIgn-layers").dynatree("getRoot").visit(function(node){
				    if(nodeName.indexOf(node.data.key) != -1){
				    	node.select(true);
				    }
				});
				$( '.apiIgn .apiIgn-layers' ).unbind('ajaxComplete');
	  		});
	  	},
	  	
	  	_activateLayers: function(layers){
	  		var nodeName = [];
	  		for (var i =0; i < layers.length; i++){
	  			for (var j =0; j < map.getLayers().getLength(); j++){
	  				if (map.getLayers().item(j).get("title") === layers[i]){
	  					map.getLayers().item(j).setVisible(true);
	  					nodeName.push(map.getLayers().item(j).get("title"));
	  				}
	  			}
	  		}
	  		return nodeName;
	  	},
	  	
	  	/*
	  	 Function: DesactivateLayers
	  	 
	  	 	Desactivate Service Layers
	  	 	
	  	 	Parameters:
	  	 		- layers: Layers names
	  	 
	  	 */
	  	DesactivateLayers: function(layers){
	  		$( '.apiIgn .apiIgn-layers' ).ajaxComplete(function( event,request, settings ) {
		  		var nodeName = this_API_CORE._desactivateLayers(layers);
		  		
		  		$(".apiIgn .apiIgn-layers").dynatree("getRoot").visit(function(node){
				    if(nodeName.indexOf(node.data.key) != -1){
				    	node.select(false);
				    }
				});
		  		$( '.apiIgn .apiIgn-layers' ).unbind('ajaxComplete');
	  		});
	  	},
	  	
	  	_desactivateLayers: function(layers){
	  		var nodeName = [];
	  		for (var i =0; i < layers.length; i++){
	  			for (var j =0; j < map.getLayers().getLength(); j++){
	  				if (map.getLayers().item(j).get("title") === layers[i]){
	  					map.getLayers().item(j).setVisible(false);
	  					nodeName.push(map.getLayers().item(j).get("title"));
	  				}
	  			}
	  		}
	  		return nodeName;
	  	},
	  	
	  	/*
		  Private Function: _validUrl
		  
		    Validation url
	    
	  		Parameters:
	       			- url: url
			Returns:
					True if the url is valid or False if the url is not valid  
		 */
	    _validUrl: function(url){
	    	 var myVariable = url;
	    	 if(url=="" || url==undefined   || url==null){
	    		 return false;
	    	 }else if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(myVariable)) {
	    	      return true;
	    	  } else {
	    	      return false;
	    	  }   
	  	},
	  	
	  	 /*
		  Private Function: _showServiceError
		  
		    Show service error when load the service
	    
	  		Parameters:
	       			- errorType: error Type
	       			- optParam: optional params to definde error
		 */
	    _showServiceError:function(errorType, optParam){
	    	var exMsg="";
	    	
	    	switch (true) {
          case (errorType=="InvalidURL"):
              exMsg= '<p>'+ i18n.t("InvalidURL")+'</p>';
              break;
          case(errorType=="AlreadyLoad"):   
              exMsg = '<p>' + i18n.t("AlreadyLoad") + '</p>';
              break;
          case(errorType=="ParseCap"):   
              exMsg = '<p>' + i18n.t("ParseCap") + '</p>';
              break;                
          case(errorType=="TestURL"):   
              exMsg = '<p>' + i18n.t("TestURL") + '</p>';
              break; 
          case(errorType=="ProjectionDifferent"):   
              exMsg = '<p>' + i18n.t("ProjectionDifferent") + '</p>';
              break;
          case(errorType=="ErrorLoadLayer"):   
        	  if (optParam !== null){
        		  exMsg = '<p>' + i18n.t("ErrorLoadLayer") + " " + optParam + '</p>';
        	  } else {
        		  exMsg = '<p>' + i18n.t("ErrorLoadLayer") + '</p>';
        	  }
              break;
          case(errorType.indexOf("305") > -1):   
              exMsg = '<p>' + i18n.t("305") + '</p>';
              break;
          case(errorType.indexOf("306") > -1):   
              exMsg = '<p>' + i18n.t("306") + '</p>';
              break;
          case(errorType.indexOf("400") > -1):   
              exMsg = '<p>' + i18n.t("400") + '</p>';
              break;
          case(errorType.indexOf("404") > -1):   
              exMsg = '<p>' + i18n.t("404") + '</p>';
              break;
          case(errorType.indexOf("407") > -1):   
              exMsg = '<p>' + i18n.t("407") + '</p>';
              break;
          case(errorType.indexOf("408") > -1):   
              exMsg = '<p>' + i18n.t("408") + '</p>';
              break;
          case(errorType.indexOf("409") > -1):   
              exMsg = '<p>' + i18n.t("409") + '</p>';
              break;
          case(errorType.indexOf("421") > -1):   
              exMsg = '<p>' + i18n.t("421") + '</p>';
              break;
          case(errorType.indexOf("500") > -1):   
              exMsg = '<p>' + i18n.t("500") + '</p>';
              break;
          case(errorType.indexOf("502") > -1):   
              exMsg = '<p>' + i18n.t("502") + '</p>';
              break;
          case(errorType.indexOf("503") > -1):   
              exMsg = '<p>' + i18n.t("503") + '</p>';
              break;
          case(errorType.indexOf("504") > -1):   
              exMsg = '<p>' + i18n.t("504") + '</p>';
              break;
          
           default:
          	exMsg='<p>' +errorType + '</p>';
              break;
         }
	    	
	    	this_API_CORE._hideErrorPanels();
			$( ".apiIgn .apiIgn-loadedMap" ).append(exMsg);
		    $( ".apiIgn .apiIgn-loadedMap" ).css("display","block");
	    },
	    
	    
	  	
	    /*
		  Private Function: _hideErrorPanels
		  
		    Hide error panels 
		 */
	    _hideErrorPanels:function(){
	    	$( ".apiIgn .apiIgn-loadedMap" ).html("");
	    },
	    
	    /*
		  Private Function: _setInfoFormat
		  
		    Set info format
	    
	  		Parameters:
	       			- featureFormat: feature format
	       	Returns:
	       		Info format of the feature
		 */
	    _setInfoFormat:function(featureFormat){
			  var k=0;
			  var l=0;
			  var foundFormat = false;
			  var infoFormat = "";

				  if (typeof featureFormat !== 'undefined'){
					  while (!foundFormat && l<INFO_FORMAT.length){
						  while (!foundFormat && k<featureFormat.length){
							  if (featureFormat[k] === INFO_FORMAT[l]){
								  foundFormat = true;
								  infoFormat = INFO_FORMAT[l];
							  } else
								  k++;
						  }
						  k=0;
						  l++;
					  }
				  }

			  return infoFormat;
	    },
	    
	    
	    // -------------------------------------- Functions Vector Layer ----------------------------------
	    /*
		  Private Function: _ResultGetFeaturePixel
		  
		    
		    Parameters:
		    	- feature: feature
	 			- layer: layer
	 			
	 		Returns: feature and layer
		 */
	    _ResultGetFeaturePixel: function(feature,layer){
	        return {
	          feature: feature, 
	          layer: layer
	        };
	      },
	      
	      
	      /*
		  Private Function: _showVectorLayers
		  
		    Show vector layers
		    Parameters:
		    	- vector: vector
	 			- url: url
	 			- visible: visible
		 */
//	      _showVectorLayers: function(vector, url, visible){
//			
//	    	  var str = url.split('/').pop();
//	    	  str = url.split('\\').pop();
//
//	    	    var nodeLayer = {title: str, key:str, name:url, url:url, icon: "true", layer:vector, select: visible, featureInfo:false};
//				var parentNode = $("#layers").dynatree("getRoot");
//				parentNode.addChild(nodeLayer);
//			
//	      },
	      
	      get_: function (url, callback) {
				  var client = new XMLHttpRequest();
				  client.open('GET', url);
				  client.onload = function() {
				    callback(client.responseText, client.status);
				  };
				  client.onerror = function() {
				    callback(client.statusText, client.status);
				  };
				  client.send();
				},
				
	/*
		Private Function: _getVectorFeatures
				  
		Get vector features
		Parameters:
				   - features: features
				   
		Returns: new vector feature
	*/			
	_getVectorFeatures:function(features)	{
		
		//for default style if not exist
		var  defaultStyle = this_API_CORE.defaultStyle;
		
		var newFeatures = []; 

		    
		for (var i=0; i<features.length; i++){
				
						var featureProperties  = features[i].getProperties();
						var newFeature = new ol.Feature(featureProperties);
						
						if(typeof features[i].getStyleFunction() !== 'undefined'){
								var styles = features[i].getStyleFunction().call(features[i]);
								var imgSrc = styles[0].getImage().getSrc();
						
								if  (typeof imgSrc !== undefined || imgSrc !== null ){
										 var featStyle = new ol.style.Style({
						            		geometry: styles[0].getGeometry(),
						            		fill: styles[0].getFill(),
						            		stroke:styles[0].getStroke(),
						            	    text:styles[0].getText(),
						            	    zIndex:styles[0].getZIndex(),
									        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
									        	anchor: [0.5, 1],
									        	anchorXUnits: 'fraction',
						  					    anchorYUnits: 'fraction',
						  					    opacity: 1,
						  					    scale:0.2 + map.getView().getZoom()*map.getView().getZoom() / 100,
						  					    src: IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(imgSrc)
									        }))});
										  newFeature.setStyle(featStyle);	
								 }
							 
							  } else {
								  var featStyle=[];
								  if(features[i].getGeometry().getType().toLowerCase() == 'geometrycollection'){
									  var geometries = features[i].getGeometry().getGeometries();
									  for(var j = 0; j< geometries.length; j++){
										  featStyle.push(defaultStyle[geometries[j].getType()][0]);
									  }
								  } else{
									  featStyle= defaultStyle[features[i].getGeometry().getType()];
								  }
								  newFeature.setStyle(featStyle);	
							  }

				   	   newFeatures.push(newFeature);
			}
			
			return newFeatures;
		},
		
		 _getVector: function(){
		    	return this_vector;
		    },
		    
		    /*
			  Private Function: _showError
			  
			    Show Error
		  
				Parameters:
		     			- errorType: error type
			 */
		    _showError: function (errorType){
		    	 $(".apiIgn .apiIgn-errorLog").html('<p>'+ i18n.t(errorType)+'</p>');
		    },
		    
		    
		    /*
			  Private Function: _hideError
			  
			    Hide Error
			 */
		   _hideError: function(){
			   $(".apiIgn .apiIgn-errorLog").html("");
		   },
		   
		   /*
			  Private Function: _validUrl
			  
			    Valid URL
			    Parameters:
		     			- url: url
		     	Returns:
		     	  True if the url is valid or False if the url is not valid
			 */
		   _validUrl: function(url){
		  	 var myVariable = url;
		  	 if(url=="" || url==undefined   || url==null){
		  		 return false;
		  	 }else if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(myVariable)) {
		  	      return true;
		  	  } else {
		  	      return false;
		  	  }   
			}
	    
	    
	  	
	  	
	  	
	  	
});

})( jQuery );


	