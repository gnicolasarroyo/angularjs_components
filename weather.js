/**
 * Weather Component is based Wunderground API
 *
 * @author      G. Nicolas Arroyo <g.nicolas.arroyo> || @gnicoarr
 * @license     MIT
 */


'use strict';


angular.module('yourapp.module').factory('WeatherComponent', [ '$http', function ($http) {

	var _apikey, 
		_position, 
		_condition_param, 
		_forecast_param, 
		_hourly_param, 
		_history_param,
		_yesterday_param, 
		_temp_url, 
		_base_url;


	_apikey = 'YOUR_API_KEY';

	_position = { latitude: 0, longitude: 0 };

	_condition_param = 'conditions';

	_forecast_param = 'forecast10day';

	_hourly_param = 'hourly10day';

	_history_param = 'history_:YYYYMMDD';

	_yesterday_param = 'yesterday';

	_temp_url = '';

	_base_url = '//api.wunderground.com/api/:apikey/:params/q/:latitude,:longitude.json?callback=JSON_CALLBACK';

	
	function getResults (params, success, error) {
		_temp_url = _base_url
			.replace(':apikey', _apikey)
			.replace(':params', params.join('/'))
			.replace(':latitude', _position.latitude)
			.replace(':longitude', _position.longitude);
		
		console.log(_temp_url);

		$http({ method: 'JSONP', url: _temp_url }).
		    success(function(data, status, headers, config) {
		      	if (success) success(data, status, headers, config);
		    }).
		    error(function(data, status, headers, config) {
		      	if (error) error(data, status, headers, config);
		    });
	}


	function historyGetDate(number) {
		var today, d;

		function pad(s) { 
			return (s < 10) ? '0' + s : s; 
		}

		today = new Date();
		d = new Date(today.getTime() - (number * 24 * 3600 * 1000));

		// Format YYYYMMDD
		return [ d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate()) ].join('');
	}
	

	return {
		setPosition: function (lat, lng) {
			_position = { latitude: lat, longitude: lng };
		},
		getAll: function (success, error) {
			getResults([
				_condition_param, 
				_forecast_param,
				_hourly_param
				], success, error);
		},
		getCondition: function (success, error) {
			getResults([ _condition_param ], success, error);
		},
		getForecast: function (success, error) {
			getResults([ _forecast_param ], success, error);
		},
		getHourly: function (success, error) {
			getResults([ _hourly_param ], success, error);
		},
		getHistory: function (success, error) {
			getResults([ 
				_history_param.replace(':YYYYMMDD', historyGetDate(30)) 
				], success, error);
		},
		getYesterday: function (success, error) {
			getResults([ _yesterday_param ], success, error);
		}
	};

}]);