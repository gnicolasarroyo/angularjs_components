/**
 * Map Component is based Google Maps API
 *
 * @author      G. Nicolas Arroyo <g.nicolas.arroyo> || @gnicoarr
 * @license     MIT
 */

 
'use strict';


angular.module('yourapp.module').factory('MapComponent', [ function () {
    
    var _map, _indicators, _marker_icon, _temp_marker; 

    /* set div#map_canvas content */
    _map = new google.maps.Map(document.getElementById('map_canvas'), {
	    center: new google.maps.LatLng(0, 0),
	    zoom: 2,
	    mapTypeId: google.maps.MapTypeId.HYBRID
	});
    
    _indicators = [];
    
    /* define marker icon */
    _marker_icon = {
		INDICATOR: 	'/img/indicator_marker_32x32.png'
        /* OTHER_TYPE ... */
	};

	_temp_marker = new google.maps.Marker({
		position: new google.maps.LatLng(0, 0),
		map: null
	});

    return {
    	reset: function () {
    		_indicators.forEach(function (item, index, array) {
    			item.setMap(null);
    		});
    		
    		_indicators = [];

    		_temp_marker.setPosition(new google.maps.LatLng(0, 0));
			
			_temp_marker.setMap(null);

			_map.setCenter(new google.maps.LatLng(0, 0));
			
			_map.setZoom(1);

            google.maps.event.clearListeners(_map, 'click')
    	},
    	hide: function () {
    		document.getElementById("map_canvas").style.display="none"; 
    	},
    	show: function () {
    		document.getElementById("map_canvas").style.display="block";
    	},
    	setZoom: function (zoom_level) {
    		_map.setZoom(zoom_level);
    	},
    	setCenter: function (lat, lng) {
    		_map.setCenter(new google.maps.LatLng(lat, lng));
    	},
    	getIndicators: function () {
    		return _indicators;
    	},
    	addIndicator: function (lat, lng) {
    		_indicators.push(new google.maps.Marker({
    			position: 	new google.maps.LatLng(lat, lng),
    			map: 		_map,
    			icon: 		_marker_icon.INDICATOR
    		}));
    	},
    	removeIndicator: function (marker) {
    		_indicators.splice(marker, 1);
    	},
    	showMarkerOnClick: function (callback) {
    		google.maps.event.addListener(_map, 'click', function (e) {
				_temp_marker.setPosition(e.latLng);
				_temp_marker.setMap(_map);
                if (callback) callback(e.latLng);
			});
    	},
    	getMarkerPosition: function () {
    		return {
    			lat: _temp_marker.getPosition().lat(),
    			lng: _temp_marker.getPosition().lng()
    		};
    	},
        setMarkerPosition: function (lat, lng) {
            _temp_marker.setPosition(new google.maps.LatLng(lat, lng));
            _temp_marker.setMap(_map);
        }
    };
}]);