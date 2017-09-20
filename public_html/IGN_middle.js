version = ""; //V2_7
versOL="v4.1.1";
var protocol = ('https:' === document.location.protocol ? 'https:' : 'http:');
IGN_URL_REPOSITORY = protocol + "//componentes.ign.es/NucleoVisualizador" + version;

document.write("<link rel='stylesheet' href='" + protocol + "//openlayers.org/en/" + versOL + "/css/ol.css' type='text/css'>");
document.write("<link rel='stylesheet' href='" + protocol + "//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css'>");
document.write("<link href='" + IGN_URL_REPOSITORY + "/css/ApiVis-main.css' rel='stylesheet' type='text/css'>");
document.write("<link href='" + IGN_URL_REPOSITORY + "/css/IGN-API-Responsive.css' rel='stylesheet' type='text/css'>");
document.write("<link href='" + IGN_URL_REPOSITORY + "/css/skin/ui.dynatree.css' rel='stylesheet' type='text/css' id='skinSheet'>");
document.write("<link href='" + IGN_URL_REPOSITORY + "/menuCss/menu.css' rel='stylesheet' type='text/css'>");
document.write("<link href='" + IGN_URL_REPOSITORY + "/menuCss/iconos.css' rel='stylesheet' type='text/css'>");
//Librerias Javascript
document.write("<script src='" + IGN_URL_REPOSITORY + "/IGN_Constants.js'></script>");
document.write("<script src='" + protocol + "//code.jquery.com/jquery-1.11.1.min.js'></script>");
document.write("<script type='text/javascript' src='" + protocol + "//code.jquery.com/jquery-migrate-1.2.1.js'></script>");
document.write("<script src='" + protocol + "//code.jquery.com/ui/1.11.1/jquery-ui.min.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/js/i18next-1.7.7.min.js' type='text/javascript'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/js/jquery.form.min.js' type='text/javascript'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/js/jquery.cookie.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/js/jquery.dynatree - api.js' type='text/javascript'></script>");
document.write("<script src='" + protocol + "//openlayers.org/en/" + versOL + "/build/ol.js' type='text/javascript'></script>");
document.write("<script src='" + protocol + "//cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.9/proj4.js' type='text/javascript'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/IGN_search.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/IGN_Vector_Layer.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/IGN_Control_Panel.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/IGN_Service_Layers.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/IGN_Map_Layers.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/js/modernizr.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/IGN_API_CORE.js'></script>");
document.write("<script src='" + IGN_URL_REPOSITORY + "/IGN_API_Plugin.js'></script>");
 