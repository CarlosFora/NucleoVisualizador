/*
   
   Section: IGN Map Layers

   
   	Maps table-of-contents (TOC): to manage both vector and service layers, with options to activate/deactivate them, remove them, change layer visualization order and choose which one should be used to get contextual info.
   
*/

(function ($){
	

  $.widget( "IGN.IGN_Map_Layers", {
    	//reference to the widget
    	this_Map_Layers:null,
    	_services : [],
    	_flagRemove: false,
    	_flagUpDown: false,
    	_clickMapFromInfo:null,
    	_me:'', //for ctrls activation and deactivation
    	_infoActive:false,
    	options:{
    		map: null
    	},
    	
    	/*
    	  Private Function: _create
    	  Create a "Management Layers" widget instance with the default options.
    	*/
    _create: function(){
	  //reference to  widget object
    	this_Map_Layers = this,
      
	  //search box
	  this.element.html(
        '<div class="apiIgn-gestorLayer">' +
        '<div class="apiIgn-layers" style="font-size:10px;">' +
        '</div>' + 
        '<div class="apiIgn-errorlayers" style="display:none;color:red;font-size:13px;">' +
        '</div>' + 
        '</div>' 
        );
    	
         
    }, //end ready
   
    /*
	  Private Function: _findLayer
	  
	    Find layer
 
		Parameters:
     			- layers: layers
     			- title: title
     			- url: url
		Returns:
				Layer  
	 */
    _findLayer: function(layers,title,url){
    	var layer = null;
    	var found = false;
    	var i = 0;
    	while (!found && i < layers.getLength()){
    		var elemLayer = layers.item(i);
    		var titleLayer = elemLayer.get("title");
    		var urlLayer = elemLayer.get("url_layer");
    		if (title === titleLayer && url === urlLayer){
    			found = true;
    			layer = elemLayer;
    		} else {
    			i++;
    		}
    	}
    	return layer;
    },
    
    /*
	  Private Function: _ResultGetFeaturePixel
	  
	    Get pixel feature

		Parameters:
   			- feature: feature
   			- layer: layer
		Returns:
				Feature and Layer  
	 */
    _ResultGetFeaturePixel: function(feature,layer){
        return {
          feature: feature, 
          layer: layer
        };
      },   

  });
  
})( jQuery );