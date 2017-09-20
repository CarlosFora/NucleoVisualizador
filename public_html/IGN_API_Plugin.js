/*
   
   Section: IGN API_Plugin
   
   The API_Plugin groups all the functions to initialize the different components of the map.
   All the components are initialized once they have been created.
*/

( function( $ ) {
$.apiVisualizador = {
		
		
		// ---------------------------------------------------------------------------------------------------
		// -------------------------------------Function of the Vector Layer ---------------------------------
		// ---------------------------------------------------------------------------------------------------

		  /*
		  Function: InitVectorLayer
		  
		     Function initializing the vector layer, preparing the loading of vector layers.
		     
		     Parameters:
		     	- elementSetVector: id of the vector layer.
		     
		 */
		
		InitVectorLayer: function(elementSetVector){

	    	  var this_vector = $(elementSetVector).data("IGN-IGN_Vector_Layer");
	    	  
	    	  $('.apiIgn .apiIgn-uploadType').on('change', function(event){
	    		  
	    		  this_API_CORE._hideError();
	    		  
	    		  var uploadType = $('.apiIgn .apiIgn-uploadType').val();
	    		  if (uploadType === "URL"){
	    			  $(".apiIgn .apiIgn-LocalUpload").css("display","none");
	    			  $(".apiIgn .apiIgn-UrlUpload").css("display","block");
	    		  } else if (uploadType === "Local"){
	    			  $(".apiIgn .apiIgn-UrlUpload").css("display","none");
	    			  $(".apiIgn .apiIgn-LocalUpload").css("display","block");
	    		  }
	    	  });
	    	  
	    	  $('.apiIgn .apiIgn-uploadBtn').on('change',function(){
	    		  $(".apiIgn .apiIgn-uploadFile").val($(".apiIgn .apiIgn-uploadBtn").val());
	    	  });
	    	  
	    	  $(".apiIgn .apiIgn-uploadBtn").change(function () {
	    		  this_API_CORE._hideError();
	    		  
	    	         var fileExtension = ['kml', 'gpx', 'geojson'];
	    	        if ($(this).val()!="" && $.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
	    	        	this_API_CORE._showError("AllowedFormats");
	    	         }
	    	    });
	    	  
	    	  
	    	  $('.apiIgn .apiIgn-vectorTypeLocal').on('change',function(){
	    		  this_API_CORE._hideError();
	    	  });
	    	  
	    	  $('.apiIgn .apiIgn-vectorType').on('change',function(){
	    		  this_API_CORE._hideError();
	    	  });
	    	  

	    	  $('.apiIgn .apiIgn-send').off('click').on('click', function(event){
	    		        event.preventDefault();
	    		    
	    		        this_API_CORE._hideError();
				
				         //validate entered URL
				         
				    	 if(!this_API_CORE._validUrl($(".apiIgn .apiIgn-vectorIGN").val())){
				    		 this_API_CORE._showError("InvalidURL");
							 return;
				    	  }
				    	 
					      var fileExtension = ['kml', 'gpx', 'geojson'];
					      if ($.inArray($(".apiIgn .apiIgn-vectorIGN").val().split('.').pop().toLowerCase(), fileExtension) == -1) {
					    	  this_API_CORE._showError("AllowedFormats");
								 return;
					      }
		        
					      if(  $(".apiIgn .apiIgn-vectorIGN").val().split('.').pop().toUpperCase() != $('.apiIgn .apiIgn-vectorType').val().toUpperCase()){
					    	  this_API_CORE._showError("DifferentFormats");
							  return;
					      }

				    	  var vector = null;
				    	  var source = null;
				    	  var url = $('.apiIgn .apiIgn-vectorIGN').val();
				    	  var type = $('.apiIgn .apiIgn-vectorType').val();
		    	  
				    	  var format=null;
				    	  var errorOnLoad="";
				    	  
				    	 	if (type === 'KML'){
				    	 		 format = new ol.format.KML({extractStyles: true});
				    	 	}else if (type === 'GPX'){
				    	 		 format = new ol.format.GPX({extractStyles: true});
				    	 	}else if('GeoJSON'){
				    	 		format = new ol.format.GeoJSON({extractStyles: true});
				    	 	}
		      	
				      		try{
				      			var source = new ol.source.Vector();
				      			this_API_CORE.get_(IGN_URL_REPOSITORY + "/proxyRedirect.do?url="+encodeURIComponent(url), function(data,status) {
				      				if ((status === 200) && (data.indexOf("Error") == -1)){
				      					try{
				      							var features = format.readFeatures(data,
							      			        {featureProjection: this_API_CORE.options.SRS});
							      			         source.addFeatures(features);

				      					} catch(e){
				      						errorOnLoad=data;
				      						this_API_CORE._showError("Error, fichero mal formado");
				      					}
					      			    
				      			    } else {
				      			    	this_API_CORE._showError(data);
				      			    }
				      			  });
			
				      		} catch (e){
				      			vector = null;
				      			this_API_CORE._showError("Error");
				      		}

					      	source.on('change', function(event) {
						  	  	source.on('clear', function(e){
						  	  	this_API_CORE._clearFlag = true;
					      		});
						  	  	if (!this_API_CORE._clearFlag){
									if (source.getFeatures().length == 0){
										this_API_CORE._showError(errorOnLoad);
										
									} else {
										
											var newFeatures = []; 
											var features = [];
											source.forEachFeature(function(feature){
												features.push(feature);
											});							
											newFeatures = this_API_CORE._getVectorFeatures(features);
											var newSource = new ol.source.Vector({
												features: newFeatures,
												wrapX: false
											});
											vector = this_API_CORE._drawFeature(newSource,url);
										}
						      		}

						  	  this_API_CORE._clearFlag = false;
							});
					      	
					      	return false;
		     }); ////end send by url
		      

	    
	    	  $('.apiIgn .apiIgn-sendLocal').off('click').on('click', function(event){

	    		  this_API_CORE._hideError();
		          
		          if(  $(".apiIgn .apiIgn-uploadBtn").val()==""){
		        	  this_API_CORE._showError("ValidFile");
					  return;
			      }
		          
			      var fileExtension = ['kml', 'gpx', 'geojson'];
			      if ($.inArray($(".apiIgn .apiIgn-uploadBtn").val().split('.').pop().toLowerCase(), fileExtension) == -1) {
			    	  this_API_CORE._showError("AllowedFormats");
						 return;
			      }
	    
			      if(  $(".apiIgn .apiIgn-uploadBtn").val().split('.').pop().toUpperCase() != $('.apiIgn .apiIgn-vectorTypeLocal').val().toUpperCase()){
			    	  this_API_CORE._showError("DifferentFormats");
					  return;
			      }
			      

	    	  		$('.apiIgn .apiIgn-uploadForm').off("submit");
	    	  		  var dataType = 'xml';
	    	    	  if ($(".apiIgn .apiIgn-vectorTypeLocal").val() ==="GeoJSON"){
	    	    		  dataType = 'json';
	    	    	  }
	    	    
	    	    	  var options = { 
	    	    			  	dataType:  dataType, 
	    	    			  	type: 'POST',
	    	    		        success:       function(result)  {
	    	    		        	var vector = null;
	    		          	    	var sourceLocal = null;
	    		          	    	var type = $('.apiIgn .apiIgn-vectorTypeLocal').val();
	    		          	    	var format=null;
	    		          	    	var features = null;

	    		          	    			try{
		    			          	      		//format depends on file type
		    			          	      		if(type==="KML"){
				    			          	      			format = new ol.format.KML();
				    			          	      			features = format.readFeatures(result,{featureProjection: this_API_CORE.options.SRS});
							          	      			   sourceLocal = new ol.source.Vector({
							          	  		  		    format: new ol.format.KML({
							          	  		  		    	extractStyles: true
							          	  		  		    }),
							          	  		  		    wrapX: false
							          	  		  		  });
							          	      			   var newFeatures = []; 
							          	      			   newFeatures = this_API_CORE._getVectorFeatures(features);
							          	      			   sourceLocal.addFeatures(newFeatures);
		    			          	      		} 
		    			          	      		else if (type==="GPX"){
				    			          	      		format = new ol.format.GPX();
			    			          	      			features = format.readFeatures(result,{featureProjection: this_API_CORE.options.SRS});
				    			          	      		sourceLocal = new ol.source.Vector({
							          	      				format: new ol.format.GPX({
							          	      				    extractStyles: true
							          	      				}),
							          	      				wrapX: false
							          	  		  		  });
				    			          	      		var newFeatures = []; 
				    			          	      		newFeatures = this_API_CORE._getVectorFeatures(features);
				    			          	      		sourceLocal.addFeatures(newFeatures);
		    			          	      		}
			    			          	      	else if (type==="GeoJSON"){
			    			          	      		format = new ol.format.GeoJSON();
		    			          	      			features = format.readFeatures(result,{featureProjection: this_API_CORE.options.SRS});
			    			          	      		sourceLocal = new ol.source.Vector({
						          	      				format: new ol.format.GeoJSON({
						          	      				    extractStyles: true
						          	      				}),
			    			          	      			wrapX: false
					          	  		  		  });
			    			          	      		var newFeatures = []; 
			    			          	      		newFeatures = this_API_CORE._getVectorFeatures(features);
			    			          	      		sourceLocal.addFeatures(newFeatures);
			    			          	      	}
			    		          	    	 } catch (e){
						          	      			vector = null;
						          	      		this_API_CORE._showError("Error en los par�metros de entrada");
						          	      	}
		    			          	      	try{
			    			          	      	
		    			          	      		vector = this_API_CORE._drawFeature(sourceLocal,$(".apiIgn .apiIgn-uploadBtn").val());
		    			          	      		
			    			          	    } catch (e){
						          	      			vector = null;
						          	      		this_API_CORE._showError("Error, fichero mal formado");
						          	      	}
	         	    

	    	    		        	},
	    	    		        	error: function(result) {
	    	    		                //console.log(result);
	    	    		                vector = null;
	    	    		                this_API_CORE._showError("Error, fichero mal formado");
	    	    		            },
	    			        
	    			    	}; 
	    	    	
	    	    			$('.apiIgn .apiIgn-uploadForm').ajaxSubmit(options); 	
							 return false; 
	   
			    }); 

	   
	      
		},
		
		// ---------------------------------------------------------------------------------------------------
		// -------------------------------------Function of the Control Panel --------------------------------
		// ---------------------------------------------------------------------------------------------------

		  /*
		  Function: InitControlPanel
		  
		     Function initializing the control panel, preparing the tool box and the listeners for the different functionalities such as measuring, cleaning or centering the map.
		     
		     Parameters:
		     	- elementSetVector: id of the control panel.
		     
		 */
		
		InitControlPanel : function(elementSetVector){
	    	  $(".apiIgn .apiIgn-toolsMenu").attr("title",i18n.t("Caja de Herramientas"));
	    	  $(".apiIgn .apiIgn-Herramientas").attr("title",i18n.t("Herramientas"));
	    	  $(".apiIgn .apiIgn-distLineal").attr("title",i18n.t("Distancia"));
	    	  $(".apiIgn .apiIgn-distPoligonal").attr("title",i18n.t("Area"));
	    	  $(".apiIgn .apiIgn-borrado").attr("title",i18n.t("Borrar"));
	    	  $(".apiIgn .apiIgn-centerMap").attr("title",i18n.t("Centrar Mapa"));
	    	  $(".apiIgn .apiIgn-centrarMapaImg").attr("title",i18n.t("Centrar Mapa"));
	    	  $(".apiIgn .apiIgn-addVectorialLayer").attr("title",i18n.t("Anadir capa vectorial"));
	    	  
	    	  var this_Control_Panel = $(elementSetVector).data("IGN-IGN_Control_Panel");
	 
//	      $('#okConfig').on('click', function(event){
//	          var newPanelTitle = $('#tituloPanel').val();
//	      	  addPanel(newPanelTitle);
//	      });

	       var totalPanelHeight=0;
	      	
	          //open the config panel
//	      	$('#configMenu').on('click', function(event){
//	      		event.preventDefault();
//	      		$(this).toggleClass( 'active' );
//	      		$('.cd-panel-config').toggleClass( 'is-visible' );
//	      		//inactivamos el menu de herramientas
//	      		$('.apiIgn-map .apiIgn-toolsMenu').removeClass('active');
//	      		$('.cd-panel').removeClass('is-visible');
//	      		$('.panel').hide();
//	            $('.panelTag').removeClass('icon-minus');
//	      		$('.panelTag').addClass('icon-plus');
//	            $('.tools-panel-box').removeClass( 'active' );
//
//	      	});

	      	//open the lateral panel
	      	$('.apiIgn .apiIgn-toolsMenu').on('click', function(event){
	      		this_Control_Panel._me = '.apiIgn .apiIgn-toolsMenu';
	      		
	      	    totalPanelHeight = 80 + ( $('.apiIgn .apiIgn-panelTitle').length * 30 );
	      	    totalPlusPanelHeight=totalPanelHeight; // + 350;
	      		event.preventDefault();
	      		$(this).toggleClass( 'active' );
//	      		$('#configMenu').removeClass('active');
//	      		$('.cd-panel-config').removeClass( 'is-visible' );
	      		$('.apiIgn-panel').hide();
	            $('.apiIgn .apiIgn-panelTag').removeClass('icon-minus');
	      		$('.apiIgn .apiIgn-panelTag').addClass('icon-plus');
	      		$('.apiIgn .apiIgn-cdPanel').toggleClass( 'is-visible' );
	            $('.apiIgn .apiIgn-toolsPanelBox').removeClass( 'active' );
	            $('#info-popup', '.apiIgn-cdPanel').remove();
	            $('#info-measure', '.apiIgn-cdPanel').remove();
	      	});
	      	
	      		
	      		$('.apiIgn .apiIgn-distLineal').on('click', function(event){
	          		 event.preventDefault();
	          		if (this_Control_Panel.disableLineal){
	          			this_API_CORE._ExclusiveControlsDeactivation();
	          		}
	          		else{
	          			this_API_CORE.isLinealMeasure=true;
	                    this_API_CORE._ExclusiveControlsActivation();
	          		}
	          	});
	          	
	          	$('.apiIgn .apiIgn-distPoligonal').on('click', function(event){
	          		event.preventDefault();
	          		
	          		if (this_Control_Panel.disablePoligonal){
	          			this_API_CORE._ExclusiveControlsDeactivation();
	          		}
	          		else{    
	          			this_API_CORE.isPolygonalMeasure=true;
	          			this_API_CORE._ExclusiveControlsActivation();
	          			
	          		}
	          	});
	          	
	          	$('.apiIgn .apiIgn-borrado').on('click', function(event){
	          		event.preventDefault();
	          		this_API_CORE.isBorrado=true;
	      			this_API_CORE._ExclusiveControlsActivation();
	          	});
	          	
	          	$('.apiIgn .apiIgn-centerMap').on('click', function(event){
	          		event.preventDefault();
	          		if (this_Control_Panel.disableCenter){
	          			this_API_CORE._ExclusiveControlsDeactivation();
	          		}
	          		else{
	          			this_API_CORE.isCenter=true;
	          			this_API_CORE._ExclusiveControlsActivation();
	          		}
	          	});
	      		
	      	
	      	$('.apiIgn .apiIgn-panelTitle').on('click', function(event){
	      	     event.preventDefault();
	      		 $('.apiIgn-panel').hide();
	     
	      		 
	               if ($(this).children().hasClass('icon-plus')){
	      	         $(this).parent().find('.apiIgn-panel').slideDown(1000);
	      			 $('.apiIgn .apiIgn-panelTag').removeClass('icon-minus');
	      			 $('.apiIgn .apiIgn-panelTag').addClass('icon-plus');
	      			 $(this).children().removeClass('icon-plus');
	      			 $(this).children().addClass('icon-minus');
	      		 }else{
	      		     $(this).children().removeClass('icon-minus');
	      			 $(this).children().addClass('icon-plus');
	      		 }

	      	});
	      	
		},
		
		// ---------------------------------------------------------------------------------------------------
		// -------------------------------------Function of the Service Layers -------------------------------
		// ---------------------------------------------------------------------------------------------------

		  /*
		  Function: InitServiceLayers
		  
		     Function initializing the service layer, preparing the map for the loading of WMS or wMTS layer.
		
		     Parameters:
		     	- elementSetVector: id of the service layer.
		     
		 */
		InitServiceLayers: function(elementSetVector){

	    	$('.apiIgn .apiIgn-addLayer').off('click').on('click', function(event){
	    		  
	    		this_API_CORE._hideErrorPanels();
	    		  
	    		  var serviceType = $('.apiIgn .apiIgn-serviceType').val();
	    		  if (serviceType === "WMS"){
	    			  this_API_CORE.AddWMSLayers($('.apiIgn .apiIgn-nameLayer').val());
//	    			  this_Service_Layers.showWMSLayers($('#nameLayer').val());
	    		  } else {
	    			  this_API_CORE.AddWMTSLayers($('.apiIgn .apiIgn-nameLayer').val());
//	    			  this_Service_Layers.showWMTSLayers($('#nameLayer').val());
	    		  }
	    		  
	    		  $('.apiIgn .apiIgn-nameLayer').val("");
	    	});
	    	  
	    	$('.apiIgn .apiIgn-nameLayer').off('click').on('click', function(event){	  
	    		this_API_CORE._hideErrorPanels();
	    	});
	    	$('.apiIgn .apiIgn-serviceType').off('click').on('click', function(event){	  
	    		this_API_CORE._hideErrorPanels();
	    	});
	    	 
		},
		
		// ---------------------------------------------------------------------------------------------------
		// -------------------------------------Function of the Map Layers -----------------------------------
		// ---------------------------------------------------------------------------------------------------

		  /*
		  Function: InitMapLayers
		  
		     Function initializing the map layer, preparing the layer tree, which is exactly the same as the openlayer layer array
		     Listeners have to be defined to apply the changes that can be done on the openlayer array at the layer tree, so as to keep the structure
		     
		     Parameters:
		     	- elementSetVector: id of the map layer.
		
		 */
		InitMapLayers : function(elementSetVector){

			var this_Map_Layers = $(elementSetVector).data("IGN-IGN_Map_Layers");
	    	  var allLayers = this_Map_Layers.options.map.getLayers();

	    	  $(".apiIgn .apiIgn-layers").dynatree({
				  	checkbox: true,
				  	minExpandLevel: 1,
					selectMode: 3,
					imagePath: "images/",
					classNames:{
						connector: "",
						nodeIcon: "iconClass",
					},
					
					//Selection nodes of the layers to show the layers in the map
					onSelect: function(select, node) {
		
						var selNodes = node.tree.getSelectedNodes();
						var allNodes = [];
						$(".apiIgn .apiIgn-layers").dynatree("getRoot").visit(function(node){
						    allNodes.push(node);
						});
		
						for (var j=0;j<allNodes.length;j++){
							var found = false;
							var i = 0;
							if (allNodes[j].data.layer !== "false"){
								while (i < selNodes.length && !found){
									if (selNodes[i] === allNodes[j]){
										found = true;
									}
									i++;
								}
								
								if (found){
									allNodes[j].data.layer.setVisible(true);
							
								} else {
									allNodes[j].data.layer.setVisible(false);
								
								}	
							}
						}
					},
					
					//Activation nodes of the layers to use remove button, up button and down button
					onActivate: function(node){
						
						var nodeOpt =$(node.span).children()[3];	
						var nodesOpt = $(nodeOpt).children();

						var parent = node.getParent();
						var siblings = parent.getChildren();
						var indexOf = function (layers, layer) {
							var length = layers.getLength();
							for (var i = 0; i < length; i++) {
								if (layer === layers.item(i)) {
									return i;
								}
							}
							return -1;
						};
						if (siblings.length > 1){
							if (!node.isLastSibling()){
								$(nodesOpt[1]).attr("class","wms-options-button option-down-button");
								$(nodesOpt[1]).on('click', function(event){
									this_Map_Layers._flagRemove = true;
									var layers = this_Map_Layers.options.map.getLayers();
									var allDescendants = [];
									var siblingDescendants = [];
									
									//Remove folder node, only layers in allDescendants
									node.visit(function(child){
										allDescendants.push(child);
									},true);

									for (var k = 0; k < allDescendants.length; k++){	
////										if (allDescendants[k].data.layer === "false" || allDescendants[k].data.layer === null){
										if (allDescendants[k].data.isFolder){
											allDescendants.splice(k,1);
											k = k - 1;
										}
									}
									
									//Remove folder node, only layers in siblingDescendants
									node.getNextSibling().visit(function(child){
										siblingDescendants.push(child);
									},true);
									for (var z = 0; z < siblingDescendants.length; z++){
////										if (siblingDescendants[z].data.layer === "false" || siblingDescendants[z].data.layer === null){
										if (siblingDescendants[z].data.isFolder){
											siblingDescendants.splice(z,1);
											z = z - 1;
										}
									}
								
									
									var firstIndex = indexOf(layers, allDescendants[0].data.layer);
									if (firstIndex > 0){

										for (var i = 0; i < allDescendants.length; i++){
											this_Map_Layers._flagUpDown = true;
											var selectLayer = this_Map_Layers.options.map.getLayers().removeAt(firstIndex);
											this_Map_Layers.options.map.getLayers().insertAt(firstIndex+siblingDescendants.length+ allDescendants.length -1,selectLayer);
										}
										
									}
									
									node.move(node.getNextSibling(),"after");
									node.deactivate();
									this_Map_Layers._flagRemove = false;
								});
							}
							if (!node.isFirstSibling()){
								$(nodesOpt[0]).attr("class","wms-options-button option-up-button");
								$(nodesOpt[0]).on('click', function(event){
									this_Map_Layers._flagRemove = true;
									var layers = this_Map_Layers.options.map.getLayers();
									var allDescendants = [];
									var siblingDescendants = [];
									
									//Remove folder node, only layers in allDescendants
									node.visit(function(child){
										allDescendants.push(child);
									},true);
									for (var k = 0; k < allDescendants.length; k++){	
//										if (allDescendants[k].data.layer === "false" || allDescendants[k].data.layer === null){
										if (allDescendants[k].data.isFolder){
											allDescendants.splice(k,1);
											k = k - 1;
										}
									}
									
									//Remove folder node, only layers in siblingDescendants
									node.getPrevSibling().visit(function(child){
										siblingDescendants.push(child);
									},true);
									for (var z = 0; z < siblingDescendants.length; z++){
////										if (siblingDescendants[z].data.layer === "false" || siblingDescendants[z].data.layer === null){
										if (siblingDescendants[z].data.isFolder){
											siblingDescendants.splice(z,1);
											z = z - 1;
										}
									}
									
									var firstIndex = indexOf(layers, siblingDescendants[0].data.layer);
									if (firstIndex > 0){
										for (var i = 0; i < siblingDescendants.length; i++){
											this_Map_Layers._flagUpDown = true;
											var selectLayer = this_Map_Layers.options.map.getLayers().removeAt(firstIndex);
											this_Map_Layers.options.map.getLayers().insertAt(firstIndex+siblingDescendants.length+ allDescendants.length -1,selectLayer);
										}
									}
									node.move(node.getPrevSibling(),"before");
									node.deactivate();
									this_Map_Layers._flagRemove = false;
								});
							}
						}
						
						
						$(nodesOpt[2]).on('click', function(event){
							this_Map_Layers._flagRemove = false;
							var allDescendants = [];
							if (node.data.layer === "false"){
								node.visit(function(child){
									allDescendants.push(child);
								});
							} else {
								node.visit(function(child){
									allDescendants.push(child);
								},true);
							}

							
							for (var i = 0; i < allDescendants.length; i++){
								if (allDescendants[i].data.layer.get("type_layer") === 'vector'){
									this_Map_Layers.options.map.getOverlays().forEach(function(overlay) {
										if ($(overlay.getElement()).attr('id') === "popup-vector")
											this_API_CORE.GetMap().removeOverlay(overlay);
										allDescendants[i].data.layer.getSource().clear();
									});
									
								} else if (allDescendants[i].data.layer.get("type_layer") === 'WMS'){
									this_Map_Layers.options.map.getOverlays().forEach(function(overlay) {
										if ($(overlay.getElement()).attr('id') === "popup-wms")
											this_API_CORE.GetMap().removeOverlay(overlay);
										
									});
									
								}
								
								this_Map_Layers.options.map.removeLayer(allDescendants[i].data.layer);
							}
							if (node.data.isFolder)
								node.remove();
						});
						
					

						$(nodeOpt).css("visibility","visible");
					},
					
					//Deactivation nodes of the layers
					onDeactivate: function(node) { 
						var nodeOpt =$(node.span).children()[3];
						$(nodeOpt).css("visibility","hidden");
						var nodesOpt = $(nodeOpt).children();
						
						this_Map_Layers.options.map.getOverlays().getArray().slice(0).forEach(function(overlay) {
							if ($(overlay.getElement()).attr('id') === "popup-wms")
								this_API_CORE.GetMap().removeOverlay(overlay);
							
						});

					},
					
					onPostInit: function(isReloading, isError) {
						var node = $(".apiIgn .apiIgn-layers").dynatree("getTree").getActiveNode();
						if( node ){
						    node.deactivate();
						}         
					}
			  });

	    	  // When the fireTree property of the map is changed, this event is caught and the new layer is loaded in the tree. 
	    	  // Depending on the type of the layer (vector / WMS / WMTS), a node is created.

	    	  $(this_Map_Layers.options.map).on("propertychange", function (evt){
	    		  if (evt.originalEvent.key === "fireTree"){
	    			  //If the layer type is vector -> KML / GeoJSON file
	    			  if(this_Map_Layers.options.map.get("fireTree").get("type_layer") === 'vector'){
	    				  var vector = this_Map_Layers.options.map.get("fireTree");
	    				  var url = vector.get("url_layer");
	    				  var str = url.split('/').pop();
	    				  str = url.split('\\').pop();

	    		    	  var nodeLayer = {title: str, key:str, name:url, url:url, icon: "true", layer:vector, select: vector.get("visible"), featureInfo:false};
	    		    	  var parentNode = $(".apiIgn .apiIgn-layers").dynatree("getRoot");
	    		    	  parentNode.addChild(nodeLayer);
	    			  }
	    			  else{ //In case of WMS or WMTS
		    			  var layer = this_Map_Layers.options.map.get("fireTree");
		    			  layer.setVisible(false);
		    			  var str = layer.get("title");
			      		  str = str.split('/').pop();
			      		  str = str.split('\\').pop();
		      			  if(!layer.get("isRoot")){
			      			  var parentLayer = layer.get("parentLayer");
							  var nodeLayer = null;
			  	    		  if(layer.get("isFolder")){
			  	    			  nodeLayer= {expand:true, hideCheckbox: false, isFolder: layer.get("isFolder"), addClass: "treeFolderClass", title: layer.get("title"), key:str, name:layer.get("title"), url:"", icon: "true", layer:layer, select: false, featureInfo:layer.get("queryable"), featureFormat:""};
			  	    		  }else{
	
			  		    		  nodeLayer = {isFolder: layer.get("isFolder"), title: layer.get("title"), key:str, name:layer.get("name"), url:layer.get("url-layer"), icon: "true", style:layer.get("style"), styles: layer.get("styles"), select: false, layer:layer, featureInfo:layer.get("queryable"), featureFormat:layer.get("infoFormat"), version:layer.get("version"), loaded:false};
	//		  		    		  this_Map_Layers.options.map.addLayer(layer);
	//		  		    		 var nodeLayer = {title: title, key:str, name:serviceContents.Layer[i].Identifier, url:url, icon: "true", style:style, styles: styles, layer:layerWMS, select: true, featureInfo:queryable, featureFormat:infoFormat};
			  	    	      }
			  	    		  var allNodes = [];
		  	    			  $(".apiIgn .apiIgn-layers").dynatree("getRoot").visit(function(node){
		  	    				  allNodes.push(node);
		  	    			  });
		  	    			  var i = 0;
		  	    			  var foundNode = false;
		  	    			  var parentNode = null; 
		  	    			  while (!foundNode &&  i < allNodes.length) {
		  	    				  if (allNodes[i].data.layer === parentLayer) {
		  	    					  parentNode  = allNodes[i];
		  	    					  foundNode = true;
		  	    				  }
		  	    				  i++;
		  	    			  }
		  	    			  if (parentNode != null){
		  	    				parentNode.addChild(nodeLayer);
		  	    			  }
		  	    				  
		      			  } else {
		      				var rootNode = $(".apiIgn .apiIgn-layers").dynatree("getRoot");
		      				var title = (layer.get("title") !== null && layer.get("title") !== undefined) ? layer.get("title"): layer.get("name");
		      				var wmsServiceParentNode =  {expand:true, hideCheckbox: false, isFolder: true, title: title, key:str, name:title, url:layer.get("url-layer"), icon: "true", layer:layer, select: false, featureInfo:false, featureFormat:""};
		      				rootNode.addChild(wmsServiceParentNode);
		      			  }
	    			  }
	    		  }
	    	  });
	    	  
	    	 $(allLayers).on("add", function (event){
	    		  var found = false;
	      		  var j = 0;
	      		  var layer = event.originalEvent.element;
	      		  while (!found && j < this_Map_Layers._services.length){
	      			  if (this_Map_Layers._services[j] === layer.get("url_layer")){
	      				  found = true;
	      			  } else {
	      				  j++;
	      			  }
	      		  }
    			  if (!found){
	      			  if ((event.originalEvent.element.get("type_layer") === 'WMS') || (event.originalEvent.element.get("type_layer") === 'WMTS')){
						  this_Map_Layers._services.push(event.originalEvent.element.get("url_layer"));
			     		  if (!this_Map_Layers._flagUpDown){
			           		 $('.apiIgn-panel').hide();
			     	    		 $('.apiIgn .apiIgn-panelTag').removeClass('icon-minus');
			     	    		 $('.apiIgn .apiIgn-panelTag').addClass('icon-plus');
			     	    		  
			         		  $('#'+this_API_CORE.mapLayerId).slideDown(1000);
			         		  
			         		  $('#'+this_API_CORE.mapLayerId).parent().children('.apiIgn .apiIgn-panelTitle').children().removeClass('icon-plus');
			     	    		  $('#'+this_API_CORE.mapLayerId).parent().children('.apiIgn .apiIgn-panelTitle').children().addClass('icon-minus');
			           		  }
			           		  this_Map_Layers._flagUpDown = false;
			           		  
	   	       		  } else if (event.originalEvent.element.get("type_layer") === 'vector'){
	   	       			  
	   	       		   //Map panell is activated when vector features have been drawed.
	   	    	  		this_API_CORE._activateMapPanel=false;
	   	       			  
	   	       			this_Map_Layers._services.push(event.originalEvent.element.get("url_layer"));

		   	      		  if (!this_Map_Layers._flagUpDown ){
		   	        		 $('.apiIgn-panel').hide();
		   	  	    		 $('.apiIgn .apiIgn-panelTag').removeClass('icon-minus');
		   	  	    		 $('.apiIgn .apiIgn-panelTag').addClass('icon-plus');
		   	  	    		  
		   	      		  $('#'+this_API_CORE.mapLayerId).slideDown(1000);
		   	      		  
		   	      		  $('#'+this_API_CORE.mapLayerId).parent().children('.apiIgn .apiIgn-panelTitle').children().removeClass('icon-plus');
		   	  	    		  $('#'+this_API_CORE.mapLayerId).parent().children('.apiIgn .apiIgn-panelTitle').children().addClass('icon-minus');
		   	        	  }
		   	        	  this_Map_Layers._flagUpDown = false;
	   	       		  }
	      		  }

	    	 }); 
	    	 
	    	 $(allLayers).on("remove", function (event){
	  
		  
		    	$( ".apiIgn .apiIgn-errorlayers" ).html("");
		    	  
	    		 
	    		 var url = event.originalEvent.element.get("url_layer");
	    		 var title = event.originalEvent.element.get("title");
	    		  
	    		 var allNodes = [];
	    		 $(".apiIgn .apiIgn-layers").dynatree("getRoot").visit(function(node){
	    			 allNodes.push(node);
	    		 });
	    		 var i = 0;
	    		 var found = false;
	    		 while (!found &&  i < this_Map_Layers.options.map.getLayers().getLength()) {
	    			 if (this_Map_Layers.options.map.getLayers().item(i).get("url_layer") === url) {
	    				 found = true;
	    			 }
	    			 i++;
	    		 }
	    		 if (!found){
	    			 var index = this_Map_Layers._services.indexOf(url);
	    			 if (index > -1)
	    				 this_Map_Layers._services.splice(index,1);
	    		 }
	    		 if (!this_Map_Layers._flagRemove){
	    			 found = false;
	    			 var j = 0;
	    			 while (!found && j < allNodes.length){
	    				 if (allNodes[j].data.layer === event.originalEvent.element){
	    					 found = true;
	    					 if (!allNodes[j].getParent().hasChildren()){
	    						 allNodes[j].getParent().activeVisible = false; 
	    					 }
	    					 allNodes[j].remove();
	    				 } 
	    				 j++;
	    			 }
	    		 }

	    	 }); 
	    	  
	      
		},
		
		/*
		  Function: docAddVector
		  
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
		  	- this_API_CORE: API_CORE components containing the map
		    - zoomLevel: set initial zoom level
		  
		  Returns:
		  	returnValue: _ResultNewVector structure:
		  			- returnValue.result: "Error", "Valid" or "Repeated".
		  			- returnValue.input: input parameters.
		  	 

		*/
		docAddVector : function(projType,vectorIGN,vectorType,this_API_CORE, zoomLevel){
			  
            projType = this_API_CORE.options.SRS;
			  var vector = null;
			  var source = null;
			  var format = null;
			  var returnValue = this_API_CORE._ResultNewVector();
			  
	  	 	if (vectorType === 'KML'){
		 		 format = new ol.format.KML({extractStyles: true});
		 	}else if (vectorType === 'GPX'){
		 		 format = new ol.format.GPX({extractStyles: true});
		 	}else if(vectorType==='GeoJSON'){
		 		format = new ol.format.GeoJSON({extractStyles: true});
		 	}

		  	  		try{

		      			var source = new ol.source.Vector(), sourceJSON = new ol.source.Vector();
		      			this_API_CORE.get_(IGN_URL_REPOSITORY + "/proxyRedirect.do?url="+encodeURIComponent(vectorIGN), function(data,status) {
		      				if ((status == 200) && (data.indexOf("Error") == -1)){
		      					try{	
		      						if (vectorType === 'KML'){
		      					 		var features = format.readFeatures(data,
				    		      		         {featureProjection: projType});
				    		      			     source.addFeatures(features);
		      					 	}else if (vectorType === 'GPX'){
		      					 		var features = format.readFeatures(data,
				    		      		         {featureProjection: projType});
				    		      			     source.addFeatures(features);
		      					 	}else if(vectorType==='GeoJSON'){
		      					 		var features = format.readFeatures(data,
				    		      		         {featureProjection: projType});
		      					 				source.addFeatures(features);
		      					 	}
		      						 
	 			         
		      					} catch(e){
		      						returnValue.result = "Error";
		      						this_API_CORE._trigger('completeVectorial',null,returnValue);
		      					}
		      			    } else {
		      			    	returnValue.result = data;
		      			    	this_API_CORE._trigger('completeVectorial',null,returnValue);
		      			    }
					  });
		  	  		} catch (e){
		  	  			returnValue.result = "Error";
						this_API_CORE._trigger('completeVectorial',null,returnValue);
		  	  		}

		  	  		
		  	  	source.on('change', function(event) {
			  	  	source.on('clear', function(e){
		      			this_API_CORE._clearFlag = true;
		      		});
			  	  	if (!this_API_CORE._clearFlag){
			  	  		returnValue.input = [projType,vectorIGN,vectorType];
			  			if (source.getFeatures().length == 0){// && !this_Control_Panel.disableBorrado){
			  				returnValue.result = "Error";
			  				
			  			} else {

		  					var newFeatures = []; 
		  					source.forEachFeature(function(feature){
								
								var prop = feature.getProperties();
								var newFeature = new ol.Feature(prop);

								if(typeof feature.getStyleFunction() !== 'undefined'){

										var styles = feature.getStyleFunction().call(feature);
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
								  					    scale: zoomLevel,
								  					    src: IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(imgSrc)
											        }))});
												  newFeature.setStyle(featStyle);	
										 }
								  } else {
									  //no feature style, apply default style
										 var featStyle= this_API_CORE.defaultStyle[feature.getGeometry().getType()];
										  newFeature.setStyle(featStyle);	
							    }
									newFeatures.push(newFeature);
							});
							var newSource = new ol.source.Vector({
								features: newFeatures,
								wrapX: false
							});
		  					
							returnValue.layer = this_API_CORE._drawFeature(newSource,vectorIGN);
							if (returnValue.layer != null){
								returnValue.result = "Valid";
							} else {
								returnValue.result = "Repeated";
							}
		  				}
		  			}
		  			this_API_CORE._trigger('completeVectorial',null,returnValue);

		  		});
	  	  	
		  	  	sourceJSON.on('change', function(event) {	

			  	  	sourceJSON.on('clear', function(e){
		      			this_API_CORE._clearFlag = true;
		      		});
			  	  	if (!this_API_CORE._clearFlag){
			  	  		returnValue.input = [projType,vectorIGN,vectorType];
			  			if (sourceJSON.getFeatures().length == 0){// && !this_Control_Panel.disableBorrado){
			  				returnValue.result = "Error";
			  				
			  			} else {

		  					var newFeatures = []; 
		  					sourceJSON.forEachFeature(function(feature){
								
								var featureProperties = feature.clone();
								
//								if(typeof features[i].getStyleFunction() !== 'undefined'){
								var name = featureProperties.get('name');
								var mountpoint = featureProperties.get('identificador'); 
								var estado = featureProperties.get('estado'); 
								var localizacion = featureProperties.get('localizacion');
								if(featureProperties.get('icono') !== undefined){
									var icono = 'http://rep-gnss.es/files/img/'+featureProperties.get('icono')+'.png' ;
									
									var propietario = featureProperties.get('propietario');
									var web = featureProperties.get('web');
									var gps = featureProperties.get('gps');
									var ftp = featureProperties.get('ftp');
									var glonass = featureProperties.get('glonass');
									var tiempo = featureProperties.get('tiempo');
					                var geometry = featureProperties.getGeometry();
									
					                if(name !== undefined){
					                var description = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> "
					                	+ "				<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"> "
					                	+ "				<html xmlns=\"http://www.w3.org/1999/xhtml\"> "
					                	+ "				<head> "
					                	+ "				<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /> "
					                	+ "				<title>Mapa Visor Tooltip</title> "
					                	+ "				<!--  Se incluye la fuente \"Awesome\" que contiene los iconos --> "
					                	+ "				<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css\"> "
					                	+ "				<!--  Se incluye la fuente de google \"Bree Serif\" que se utiliza en el titulo del mountpoint --> "
					                	+ "				<link href=\"http://fonts.googleapis.com/css?family=Bree+Serif\" rel=\"stylesheet\" type=\"text/css\"> "
					                	+ "				<!--  Se uincluye la hoja de estilos CSS para el Tooltip de la descripcion de cada mountpoint aplicado a este documento--> "
					                	+ "				<link rel=\"stylesheet\" href=\"http://rep-gnss.es/files/css/MapaTooltip.css \"> "
					                	+ "				 "
					                	+ "				</head> "
					                   	+ "				<body>" + '<div class="Tooltip" style="border:5px solid rgba(85, 142, 213, 1);">'+
					                    '<div class="estacion_name" style="color:rgba(85, 142, 213, 1);">'+name.toUpperCase()+'</div>'+
						
					                         '<div class="ID_mount" style="background:rgba(85, 142, 213, 1);">'+
				                             '<a href="mp'+mountpoint+'.php" target="_blank"><i class="fa fa-share-alt" title="Mountpoint"></i>'+mountpoint+'</a><br>'+
				                         '</div>'+

				                         '<table style="width:100%">'+

				                           '<tbody><tr class="estado '+icono+'" title="Estado de se�al">'+
				                             '<td class="icon"> <i class="fa fa-wifi fa-rotate-90"></i> </td>'+
				                             '<td class="blink_me" style="color:rgba(85, 142, 213, 1);"> <span> <i class="fa fa-flash"></i> &nbsp; '+estado+' &nbsp; <i class="fa fa-flash"></i> </span> </td>'+
				                           '</tr>'+


				                           '<tr>'+
				                             '<td class="icon"> <i class="fa fa-signal" title="Sat�lites"></i> </td>'+
				                             '<td>'+(parseInt(gps)+parseInt(glonass))+' sat&eacute;lites rastreados <br> <span class="gps-glo"> &nbsp;&nbsp; GPS: '+gps+' &nbsp;&nbsp;&nbsp;&nbsp; GLONASS: '+glonass+'</span> </td>	'+	
				                           '</tr>'+

				                           '<tr>'+
				                             '<td class="icon"> <i class="fa fa-map-marker" style="font-size:19px;" title="Localizacion"></i> </td>'+
				                             '<td>'+localizacion+'</td>'+		
				                           '</tr>'+
				                           '<tr>'+
				                           '<td class="icon"> <i class="fa fa-sitemap" title="Red"></i> </td>'+
				                           '<td>'+web+'</td>'+   
				                           '</tr>'+
				                             
				                           '<tr>'+
				                           '<td class="icon"> <i class="fa fa-info-circle" title="Propietario"></i> </td>'+
				                           '<td>'+propietario+'</td>'+   
				                           '</tr>'+						  

				                           '<tr>'+
				                             '<td class="icon"> <i class="fa fa-cloud-download" title="Link al repositorio FTP de RINEX"></i> </td>'+
				                             '<td><span> <a href="'+ftp+'" target="_blank">Descarga FTP de RINEX</a></span></td>'+		
				                           '</tr>'+

				                           '<tr>'+
				                             '<td class="icon"> <i class="fa fa-clock-o" title="Actualizaci�n (cada 5 minutos)"></i> </td>'+
				                             '<td> '+tiempo+'&nbsp;&nbsp;<i class="fa fa-refresh fa-spin" style="color:rgba(0, 89, 223, 1)"></i> </td>'+	
				                           '</tr>'+

				                         '</tbody></table>'+	
						
				                 '</div></body></html>';
					                featureProperties.set("description", description);
					                }
					                featureProperties.set("styleUrl", icono);
					                
					                
				                               if (featureProperties.get("num_red")!=16){
				                                  // Obtener el nombre del fichero del icono implicito en las propiedades del feature
				                                  var icono = featureProperties.get('icono'); 
				                                  // Escala que se aplicar�n a cada icono de cada red
				                                  var escala = {1:0.07,2:0.08,3:0.08,4:0.1,5:0.085,6:0.085,7:0.085,8:0.085,9:0.085,10:0.08,11:0.068,12:0.08,13:0.09,14:0.08,15:0.085,16:0.07};
				                                  //N�mero de red al que pertenece el feature que se est� tratando en la funci�n, se convierte a entero.
				                                  var num_red = parseInt(featureProperties.get('num_red'));
				                                  var image = '';
				                                  if (icono != undefined)
				                                	  image = 'http://rep-gnss.es/files/img/'+icono+'.png'; 
				                                  // Se crea el estilo que se va a aplicar                
				                                  var estilo = new ol.style.Style({
				                                	  geometry: geometry,
				                                      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
				                                          scale: escala[num_red], // se le aplica la escala correspondiente
				                                          anchor: [0.5, 1], // centro del icono
				                                          anchorXUnits: 'fraction',
									  					    anchorYUnits: 'fraction',
				                                          //anchorXUnits y anchorYUnits por defecto 'fraction' por lo que anchor ser� el centro del icono
				                                          opacity: 1, // opacidad
				                                          src: image // directorio del icono
				                                      }))
				                                  }); // Fin del estilo
				                                  featureProperties.setStyle(estilo);
				                                  newFeatures.push(featureProperties);
				                                  // Se devuelve el estilo
					                		
					                
				                               }
								} else {
									var featStyle= defaultStyle[features[i].getGeometry().getType()];
									featureProperties.setStyle(featStyle);	
									newFeatures.push(featureProperties);
								}
								
							
								
							});
							var newSource = new ol.source.Vector({
								features: newFeatures,
								wrapX: false
							});
		  					
//								returnValue.result = this_API_CORE._drawFeature(newSource,vectorIGN);
							returnValue.layer = this_API_CORE._drawFeature(newSource,vectorIGN);
							if (returnValue.layer != null){
								returnValue.result = "Valid";
							} else {
								returnValue.result = "Repeated";
							}
		  				}
		  			}
		  			this_API_CORE._trigger('completeVectorial',null,returnValue);

		  		});
		  	  	
	  	  	
			  
		},

		
		/*
		  Function: docAddVectorCluster
		  
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
		    - this_API_CORE: API_CORE components containing the map
		    - distance: distance between vectors.
		    - showFeatures: show grouped features on hover interaction when true. 
		    - zoomLevel: set initial zoom level
		  
		  Returns:
		  	returnValue: _ResultNewVector structure:
		  			- returnValue.result: "Error", "Valid" or "Repeated".
		  			- returnValue.input: input parameters.
		  	 

		*/

		docAddVectorCluster : function(projType,vectorIGN,vectorType,this_API_CORE,distance, showFeatures, zoomLevel){
			  
            projType = this_API_CORE.options.SRS;
			  var vector = null;
			  var source = null;
			  var format = null;
			  var returnValue = this_API_CORE._ResultNewVector();
			  
	  	 	if (vectorType === 'KML'){
		 		 format = new ol.format.KML({extractStyles: true});
		 	}else if (vectorType === 'GPX'){
		 		 format = new ol.format.GPX({extractStyles: true});
		 	}else if(vectorType==='GeoJSON'){
		 		format = new ol.format.GeoJSON({extractStyles: true});
		 	}

		  	  		try{

	      			var source = new ol.source.Vector(), sourceJSON = new ol.source.Vector();
		      			this_API_CORE.get_(IGN_URL_REPOSITORY + "/proxyRedirect.do?url="+encodeURIComponent(vectorIGN), function(data,status) {
		      				if ((status == 200) && (data.indexOf("Error") == -1)){
		      					try{		
	      						if (vectorType === 'KML'){
	      					 		var features = format.readFeatures(data,
			    		      		         {featureProjection: projType});
			    		      			     source.addFeatures(features);
	      					 	}else if (vectorType === 'GPX'){
		      						 var features = format.readFeatures(data,
		    		      		         {featureProjection: projType});
		    		      			     source.addFeatures(features);
	      					 	}else if(vectorType==='GeoJSON'){
	      					 		var features = format.readFeatures(data,
			    		      		         {featureProjection: projType});
			    		      			     source.addFeatures(features);
	      					 	}
	 			         
		      					} catch(e){
		      						returnValue.result = "Error";
		      						this_API_CORE._trigger('completeVectorial',null,returnValue);
		      					}
		      			    } else {
		      			    	returnValue.result = data;
		      			    	this_API_CORE._trigger('completeVectorial',null,returnValue);
		      			    }
					  });
		  	  		} catch (e){
		  	  			returnValue.result = "Error";
						this_API_CORE._trigger('completeVectorial',null,returnValue);
		  	  		}

	  	  	
		  	  	source.on('change', function(event) {

			  	  	source.on('clear', function(e){
		      			this_API_CORE._clearFlag = true;
		      		});
			  	  	if (!this_API_CORE._clearFlag){
			  	  		returnValue.input = [projType,vectorIGN,vectorType];
			  			if (source.getFeatures().length == 0){// && !this_Control_Panel.disableBorrado){
			  				returnValue.result = "Error";
			  				
			  			} else {

		  					var newFeatures = []; 
		  					var newIcon = [];
							source.forEachFeature(function(feature){
								
								var prop = feature.getProperties();
								var newFeature = new ol.Feature(prop);

								if(typeof feature.getStyleFunction() !== 'undefined'){

										var styles = feature.getStyleFunction().call(feature);
										var imgSrc = styles[0].getImage().getSrc();
										var styleSrc = this_API_CORE._FeatureStyles();
										styleSrc.urlStyle = imgSrc;
										var styleUrl = (feature.get('icono') !== undefined) ? feature.get('icono'):feature.get('styleUrl');
										styleUrl=styleUrl.replace("#",'');
										styleUrl=styleUrl.concat('.');
										styleSrc.idStyle = styleUrl;
										newIcon.push(styleSrc);
								
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
								  					    scale: zoomLevel, 
								  					    src: IGN_URL_REPOSITORY + "/imageRedirect.do?url="+encodeURIComponent(imgSrc)
											        }))});
												  newFeature.setStyle(featStyle);	
										 }
								  } else {
									  //no feature style, apply default style
										 var featStyle= this_API_CORE.defaultStyle[feature.getGeometry().getType()];
										  newFeature.setStyle(featStyle);	
							    }
									newFeatures.push(newFeature);
							});
							var newSource = new ol.source.Vector({
								features: newFeatures,
								wrapX: false
							});
		  					
							returnValue.layer = this_API_CORE._drawFeatureCluster(newSource,vectorIGN,newIcon,distance,showFeatures, zoomLevel);
							if (returnValue.layer != null){
								returnValue.result = "Valid";
							} else {
								returnValue.result = "Repeated";
							}
		  				}
		  			}
		  			this_API_CORE._trigger('completeVectorial',null,returnValue);

		  		});
		  	  	
	  	  sourceJSON.on('change', function(event) {	

		  	  	sourceJSON.on('clear', function(e){
	      			this_API_CORE._clearFlag = true;
	      		});
		  	  	if (!this_API_CORE._clearFlag){
		  	  		returnValue.input = [projType,vectorIGN,vectorType];
		  			if (sourceJSON.getFeatures().length == 0){// && !this_Control_Panel.disableBorrado){
		  				returnValue.result = "Error";
		  				
		  			} else {

	  					var newFeatures = []; 
	  					var newIcon = [];
	  					sourceJSON.forEachFeature(function(feature){
							
							var featureProperties = feature.clone();
							
//							if(typeof features[i].getStyleFunction() !== 'undefined'){
							var name = featureProperties.get('name');
							var mountpoint = featureProperties.get('identificador'); 
							var estado = featureProperties.get('estado'); 
							var localizacion = featureProperties.get('localizacion');
							if(featureProperties.get('icono') !== undefined){
								var icono = 'http://rep-gnss.es/files/img/'+featureProperties.get('icono')+'.png' ;
								
								var propietario = featureProperties.get('propietario');
								var web = featureProperties.get('web');
								var gps = featureProperties.get('gps');
								var ftp = featureProperties.get('ftp');
								var glonass = featureProperties.get('glonass');
								var tiempo = featureProperties.get('tiempo');
				                var geometry = featureProperties.getGeometry();
								
				                if(name !== undefined){
				                var description = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> "
				                	+ "				<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"> "
				                	+ "				<html xmlns=\"http://www.w3.org/1999/xhtml\"> "
				                	+ "				<head> "
				                	+ "				<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /> "
				                	+ "				<title>Mapa Visor Tooltip</title> "
				                	+ "				<!--  Se incluye la fuente \"Awesome\" que contiene los iconos --> "
				                	+ "				<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css\"> "
				                	+ "				<!--  Se incluye la fuente de google \"Bree Serif\" que se utiliza en el titulo del mountpoint --> "
				                	+ "				<link href=\"http://fonts.googleapis.com/css?family=Bree+Serif\" rel=\"stylesheet\" type=\"text/css\"> "
				                	+ "				<!--  Se uincluye la hoja de estilos CSS para el Tooltip de la descripcion de cada mountpoint aplicado a este documento--> "
				                	+ "				<link rel=\"stylesheet\" href=\"http://rep-gnss.es/files/css/MapaTooltip.css \"> "
				                	+ "				 "
				                	+ "				</head> "
				                	+ "				<body>" + '<div class="Tooltip" style="border:5px solid rgba(85, 142, 213, 1);">'+
			                    '<div class="estacion_name" style="color:rgba(85, 142, 213, 1);">'+name.toUpperCase()+'</div>'+
				
			                         '<div class="ID_mount" style="background:rgba(85, 142, 213, 1);">'+
			                             '<a href="mp'+mountpoint+'.php" target="_blank"><i class="fa fa-share-alt" title="Mountpoint"></i>'+mountpoint+'</a><br>'+
			                         '</div>'+

			                         '<table style="width:100%">'+

			                           '<tbody><tr class="estado '+icono+'" title="Estado de se�al">'+
			                             '<td class="icon"> <i class="fa fa-wifi fa-rotate-90"></i> </td>'+
			                             '<td class="blink_me" style="color:rgba(85, 142, 213, 1);"> <span> <i class="fa fa-flash"></i> &nbsp; '+estado+' &nbsp; <i class="fa fa-flash"></i> </span> </td>'+
			                           '</tr>'+


			                           '<tr>'+
			                             '<td class="icon"> <i class="fa fa-signal" title="Sat�lites"></i> </td>'+
			                             '<td>'+(parseInt(gps)+parseInt(glonass))+' sat&eacute;lites rastreados <br> <span class="gps-glo"> &nbsp;&nbsp; GPS: '+gps+' &nbsp;&nbsp;&nbsp;&nbsp; GLONASS: '+glonass+'</span> </td>	'+	
			                           '</tr>'+

			                           '<tr>'+
			                             '<td class="icon"> <i class="fa fa-map-marker" style="font-size:19px;" title="Localizacion"></i> </td>'+
			                             '<td>'+localizacion+'</td>'+		
			                           '</tr>'+
			                           '<tr>'+
			                           '<td class="icon"> <i class="fa fa-sitemap" title="Red"></i> </td>'+
			                           '<td>'+web+'</td>'+   
			                           '</tr>'+
			                             
			                           '<tr>'+
			                           '<td class="icon"> <i class="fa fa-info-circle" title="Propietario"></i> </td>'+
			                           '<td>'+propietario+'</td>'+   
			                           '</tr>'+						  

			                           '<tr>'+
			                             '<td class="icon"> <i class="fa fa-cloud-download" title="Link al repositorio FTP de RINEX"></i> </td>'+
			                             '<td><span> <a href="'+ftp+'" target="_blank">Descarga FTP de RINEX</a></span></td>'+		
			                           '</tr>'+

			                           '<tr>'+
			                             '<td class="icon"> <i class="fa fa-clock-o" title="Actualizaci�n (cada 5 minutos)"></i> </td>'+
			                             '<td> '+tiempo+'&nbsp;&nbsp;<i class="fa fa-refresh fa-spin" style="color:rgba(0, 89, 223, 1)"></i> </td>'+	
			                           '</tr>'+

			                         '</tbody></table>'+	
					
			                 '</div></body></html>';
				                featureProperties.set("description", description);
				                }
				                featureProperties.set("styleUrl", icono);
				                
				                
			                               if (featureProperties.get("num_red")!=16){
			                                  // Obtener el nombre del fichero del icono implicito en las propiedades del feature
			                                  var icono = featureProperties.get('icono'); 
			                                  // Escala que se aplicarán a cada icono de cada red
			                                  var escala = {1:0.07,2:0.08,3:0.08,4:0.1,5:0.085,6:0.085,7:0.085,8:0.085,9:0.085,10:0.08,11:0.068,12:0.08,13:0.09,14:0.08,15:0.085,16:0.07};
			                                  //Número de red al que pertenece el feature que se está tratando en la función, se convierte a entero.
			                                  var num_red = parseInt(featureProperties.get('num_red'));
			                                  var image = '';
			                                  if (icono != undefined){
			                                	  image = 'http://rep-gnss.es/files/img/'+icono+'.png'; 
			                                	  newIcon.push(image);
			                                  }
			                                  // Se crea el estilo que se va a aplicar                
			                                  var estilo = new ol.style.Style({
			                                	  geometry: geometry,
			                                      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
			                                          scale: escala[num_red], // se le aplica la escala correspondiente
			                                          anchor: [0.5, 1], // centro del icono
			                                          anchorXUnits: 'fraction',
								  					    anchorYUnits: 'fraction',
			                                          //anchorXUnits y anchorYUnits por defecto 'fraction' por lo que anchor será el centro del icono
			                                          opacity: 1, // opacidad
			                                          src: image // directorio del icono
			                                      }))
			                                  }); // Fin del estilo
			                                  featureProperties.setStyle(estilo);
			                                  newFeatures.push(featureProperties);
			                                  // Se devuelve el estilo
				                		
				                
			                               }
							} else {
								var featStyle= defaultStyle[features[i].getGeometry().getType()];
								featureProperties.setStyle(featStyle);	
								newFeatures.push(featureProperties);
							}
						});
						var newSource = new ol.source.Vector({
							features: newFeatures,
							wrapX: false
						});
	  					returnValue.layer = this_API_CORE._drawFeatureCluster(newSource,vectorIGN,newIcon,distance,showFeatures, zoomLevel);
	  					if (returnValue.layer != null){
							returnValue.result = "Valid";
						} else {
							returnValue.result = "Repeated";
						}
	  				}
	  			}
	  			this_API_CORE._trigger('completeVectorial',null,returnValue);

	  		});
	  	  	
			  },
		  
		
		
		  /*
		  Function: InitSearch
		  
		     Function initializing the search module
		
			Parameters:
		     	- objMap: Object that will host the search module
		 */
		
		InitSearch : function(objMap){
			var escuchador = {  
					//It is the function to invoke this plugin, search the results and respresent these results in the map
					selectedItem: function(event, geoJSONfeatureCollection){
						var newSearchLayer = new ol.layer.Vector({
							type_layer: 'search',
					        source: new ol.source.Vector({
					        	wrapX: false
					        })
						});
						
						var format = new ol.format.GeoJSON();
	                    var features = format.readFeatures(geoJSONfeatureCollection,
                        {
                            "dataProjection": format.readProjection(
                                    geoJSONfeatureCollection.features[0]),
                            "featureProjection": this_API_CORE.options.SRS
                        });

						try{
							
						    if (features[0].getGeometry()!=null){
						    	newSearchLayer.getSource().addFeatures(features);
						    	this_API_CORE.searchLayer.push(newSearchLayer); 
						    	this_API_CORE.GetMap().addLayer(newSearchLayer);
								
								 if( features[0].getGeometry().getType()==="Point"){
									 this_API_CORE.GetMap().getView().setCenter(features[0].getGeometry().getCoordinates());
									 if (features[0].getProperties().portalNumber!= null){
										 this_API_CORE.GetMap().getView().setZoom(zoomLevels.portalNumber);

									 }else{
										 this_API_CORE.GetMap().getView().setZoom(zoomLevels.namedPlace);

									 }
									 
							     }else {
							    	 var boxExtent = features[0].getGeometry().getExtent();
							    	 this_API_CORE.GetMap().getView().fit(boxExtent,this_API_CORE.GetMap().getSize());
								 }
							} 
						} catch(err){
							console.error(err);
						}
						
						
						
					}
			    };
			    
			
			this_API_CORE._searching = $('.apiIgn .apiIgn-setBuscador').search({  
		        selected: escuchador.selectedItem,
		        //geographicNameType collects the types of included geographic names as candidates in the search
		        /* It has to be used the geographicNameType of IGN_search.js instead this one - 28/06/2017	
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
						'Entrante costero y estrecho mar�timo'],
					*/
		  			//title to include in the drop down menu 
		            //titleBox: 'Top&oacute;nimo o direcci&oacute;n'
		      		titleBox: i18n.t('Toponimo o direccion')
		          });
		},
		
//		InitSearch : function(objMap){
//			var escuchador = {  
//					//It is the function to invoke this plugin, search the results and respresent these results in the map
//					selectedItem: function(event, geoJSONfeatureCollection){
//						var newSearchLayer = new ol.layer.Vector({
//							type_layer: 'search',
//					        source: new ol.source.Vector()
//						});
//						
//						var format = new ol.format.GeoJSON();
//	                    var features = format.readFeatures(geoJSONfeatureCollection,
//                        {
//                            "dataProjection": format.readProjection(
//                                    geoJSONfeatureCollection.features[0]),
//                            "featureProjection": this_API_CORE.options.SRS
//                        });
//
//						try{
//							
//						    if (features[0].getGeometry()!=null){
//						    	newSearchLayer.getSource().addFeatures(features);
//						    	objMap.searchLayer.push(newSearchLayer); 
//						    	objMap.GetMap().addLayer(newSearchLayer);
//								
//								 if( features[0].getGeometry().getType()==="Point"){
//									 objMap.GetMap().getView().setCenter(features[0].getGeometry().getCoordinates());
//									 if (features[0].getProperties().portalNumber!= null){
//		                                    objMap.GetMap().getView().setZoom(zoomLevels.portalNumber);
//
//									 }else{
//		                                    objMap.GetMap().getView().setZoom(zoomLevels.namedPlace);
//
//									 }
//									 
//							     }else {
//							    	 var boxExtent = features[0].getGeometry().getExtent();
//							    	 objMap.GetMap().getView().fit(boxExtent,objMap.GetMap().getSize());
//								 }
//							} 
//						} catch(err){
//							console.error(err);
//						}
//						
//						
//						
//					}
//			    };
//			    
//			
//			objMap._searching = $('#searching').search({  
//		        selected: escuchador.selectedItem,
//		        //geographicNameType collects the types of included geographic names as candidates in the search
//		        geographicNameType:[  
//		                  	'Comunidad aut�noma',
//		                  	'Ciudad con estatuto de autonom�a',
//		                  	'Provincia',
//		                  	'Municipio',
//		                  	'EATIM',
//		                  	'Isla administrativa',
//		                  	'Comarca administrativa',
//		                  	'N�cleos de poblaci�n',
//		                  	'Entidad colectiva',
//		                  	'Entidad menor de poblaci�n',
//		                  	'Entidad singular',
//		                  	'Alineaci�n monta�osa',
//		                  	'Monta�a',
//		                  	'Paso de monta�a',
//		                  	'Llanura',
//		                  	'Depresi�n',
//		                  	'Vertientes',
//		                  	'Comarca geogr�fica',
//		                  	'Paraje',
//		                  	'Elemento puntual del paisaje',
//		                  	'Saliente costero',
//		                  	'Playa',
//		                  	'Isla',
//		                  	'Otro relieve costero',
//		                  	'Parque Nacional y Natural',
//		                  	'Espacio protegido restante',
//		                  	'Aeropuerto',
//		                  	'Aer�dromo',
//		                  	'Pista de aviaci�n y helipuerto',
//		                  	'Puerto de Estado',
//		                  	'Instalaci�n portuaria',
//		                  	'Carretera',
//		                  	'Camino y v�a pecuaria',
//		                  	'V�a urbana',
//		                  	'Ferrocarril',
//		                  	'Curso natural de agua',
//		                  	'Masa de agua',
//		                  	'Curso artificial de agua',
//		                  	'Embalse',
//		                  	'Hidr�nimo puntual',
//		                  	'Glaciares',
//		                  	'Mar',
//		                  	'Entrante costero y estrecho mar�timo'],
//		  			//title to include in the drop down menu 
//		            //titleBox: 'Top&oacute;nimo o direcci&oacute;n'
//		      		titleBox: i18n.t('Toponimo o direccion')
//		          });
//		},
		
		  /*
		  Function: InitApiCore
		
		     Function called after creating the Map to initialize its components
		
		 */
		 InitApiCore : function() {
				$.apiVisualizador.InitControlPanel('.apiIgn-wrapper');
				$.apiVisualizador.InitVectorLayer('.apiIgn-setVector');
				
				$(window).resize(function(){
					if($.apiVisualizador.isMobile()){					
						$('.apiIgn-cdPanel').removeClass('is-visible');
						$('.apiIgn-toolsMenu').removeClass('active');
						$('.apiIgn-info-popup').remove();
						$('.apiIgn-info-measure').remove();
					}
				});
								
				if (this_API_CORE.options.useAttribution){
				
					map.on('moveend', function(evt) {
						$.apiVisualizador.ComprobarCondicionesAtribuciones();
					});						
				}						
		 },
	

		 /*
		  Function: ComprobarCondicionesAtribuciones
		
		     Function that verify 2 conditions, zoom level and visible layer.
		
		 */		 
		ComprobarCondicionesAtribuciones: function(){	

			var zoomLevel = map.getView().getZoom();
									
			if(zoomLevel > 13){ //The attribution specifies the province only for zoom >= 14 --> escala 1/34.124 
				var activateAttribution = false;
				var kmlAttribution = IGN_URL_REPOSITORY + '/vectorial_examples/atribucion.kml';
				var kmlAttributionPNOA = IGN_URL_REPOSITORY + '/vectorial_examples/atribucionPNOA.kml';
				
				map.getLayers().forEach(function(layer, i) {
					var lVisible = layer.get('visible');
					var lType = layer.get('type_layer');
					if (lType === 'WMTS'){  // Only WMTS layers have getLayer() method  
						var lLayer = layer.getSource().getLayer();
						if (lLayer === IGN_BASE_TODO_LAYER && lVisible){  // IGN-Base and visible								 
							activateAttribution = true;							
						}else if((lLayer === IGN_PNOA_LAYER || lLayer === IGN_BASE_ORTO_LAYER) && lVisible ){  // Hibrido o PNOA y visble
							activateAttributionPNOA = true;															
						}																	
					}
				});							
				
				if (activateAttribution){
					$.apiVisualizador.ComprobarAtribuciones(map.getView().getCenter(), kmlAttribution);		
				}else if (activateAttributionPNOA){
					$.apiVisualizador.ComprobarAtribuciones(map.getView().getCenter(), kmlAttributionPNOA);					
				}else{					
					$(".apiIgn #ignAttribution").html("\u00A9 Instituto Geogr\u00e1fico Nacional");
					//$('#ignAttribution').attr('href', 'http://www.ign.es');
					$('#ignAttribution').unbind('click', false);
				}
			}else{
				$(".apiIgn #ignAttribution").html("\u00A9 Instituto Geogr\u00e1fico Nacional");
				//$('#ignAttribution').attr('href', 'http://www.ign.es');
				$('#ignAttribution').unbind('click', false);
			}		  
		},
		  
		 /*
		  Function: ComprobarAtribuciones
		
		     Function called to replace the attribution name depending on the area where the center of the image is.
		     The attribution specifies the province only for zoom > 14
		
		 */		 
		  ComprobarAtribuciones: function(extensionMapa, fileKML){
			  
			projType = this_API_CORE.options.SRS;
			var format = null;
			var returnValue = this_API_CORE._ResultNewVector();
			format = new ol.format.KML({extractStyles: true});
  	  		try{		
      			this_API_CORE.get_(IGN_URL_REPOSITORY + "/proxyRedirect.do?url="+encodeURIComponent(fileKML), function(data,status) {
      				 
      				if ((status == 200) && (data.indexOf("Error") == -1)){
      					try{      							  	
  					 		var features = format.readFeatures(data,
    		      		         {featureProjection: projType});	
  					 		
  					 		for(var i=0;i<features.length;i++){  					 			
  	  					 		var p = new ol.geom.Polygon();
  	  					 		p = features[i].getGeometry();
  	  					 		//var name = features[i].get("name");  	  					 		 
								//var name = (features[i].getProperties())["COMUNIDAD"];
								var name = (features[i].getProperties())["atribucion"];								
  	  					 		if (p.intersectsCoordinate(extensionMapa)) {
  	  					 			$(".apiIgn #ignAttribution").html(name);
  	  					 			//$('#ignAttribution').attr('href', '#');
									$('#ignAttribution').bind('click', false);
  	  					 		}  	  					 		
  					 		}
  					 		
      					} catch(e){
      						$(".apiIgn #ignAttribution").html("\u00A9 Instituto Geogr\u00e1fico Nacional");
      						//$('#ignAttribution').attr('href', 'http://www.ign.es');
							$('#ignAttribution').unbind('click', false);
      						returnValue.result = "Error";
      						this_API_CORE._trigger('completeVectorial',null,returnValue);
      					}
      			    } else {
      			    	$(".apiIgn #ignAttribution").html("\u00A9 Instituto Geogr\u00e1fico Nacional");
      			    	//$('#ignAttribution').attr('href', 'http://www.ign.es');
						$('#ignAttribution').unbind('click', false);
      			    	returnValue.result = data;
      			    	this_API_CORE._trigger('completeVectorial',null,returnValue);
      			    }
			  });
  	  		} catch (e){
  	  			$(".apiIgn #ignAttribution").html("\u00A9 Instituto Geogr\u00e1fico Nacional");
  	  			//$('#ignAttribution').attr('href', 'http://www.ign.es');
				$('#ignAttribution').unbind('click', false);
  	  			returnValue.result = "Error";
				this_API_CORE._trigger('completeVectorial',null,returnValue);
  	  		}					    		      			     
		  },		 
		  
		  
		  /*
		  Function: isMobile
		  
		     Specifies if the API is displayed in a mobile device
		     
		     Returns: whether it is mobile or not
		 */
		 isMobile:function() {
//		  	  try{ document.createEvent("TouchEvent"); return true; }
//		  	  catch(e){ return false; }
			 if(($(window).width() < 767)){
				 return true;
			 }
			 return false;
		 }
		
};
})( jQuery );
