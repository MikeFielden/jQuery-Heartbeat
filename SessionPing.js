(function ($, window, document) {
	var methods,
			timeout,
			defaults = {
				time: 15* 60 * 1000, // time in miliseconds 15 mins in this case
				address: ''
			},
			settings;

	methods = {
		init: function (input) {
			settings = $.extend(true, {}, defaults, input);
      
      if (!settings.address) { 
        throw new Error ("No url address was specified.");
      }
      
      // Call the request method
			_local.request.call(this);
		},

		methods: function () {
			return methods;
		}
	};

	_local = {
		request: function () {
			// Clears the timer set with setTimeout()
			clearTimeout(timeout);
      
      // TODO: change this to be non jsonWebservice
      // TODO: make use of deferreds
      // TODO: Allow user to pass in what to do onError
			$.jsonWebService({
				url: settings.address,
				data: {},
				success: function (result) {
					timeout = setTimeout(_local.request, settings.time);
				},
				error: function (err) {
					$.notification({
						attachTo: '#titleBarContainer',
						position: { top: '1px' },
						type: 'Warning',
						displayMessage: 'Session Ping failed.'
					});
				}
			});
		}
	};

	$.sessionPing = function () {
		return this.methodCaller("sessionPing", methods, arguments);
	};

})(jQuery, window, document);
