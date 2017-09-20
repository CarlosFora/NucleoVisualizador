/*
 
 Section: IGN search
 
 The IGN_search widget is used to search place names or address candidates from IDEE and CartoCiudad services using autocomplete functionality, and select one of them from the list of candidates.
 
 The result of invoking this widget is an input text box with an autocomplete dropdown menu with options, when one of the options is selected a geoJSON Feature Collection is returned that it may be represented in a result layer.
 
 To get started, an example is shown describing how to use the widget in an HTML document, with three different map libraries, please pay attention to the comments included in this example:
 
 (start code)
 <!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ejemplo integración busqueda por topónimo y callejero</title>
        <!-- jQuery (jQuery UI, IGN.search widget dependency) -->
        <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
        <!-- jQuery ui (IGN.search widget dependency)-->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">        
        <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <!-- IGN.search widget-->
        <script src = "./jQuery/widget/IGN_search.js" ></script> 
        <!-- OpenLayers -->
        <link rel="stylesheet" href="https://openlayers.org/en/v3.19.1/css/ol.css" type="text/css">        
        <script src="https://openlayers.org/en/v3.19.1/build/ol.js" type="text/javascript"></script>
        <!-- leaflet -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.0.1/dist/leaflet.js"></script>        
        <!-- Esri -->
        <link rel="stylesheet" href="https://js.arcgis.com/3.18/esri/css/esri.css">        
        <script src="https://js.arcgis.com/3.18/"></script>
        <!-- terraformer (Esri/geojson-layer-js dependency-->
        <script src="http://cdn-geoweb.s3.amazonaws.com/terraformer/1.0.6/terraformer.min.js"></script>
        <script src="http://cdn-geoweb.s3.amazonaws.com/terraformer-arcgis-parser/1.0.5/terraformer-arcgis-parser.min.js"></script>
        <style>
            html, body {
                margin: 0;
                width: 100%;
                height: 100%;
            }    
            #olmap {
                width:33%;
                height:100%;
            }
            #leafletmap {
                position: absolute;
                left: 33%;
                top: 0%;
                width:33%;
                height:100%;
            }
            #esrimap {
                position: absolute;
                top:0%;
                left: 66%;
                width:33%;
                height:100%;
                margin: 0;
                padding: 0;
            }            
            #searching 
            { margin: 15px 15px 15px 50px; 
              top: 0;
              left: 0;
              position: absolute;
            }
            .ui-autocomplete {
                z-index: 1000;
            }
        </style>
    </head>
    <body>
        <!-- maps containers -->
        <div id="olmap" ></div> 
        <div id="leafletmap" ></div> 
        <div id="esrimap" ></div> 
        <!-- container for IGN_search plugin -->
        <div id = "searching" > </div> 

        <script type="text/javascript">
            // openlayers basic template
            var olmap = new ol.Map({
                target: 'olmap',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([-4, 40]),
                    zoom: 4
                })
            });
            ;
            // layer to draw the GeoJSON feature collection returned by the
            // 'selected' event of IGN.search
            var ollayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: []
                })
            });
            olmap.addLayer(ollayer);

            //leaflet basic template
            var leafletmap = L.map('leafletmap').setView([40, -4], 4);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(leafletmap);
            // layer to draw the GeoJSON feature collection returned by the
            // 'selected' event of IGN.search
            var leafletlayer = L.geoJson().addTo(leafletmap);

            //esri basic template
            require(["esri/map", "./Esri/geojson-layer-js/src/geojsonlayer.js", "dojo/domReady!"], function (Map, GeoJsonLayer) {
                map = new Map("esrimap", {
                    basemap: "topo", //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
                    center: [-4, 40], // longitude, latitude
                    zoom: 4
                });
                // listener for the 'selected' event of IGN.search
                function esrilistener(event, geoJSONfeatureCollection) {
                    // a new layer is appended to the esri map per search
                    var geoJsonLayer = new GeoJsonLayer({
                        data: geoJSONfeatureCollection
                    });
                    map.addLayer(geoJsonLayer);
                }
                // register the listener
                ignsearch.on('searchselected', esrilistener);
            });

            function listener(event, geoJSONfeatureCollection) {
                // openlayers: add features to the layer
                ollayer
                        .getSource()
                        .addFeatures(
                                (new ol.format.GeoJSON())
                                .readFeatures(geoJSONfeatureCollection, {
                                    "dataProjection": 'EPSG:4326',
                                    "featureProjection": olmap.getView()
                                            .getProjection()}));
                // leaflet: add features to the layer
                leafletlayer.addData(geoJSONfeatureCollection);
            }

            // The "searching" div is referenced to call the "search" widget,
            // it is mandatory to use this name for the widget.
            var ignsearch = $('#searching').search({
                selected: listener,
                // geographicNameType collects the types of included geographic
                // names as candidates in the search
                geographicNameType: [
                    'Ciudad con estatuto de autonomía',
                    'Isla administrativa',
                    'Comarca administrativa',
                    'Jurisdicción',
                    'Núcleos de población',
                    'Entidad colectiva',
                    'Entidad menor de población',
                    'Distrito municipal',
                    'Barrio',
                    'Entidad singular',
                    'Construcción/instalación abierta',
                    'Edificación',
                    'Vértice Geodésico',
                    'Hitos de demarcación territorial',
                    'Hitos en vías de comunicación',
                    'Alineación montañosa',
                    'Montaña',
                    'Paso de montaña',
                    'Llanura',
                    'Depresión',
                    'Vertientes',
                    'Comarca geográfica',
                    'Paraje',
                    'Elemento puntual del paisaje',
                    'Saliente costero',
                    'Playa',
                    'Isla',
                    'Otro relieve costero',
                    'Parque Nacional y Natural',
                    'Espacio protegido restante',
                    'Aeropuerto',
                    'Aeródromo',
                    'Pista de aviación y helipuerto',
                    'Puerto de Estado',
                    'Instalación portuaria',
                    'Carretera',
                    'Camino y vía pecuaria',
                    'Vía urbana',
                    'Ferrocarril',
                    'Curso natural de agua',
                    'Masa de agua',
                    'Curso artificial de agua',
                    'Embalse',
                    'Hidrónimo puntual',
                    'Glaciares',
                    'Mar',
                    'Entrante costero y estrecho marítimo',
                    'Relieve submarino'],
                // title to include in the drop down menu 
                titleBox: 'Topónimo o dirección',
                // position an element relative to another see:
                // http://api.jqueryui.com/autocomplete/#option-position
                position: {my: "left top", at: "left bottom"}
            });


        </script>
    </body>
</html>
 (end)
 
 IGN_search widget uses several internal CSS styles defined by default in:
 - //netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css
 - //code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css
 These styles may be overridden to suit custom design needs.
 
 To apply new styles, some knowledge of the widget HTML output is required. 
 
 The following code is generated as the HTML rendering of the widget.
 
 Class attributes mark styles to be overridden.
 
 >	 '<div class="input-group">'
 >       '<label for="searchterms" class="sr-only">&nbsp;</label>'
 >       '<input type="text" class="form-control ui-widget"/>'
 >       '</div>'
 
 
 */
(function ($) {

    // const to use later
    var origins = {
        "idee": 'idee',
        "services": 'services'
    };

    var url_services_candidates = 'http://www.cartociudad.es/geocoder/api/geocoder/candidatesJsonp';
    var url_services_find = 'http://www.cartociudad.es/geocoder/api/geocoder/findJsonp';

    var url_idee_prefix = 'http://www.idee.es/';
    var url_idee_search_assistant = 'http://www.idee.es/communicationsPoolServlet/SearchAssistant';
    var url_idee_dispatcher = 'http://www.idee.es/communicationsPoolServlet/Dispatcher';

    var ign_search_version = '0.0.3';

    //check if Wkt has been loaded previously
    var wkt_src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'componentes.ign.es/NucleoVisualizador/js/wicket.js'
    window.Wkt || document.write('<script src="' + wkt_src + '"><\/script>');

    $.widget("IGN.search", {
        options: {
            "geographicNameType": ['Estado',
                'Comunidad autónoma',
                'Ciudad con estatuto de autonomía',
                'Provincia',
                'Municipio',
                'EATIM',
                'Isla administrativa',
                'Comarca administrativa',
                'Jurisdicción',
                'Capital de Estado',
                'Capital de comunidad autónoma y ciudad con estatuto de autonomía',
                'Capital de provincia',
                'Capital de municipio',
                'Capital de EATIM',
                'Núcleos de población',
                'Entidad colectiva',
                'Entidad menor de población',
                'Distrito municipal',
                'Barrio',
                'Entidad singular',
                'Construcción/instalación abierta',
                'Edificación',
                'Vértice Geodésico',
                'Hitos de demarcación territorial',
                'Hitos en vías de comunicación',
                'Alineación montañosa',
                'Montaña',
                'Paso de montaña',
                'Llanura',
                'Depresión',
                'Vertientes',
                'Comarca geográfica',
                'Paraje',
                'Elemento puntual del paisaje',
                'Saliente costero',
                'Playa',
                'Isla',
                'Otro relieve costero',
                'Parque Nacional y Natural',
                'Espacio protegido restante',
                'Aeropuerto',
                'Aeródromo',
                'Pista de aviación y helipuerto',
                'Puerto de Estado',
                'Instalación portuaria',
                'Carretera',
                'Camino y vía pecuaria',
                'Vía urbana',
                'Ferrocarril',
                'Curso natural de agua',
                'Masa de agua',
                'Curso artificial de agua',
                'Embalse',
                'Hidrónimo puntual',
                'Glaciares',
                'Mar',
                'Entrante costero y estrecho marítimo',
                'Relieve submarino'],
            "titleBox": '',
            "position": {my: "left top", at: "left bottom", collision: "none"},
            "minLength": 0,
            "timeout": 3000,
            "maxResultsPerRequest": 10,
            "namedplacenotfound": function (data) {
                // if this option is not override and the event listener is
                // attached later then it could be find like this
                if (!jQuery._data(this, "events").searchnamedplacenotfound) {
                    // there is not any additional listeners
                    var msg = 'Named place not found';
                    if (data.errorThrown) {
                        msg = msg + '\nError: ' + data.textStatus;
                    }
                    alert(msg);
                }
            },
            "addressnotfound": function (event, data) {
                // if this option is not override and the event listener is
                // attached later then it could be find like this
                if (!jQuery._data(this, "events").searchaddressnotfound) {
                    // there is not any additional listeners
                    var msg = 'Address not found';
                    if (data.errorThrown) {
                        msg = msg + '\nError: ' + data.textStatus;
                    }
                    alert(msg);
                }
            }
        },
        /*
         Private Function: _create
         
         Create a "search" widget instance with the default options.
         Enable autocomplete functionality to search and select the returned place names or address candidates from IDEE and CartoCiudad services   
         
         Returns:
         
         Default geographicNameType option is loaded in the widget context.
         Input text HTML object is created.
         
         */
        _create: function () {

            //search box
            this.element.html(
                    '<div class="apiIgn-inputGroup">' +
                    '<label for="searchterms" class="apiIgn-sr-only">&nbsp;</label>' +
                    '<input type="text" class="apiIgn-busquedasIGN ui-widget" placeholder="' + this.options.titleBox + '"/>' +
                    '</div>');

            //link to the input text box a jquery ui autocomplete
            this.element.find("input").autocomplete({
                "source": this._source.bind(this),
                "select": this._select.bind(this)
            });
            //minLength option for autocomplete
            if (this.options.hasOwnProperty("minLength")) {
                this.element.find("input").autocomplete("option", "minLength", this.options.minLength);
            }
            //position option for autocomplete
            if (this.options.hasOwnProperty("position")) {
                this.element.find("input").autocomplete("option", "position", this.options.position);
            }

        },
        /*
         Private Function: _source
         
         Provide autocompleted candidates to be selected in the input text.
         
         Parameters:
         
         request - Input geographic name or address in the text input.
         response - Possible autocomplete candidates for input geographic name and address. The candidates are shown in a pull-down menu. 
         
         Returns:
         
         List of candidates searched from IDEE and CartoCiudad services.
         
         */

        _source: function (request, response) {
            // save a reference to some options
            var geographicNameType = this.options.geographicNameType;
            var timeout = this.options.timeout;
            var maxResultsPerRequest = this.options.maxResultsPerRequest;
            var trigger = this._trigger.bind(this);
            var that = this;

            function services() {

                // create a promise to resolve always even if the request fails
                var pCartoCiudad = jQuery.Deferred();
                $.ajax({
                    "url": url_services_candidates,
                    "dataType": 'jsonp',
                    "crossDomain": true,
                    "data": {
                        no_process: 'municipio,poblacion,toponimo',
                        limit: maxResultsPerRequest,
                        q: request.term,
                        countrycode: 'es',
                        autocancel: 'true'
                    },
                    "timeout": timeout,
                    beforeSend: function (xhr) {
                        if (typeof that.lastServicesRequest !== 'undefined') {
                            that.lastServicesRequest.abort();
                        }
                        that.lastServicesRequest = xhr;
                    }
                }).then(function (data, textStatus, jqXHR) {
                    // request was succesful:
                    // for every address
                    var suggestionsCartoCiudad = $.map(data, function (item) {
                        // create value and label for input 
                        // and specify the source
                        item.value = item.address;
                        item.origin = origins.services;
                        item.label = item.address;
                        return item;
                    });
                    // resolve the promise with suggestions
                    pCartoCiudad.resolve(suggestionsCartoCiudad);
                }, function (jqXHR, textStatus, errorThrown) {
                    // request fails or the response is not well formed
                    console.warn(textStatus + ':', errorThrown.message);
                    // resolve the promise with no suggestions
                    pCartoCiudad.resolve([]);
                });

                return pCartoCiudad;
            }

            function idee() {

                // create a promise to resolve always even if the request fails
                var pIdee = jQuery.Deferred();
                $.ajax({
                    url: url_idee_search_assistant,
                    dataType: 'jsonp',
                    crossDomain: true,
                    data: {maxresults: maxResultsPerRequest, name_equals: request.term},
                    timeout: timeout,
                    beforeSend: function (xhr) {
                        if (typeof that.lastIdeeRequest !== 'undefined') {
                            that.lastIdeeRequest.abort();
                        }
                        that.lastIdeeRequest = xhr;
                    }

                }).then(function (data, textStatus, jqXHR) {
                    // request was succesful
                    // for every namedplace
                    var suggestionsIdee = [];
                    // sometimes the service gives nothing
                    if (data && data.results) {
                        var suggestionsIdee = $.map(data.results, function (item) {
                            // avoid namedplaces not included in the 
                            // geographicNameType list option
                            if (geographicNameType.indexOf(item.type) < 0) {
                                return null;
                            }
                            // create value and label for input 
                            // and specify the source
                            item.value = item.title;
                            item.label = item.title + ' (' + item.type + ')';
                            if (item.municipality && item.municipality !== item.title) {
                                item.label = item.label + ' en ' + item.municipality;
                            }
                            item.origin = origins.idee;
                            return item;
                        });
                    }
                    // move namedplaces of type 'Núcleos de población' to top
                    for (var i = suggestionsIdee.length - 1; i > 0; i--) {
                        if (suggestionsIdee[i].type === 'Núcleos de población') {
                            suggestionsIdee = (suggestionsIdee.splice(i, 1))
                                    .concat(suggestionsIdee);
                        }
                    }
                    // resolve the promise with suggestions
                    pIdee.resolve(suggestionsIdee);

                }, function (jqxhr, textStatus, errorThrown) {
                    // request fails
                    console.warn(textStatus + ':', errorThrown.message);
                    // resolve the promise with no suggestions
                    pIdee.resolve([]);
                });

                return pIdee;

            }

            // when request to IDEE and CartoCiudad services are finished
            // combine the results

            jQuery.when(services(), idee())
                    .done(function (sCartoCiudad, sIdee) {
                        // combine the results of the requests
                        var suggestions = sIdee.concat(sCartoCiudad);
                        response(suggestions);
                        trigger('candidatesquerydone', null, {
                            "term": request.term,
                            "suggestions": suggestions
                        });
                    });
        },
        /*
         Private Function: _select
         
         Triggered when a candidate is selected from the pull-down menu.
         The input text field's value is replaced with the option selected.
         
         Parameters:
         
         event - selection event.
         ui - object that contains an item object for the selected option with label, value and origin properties.  
         
         Returns:
         
         A FeatureCollection to represent the coordinates of the selected geographic name or address.
         
         */
        _select: function (event, ui) {
            // save a reference to some options and methods
            var timeout = this.options.timeout;
            var trigger = this._trigger.bind(this);
            var geoJSONFeatureSeed = this._geoJSONFeatureSeed;
            var geoJSONFeatureCollectionSeed = this._geoJSONFeatureCollectionSeed;

            switch (ui.item.origin) {
                case origins.idee:
                    var ideeRequest = $.ajax({
                        "url": url_idee_dispatcher,
                        "dataType": 'jsonp',
                        "crossDomain": true,
                        data: {
                            "request": 'OpenQuerySource',
                            "query": '<ogc:Filter><ogc:FeatureId fid="' + ui.item.id + '"/></ogc:Filter>',
                            "sourcename": url_idee_prefix + 'communicationsPoolServlet/sourceAccessWFS-INSPIRE-NGBE.rdf',
                            "outputformat": 'application/json'
                        },
                        "timeout": timeout
                    });
                    ideeRequest.then(function (data, textStatus, jqXHR) {
                        var geoJSONFeatureCollection = geoJSONFeatureCollectionSeed();
                        if (data && data.results) {
                            var geoJSONFeature = geoJSONFeatureSeed();
                            for (var key in data.results[0]) {
                                switch (key) {
                                    case 'srs':
                                        geoJSONFeature.crs.properties.name =
                                                data.results[0][key];
                                        break;
                                    case 'latlon':
                                        //
                                        null;
                                        break;
                                    case 'location':
                                        //format coordinates from lat lon to lon lat
                                        geoJSONFeature.geometry = {
                                            type: 'Point',
                                            coordinates: data.results[0][key].split(" ").reverse()
                                        };
                                        geoJSONFeature.geometry.coordinates[0] = parseFloat(geoJSONFeature.geometry.coordinates[0]);
                                        geoJSONFeature.geometry.coordinates[1] = parseFloat(geoJSONFeature.geometry.coordinates[1]);
                                        break;
                                    case 'type':
                                        geoJSONFeature.properties[key] = ui.item.type;
                                        geoJSONFeature.properties['typeInspire'] = data.results[0][key];
                                        break;
                                        //by default a property is generated containing a Feature type for every JSON attribute object
                                    default:
                                        geoJSONFeature.properties[key] = data.results[0][key];
                                }
                            }
                            geoJSONFeature.properties['municipality'] = ui.item.municipality;
                            geoJSONFeatureCollection
                                    .features.push(geoJSONFeature);
                            trigger('selected', null, geoJSONFeatureCollection);
                        } else {
                            //no data or no data.results in response
                            trigger('namedplacenotfound', null, {
                                "item": ui.item,
                                "data": data,
                                "jqxhr": jqXHR,
                                "textStatus": textStatus
                            });
                        }
                    }, function (jqXHR, textStatus, errorThrown) {
                        // request fails or response is not well formed
                        console.error(textStatus + ':', errorThrown.message);
                        trigger('namedplacenotfound', null, {
                            "item": ui.item,
                            "jqxhr": jqXHR,
                            "textStatus": textStatus,
                            "errorThrown": errorThrown});
                    });
                    break;
                case origins.services:
                    var cartociudadRequest = $.ajax({
                        "url": url_services_find,
                        "dataType": 'jsonp',
                        "crossDomain": true,
                        "data": {
                            "q": ui.item.value,
                            "type": ui.item.type,
                            "tip_via": ui.item.tip_via,
                            "id": ui.item.id,
                            "portal": ui.item.portalNumber
                        },
                        "timeout": timeout
                    });
                    cartociudadRequest.then(function (data, textStatus, jqXHR) {
                        //when the request is processed a FeatureCollection is generated
                        var geoJSONFeatureCollection = geoJSONFeatureCollectionSeed();
                        var geoJSONFeature = geoJSONFeatureSeed();

                        for (var key in data) {
                            switch (key) {
                                case 'geom':
                                    //convert WKT results format into GeoJSON Features
                                    var wktFormat = new Wkt.Wkt();
                                    var feature = wktFormat.read(data[key]);
                                    geoJSONFeature.geometry = wktFormat.toJson(feature);

                                    break;
                                case 'lat':
                                case 'lng':
                                    null;
                                    break;
                                default:
                                    geoJSONFeature.properties[key] = data[key];
                            }
                        }

                        geoJSONFeatureCollection.features.push(geoJSONFeature);
                        trigger('selected', null, geoJSONFeatureCollection);

                    }, function (jqXHR, textStatus, errorThrown) {
                        // request fails
                        console.error(textStatus + ':', errorThrown.message);
                        trigger('addressnotfound', null, {
                            "item": ui.item,
                            "jqxhr": jqXHR,
                            "textStatus": textStatus,
                            "errorThrown": errorThrown});
                    });
                    break;
                default:
                    null;
            }

        },
        /*
         Function: search
         
         Overwrite autocomplete search method
         
         Parameters:
         
         value - input value to autocomplete search method.
         
         */
        search: function (value) {
            this.element.find('input.apiIgn-busquedasIGN').autocomplete('search', value);
        },
        /*
         Function: close
         
         Overwrite autocomplete close method
         */
        close: function () {
            this.element.find('input.apiIgn-busquedasIGN').autocomplete('close');
        },
        /*
         * Returns an empty geoJSON FeatureCollection Object
         * @returns {GeoJSON FeatureCollection Object}
         */
        _geoJSONFeatureCollectionSeed: function () {
            return {
                type: "FeatureCollection",
                features: []
            };
        },
        /*
         * Returns an empty geoJSoN Feature object
         * By default all the sources return geometries in EPSG:4258 CRS
         * @returns {GeoJSON Feature Object}
         */
        _geoJSONFeatureSeed: function () {
            return {
                type: 'Feature',
                crs: {
                    type: 'name',
                    properties: {
                        name: 'urn:ogc:def:crs:EPSG::4258'
                    }
                },
                geometry: {
                },
                properties: {
                }
            };
        },
        _destroy: function () {
            this.element.empty();
        }

    });

})(jQuery);
