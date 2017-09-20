//var IGN_BASE_URL = "http://www.ign.es/wmts/ign-base";
////var IGN_BASE_URL="http://www.ign.es/wmts/mapa-raster";
//var IGN_PNOA_URL = "http://www.ign.es/wmts/pnoa-ma";
////var INFO_FORMAT = ['application/vnd.ogc.gml/3.1.1','text/xml','text/html','application/vnd.ogc.gml','text/plain']; 
////var INFO_FORMAT = ['text/html','text/plain','text/xml','application/vnd.ogc.gml'];
//var INFO_FORMAT = ['text/html','text/plain'];//,'text/xml','application/vnd.ogc.gml'];
//var PROJECTION_CODE="EPSG:4258";
////conf wmts ignbase 4258
//var IGNBASEmatrixIds = new Array(20);
//var IGNBASEserverResolutions = new Array(20);
//	
//for (var i=0; i<20; ++i) {
//	
//    IGNBASEmatrixIds[i] = "" + i;
//
//	if(i===0) {
//		//the world in 2 tiles
//		IGNBASEserverResolutions[i] = 0.703125;
//    }else{
//		IGNBASEserverResolutions[i] = IGNBASEserverResolutions[i-1]/2;
//    }
//}

//default services and layers
//IGN-Base
var IGN_BASE_URL = 'http://www.ign.es/wmts/ign-base';
var IGN_BASE_TODO_LAYER = 'IGNBaseTodo';
var IGN_BASE_ORTO_LAYER = 'IGNBaseOrto';
//PNOA
var IGN_PNOA_URL = 'http://www.ign.es/wmts/pnoa-ma';
var IGN_PNOA_LAYER = 'OI.OrthoimageCoverage';

//default info format
var INFO_FORMAT = ['text/html', 'text/plain'];//,'text/xml','application/vnd.ogc.gml'];

//default crs
var DEFAULT_CRS_KEY = "urn:ogc:def:crs:EPSG::4258";

var zoomLevels = {
    portalNumber: 17,
    namedPlace: 13
}

var GRS80_semimajor_axis = 6378137;

//hash of crs and tilematrixset
crs = {};
crs[DEFAULT_CRS_KEY] = {
    "name": "EPSG:4258",
    "minX": -180,
    "minY": -90,
    "maxX": 180,
    "maxY": 90,
    "alignTopLeft": false,
    "tileWidth": 256,
    "tileHeight": 256,
    "pixelSizeLevel0": 0.703125,
    "unit": "degrees",
    "metersPerUnit": GRS80_semimajor_axis * Math.PI / 180,
    "tileMatrixPrefix": "",
    "level0Name": 0,
    "numberOfLevels": 20
};
crs["urn:ogc:def:crs:EPSG::3857"] = {
    "name": "EPSG:3857",
    "minX": -20037508.34,
    "minY": -20037508.34,
    "maxX": 20037508.34,
    "maxY": 20037508.34,
    "alignTopLeft": false,
    "tileWidth": 256,
    "tileHeight": 256,
    "pixelSizeLevel0": 156543.03390625,
    "unit": "m",
    "metersPerUnit": 1,
    "tileMatrixPrefix": "",
    "level0Name": 0,
    "numberOfLevels": 21
};

//configure matrixIds and serverResolutions per CRS
for (var key in crs) {
    crs[key]["matrixIds"] = new Array(crs[key].numberOfLevels);
    crs[key]["serverResolutions"] = new Array(crs[key].numberOfLevels);
    for (var i = 0; i < crs[key].numberOfLevels; i++) {
        crs[key].matrixIds[i] =
                crs[key].tileMatrixPrefix + (crs[key].level0Name + i);
        //nth + 1 resolution is half nth resolution
        crs[key].serverResolutions[i] = crs[key].pixelSizeLevel0 / Math.pow(2, i);
    }
}


function findCRSbyName(crsName) {
    for (var key in crs) {
        //crs found! return it!
        if (crs[key].name === crsName) {
            return crs[key];
        }
    }
    return null;
}


function findCRSKeybyName(crsName) {
    for (var key in crs) {
        //crs found! return it!
        if (crs[key].name === crsName) {
            return key;
        }
    }
    return null;
}
