/**
 * Geocoder Component is based Google Maps API
 *
 * @author      G. Nicolas Arroyo <g.nicolas.arroyo> || @gnicoarr
 * @license     MIT
 */


'use strict';


angular.module('yourapp.module').factory('GeocoderComponent', [ function () {

	var _geocoder;

	_geocoder = new google.maps.Geocoder();

	return {
		search: function (address, success, error) {
			_geocoder.geocode( { 'address': address}, function (results, status) {
			    if (status == google.maps.GeocoderStatus.OK) {
			       if (success) success(results);
			       else return results;
			    } else {
			      if (error) error('Geocode was not successful for the following reason: ' + status);
			    }
			});
		}
	};
}]);