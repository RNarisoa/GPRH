/**
 * A mixin version of front-end request methods. It returns Promises,
 * but also keeps track of ongoing requests and cancels them all when the component
 * performing them is destroyed.
 *
 * This mixin should only be used for observable components, which have a 'destroy'
 * signal. It should also be the only requesting infrastructure used by such
 * components.
 *
 * Indeed, this class exists to prevent bugs whereby a widget performs a request,
 * is destroyed before it completes, and the callback of the request attempts to
 * access properties or methods of the widget which no longer exist. Such bugs can
 * destroy the entire UI.
 *
 * 
 */
Ext.define('Gprh.ades.util.RequestCapable', {

	requires: [
		'Gprh.ades.util.Helper',
	],

	/**
	 * Initialises the {@link Gprh.ades.util.RequestCapable} API by creating a store
	 * for request cancellation tokens, and by listening to the callee's destroy signal
	 * so it may cancel pending requests when it gets destroyed.
	 * @return {undefined}
	 * @throws Error if the callee is not observable.
	 * @private
	 */
	requestInit() {
		if (!this.isObservable) {
			throw new Error('Gprh.ades.util.RequestCapable::init(): The Gprh.ades.util.RequestCapable API is only compatible with ' 
				+ `observable components. ${this.$className} is not observable. Please add the observable mixin to your class, or `
				+ 'use the Gprh.ades.util.Request API instead (you will need to check that objects used in your callback have not '
				+ 'been destroyed since).');
		}

		/* Init the token store. */
		if (!this.requestTokens) {
			this.requestTokens = [];
		}

		/* Init the destroy listener. */
		if (this.requestCancellationListener === undefined) {
			this.requestCancellationListener = this.mon(this, 'destroy', () => {
				if (this.requestTokens) {
					// this.requestTokens.forEach(token => token.cancel());
				}
				this.requestTokens = null;
			}, this, {
				single: true,
			});
		}
	},

	/**
	 * Adds a cancellation token for a pending request.
	 * @param {Object} token the cancellation token.
	 * @param {Object} token.request the {@link Ext.Ajax} request object.
	 * @param {Object} token.cancel the method which, upon being called, cancels the request.
	 * @return {undefined}
	 * @private
	 */
	requestAddToken(token) {
		this.requestTokens.push(token);
	},

	/**
	 * Removes a cancellation token for a request whose callback has been run.
	 * @param {Object} token the cancellation token.
	 * @param {Object} token.request the {@link Ext.Ajax} request object.
	 * @param {Object} token.cancel the method which, upon being called, cancels the request.
	 * @return {undefined}
	 * @private
	 */
	requestRemoveToken(token) {
		this.requestTokens = this.requestTokens.filter(inner => inner !== token);
	},

	/**
	 * Shows the object's loading mask, unless the user asked explicitly not to
	 * by setting loadMask to false in the options, or unless the calling
	 * object is not a maskable component. The loading mask will either display
	 * the string passed as loadMaskMsg in the options, or an appropriate default
	 * message for the type of request.
	 * @param {Object} config the object passed to {@link #requestCreatePromise}.
	 * @return {undefined}
	 * @throws Error if the callee object asked for a mask by setting loadMask to true, but is not maskable.
	 * @private
	 */
	requestShowMask(config) {
		if (this.requestShouldShowMask(config)) {
			this.showMask(config.loadMaskMsg);
		}
	},

	/**
	 * Hides the component's loading mask, if one had been shown.
	 * @param {Object} config the object passed to {@link #requestCreatePromise}.
	 * @return {undefined}
	 * @throws Error if the callee object asked for a mask by setting loadMask to true, but is not maskable.
	 * @private
	 */
	requestHideMask(config) {
		if (this.requestShouldShowMask(config)) {
			this.hideMask();
		}
	},

	/**
	 * Determines whether a loading mask should be shown for a given request.
	 * @param {Object} config the object passed to {@link #requestCreatePromise}.
	 * @return {Boolean} true if a mask should be shown, false otherwise.
	 * @throws Error if the callee object asked for a mask by setting loadMask to true, but is not maskable.
	 * @private
	 */
	requestShouldShowMask(config) {
		/* True by default for maskables. */
		if (this.isMaskable) {
			return !(config.showMask === false);
		}

		/* Non-maskables may not show a mask, this is a developer error. */
		if (config.showMask) {
			throw new Error('Gprh.ades.util.RequestCapable::hasShowMask(): your class '
				+ 'is not maskable, but you passed the showMask option to your request. '
				+ 'This is not supported. Please use the maskable mixin or change your '
				+ 'request parameters.');
		}

		return false;
	},

	/**
	 * If requested by the user through use of the showNotification option, shows a
	 * success notification using either of option.successMsg or the default success
	 * message for the type of request being performed. If showNotification is not
	 * true, does nothing.
	 * @param {Object} config the object passed to {@link #requestCreatePromise}.
	 * @return {undefined}
	 * @private
	 */
	requestShowSuccessNotification(config) {
		if (config.showNotification) {
			Gprh.ades.util.notification.Helper.showSuccess(config.successMsg);
		}
	},

	/**
	 * If requested by the user through use of the showNotification option, shows a
	 * failure notification using either of option.failureMsg or the default failure
	 * message for the type of request being performed. If showNotification is not
	 * true, does nothing.
	 * @param {Object} config the object passed to {@link #requestCreatePromise}.
	 * @return {undefined}
	 * @private
	 */
	requestShowFailureNotification(config) {
		if (config.showNotification) {
			Gprh.ades.util.notification.Helper.showFailure(config.failureMsg);
		}
	},

	/**
	 * Creates a Promise embedding an Ajax call via {@link Ext.Ajax#request}. Ensures the promise is cancellable.
	 * @param {Object} config see {@link #requestAjax}.
	 * @param {?Boolean} returnDataOnly whether to return only the data property of the response (which is the desired behaviour for
 	 * model.* functions) or the whole decoded response text (desired behaviour for {@link #requestAjax}). True by default.
	 * @return {Promise} a promise which gets resolved when the request completes or rejected when it fails or is cancelled.
	 * @private
	 */
	requestCreatePromise(config, returnDataOnly = true) {
		this.requestInit();
		this.requestShowMask(config);
		const token = {};
		let decodedData;
		token.request = Ext.Ajax.request({
			url: config.url,
			async: false,
			params: config.params,
			scope: this,
			success: (response) => {
				this.requestHideMask(config);
				this.requestShowSuccessNotification(config);
				const decoded = Ext.decode(response.responseText);
				// resolve.call(this, returnDataOnly ? decoded.data : decoded);
				decodedData = returnDataOnly ? decoded.data : decoded;
				this.requestRemoveToken(token);
			},
			failure: (response) => {
				this.requestHideMask(config);
				this.requestShowFailureNotification(config);
				// reject.call(this, response.status);
				token.response = response.status;
				this.requestRemoveToken(token);
			},
		});
		token.cancel = () => {
			Ext.Ajax.abort(token.request);
			// reject(new Error('Cancelled'));
		};
		Ext.apply(token, {
			res: decodedData,
		});
		this.requestAddToken(token);

		return token;
	},

	/**
	 * Searches entities for the given model.
	 * @param {String} link the server url to retrieve data.
	 * @param {Object} model the ViewTP 2 or 2.5 model describing the desired data.
	 * @param {Object} options the request options:
	 * @param {Boolean} options.showMask whether to show a loading mask (requires that your class is a {@link Gprh.ades.util.Maskable}).
	 * @param {String}  options.loadMaskMsg the message to show in the mask (one will be provided by default if ignored).
	 * @param {Boolean} options.showNotification whether to show a notification upon success or failure.
	 * @param {String}  options.successMsg the message to show in the success notification (one will be provided by default if ignored).
	 * @param {String}  options.failureMsg the message to show in the failure notification (one will be provided by default if ignored).
	 * @return {Promise} a promise which gets resolved when the request completes or rejected when it fails or is cancelled.
	 * @public
	 */
	requestSearch(link, model, options = {}) {
		const config = {
			url: link,
			params: {
				model: Ext.JSON.encode(model),
			},
			loadMaskMsg: 'Loading',
			successMsg: 'Data Successfully Loaded',
			failureMsg: 'Failed to load data',
		};
		const ret = this.requestCreatePromise(Ext.apply(config, options));

		return ret;
	},

	/**
	* @param {String} link the server url to retrieve data.
 	* @param {Object} data the data to save in ViewTP 2 or 2.5 format.
 	 * @param {Object} options the request options:
 	 * @param {Boolean} options.showMask whether to show a loading mask (requires that your class is a {@link Gprh.ades.util.Maskable}).
 	 * @param {String}  options.loadMaskMsg the message to show in the mask (one will be provided by default if ignored).
 	 * @param {Boolean} options.showNotification whether to show a notification upon success or failure.
 	 * @param {String}  options.successMsg the message to show in the success notification (one will be provided by default if ignored).
 	 * @param {String}  options.failureMsg the message to show in the failure notification (one will be provided by default if ignored).
 	 * @return {Promise} a promise which gets resolved when the request completes or rejected when it fails or is cancelled.
 	 * @public
 	 */
	requestSaveOrUpdate(link, data, options = {}) {
		const config = {
			url: link,
			params: {
				model: Ext.JSON.encode(data),
			},
			loadMaskMsg: 'Data Recording',
			successMsg: 'Data Successfully Saved',
			failureMsg: 'Failed to save data',
		};
		const ret = this.requestCreatePromise(Ext.apply(config, options));

		return ret;
	},

	/**
  	 * Deletes entities using the given list of ids.
  	 * @param {String} link the server url.
 	 * @param {Integer[]} ids an array containing the IDs of entities to delete.
  	 * @param {Object} options the request options:
  	 * @param {Boolean} options.showMask whether to show a loading mask (requires that your class is a {@link Gprh.ades.util.Maskable}).
  	 * @param {String}  options.loadMaskMsg the message to show in the mask (one will be provided by default if ignored).
  	 * @param {Boolean} options.showNotification whether to show a notification upon success or failure.
  	 * @param {String}  options.successMsg the message to show in the success notification (one will be provided by default if ignored).
  	 * @param {String}  options.failureMsg the message to show in the failure notification (one will be provided by default if ignored).
  	 * @return {Promise} a promise which gets resolved when the request completes or rejected when it fails or is cancelled.
  	 * @public
  	 */
	requestDelete(link, ids, options = {}) {
		const config = {
			url: link,
			params: {
				model: Ext.JSON.encode(ids),
			},
			loadMaskMsg: 'Delete In Progress',
			successMsg: 'Delete Success',
			failureMsg: 'Failed to delete',
		};
		const ret = this.requestCreatePromise(Ext.apply(config, options));

		return ret;
	},

	/**
	 * Performs a generic AJAX request via {@link Ext.Ajax#request}, with the particularity that
	 * the return value of this function is a Promise to which request callbacks should be attached.
	 *
	 * @param {Object} options An object which may contain any of the properties supported by {@link Ext.Ajax#request},
	 * except for callback, success and failure which must be implemented via the returned Promise, and scope which is
	 * useless in the context of Promise callbacks. It also contains options for controlling loading masks and
	 * notifications, present in all methods exposed by this API.
     *
     * @param {String/Function} options.url The URL to which to send the request, or a function
     * to call which returns a URL string. The scope of the function is specified by the `scope` option.
     * Defaults to the configured `url`.
     *
     * @param {Object/String/Function} options.params An object containing properties which are
     * used as parameters to the request, a url encoded string or a function to call to get either. The scope
     * of the function is specified by the `scope` option.
     *
     * @param {String} options.method The HTTP method to use
     * for the request. Defaults to the configured method, or if no method was configured,
     * "GET" if no parameters are being sent, and "POST" if parameters are being sent.  Note that
     * the method name is case-sensitive and should be all caps.
     *
     * @param {Number} options.timeout The timeout in milliseconds to be used for this request.
     * Defaults to 30 seconds.
     *
     * @param {Ext.Element/HTMLElement/String} options.form The `<form>` Element or the id of the `<form>`
     * to pull parameters from.
     *
     * @param {Boolean} options.isUpload **Only meaningful when used with the `form` option.**
     *
     * True if the form object is a file upload (will be set automatically if the form was configured
     * with **`enctype`** `"multipart/form-data"`).
     *
     * File uploads are not performed using normal "Ajax" techniques, that is they are **not**
     * performed using XMLHttpRequests. Instead the form is submitted in the standard manner with the
     * DOM `<form>` element temporarily modified to have its [target][] set to refer to a dynamically
     * generated, hidden `<iframe>` which is inserted into the document but removed after the return data
     * has been gathered.
     *
     * The server response is parsed by the browser to create the document for the IFRAME. If the
     * server is using JSON to send the return object, then the [Content-Type][] header must be set to
     * "text/html" in order to tell the browser to insert the text unchanged into the document body.
     *
     * The response text is retrieved from the document, and a fake XMLHttpRequest object is created
     * containing a `responseText` property in order to conform to the requirements of event handlers
     * and callbacks.
     *
     * Be aware that file upload packets are sent with the content type [multipart/form][] and some server
     * technologies (notably JEE) may require some custom processing in order to retrieve parameter names
     * and parameter values from the packet content.
     *
     * [target]: http://www.w3.org/TR/REC-html40/present/frames.html#adef-target
     * [Content-Type]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
     * [multipart/form]: http://www.faqs.org/rfcs/rfc2388.html
     *
     * @param {Object} options.headers Request headers to set for the request.
     * The XHR will attempt to set an appropriate Content-Type based on the params/data passed
     * to the request. To prevent this, setting the Content-Type header to `null` or `undefined`
     * will not attempt to set any Content-Type and it will be left to the browser.
     *
     * @param {Object} options.xmlData XML document to use for the post. Note: This will be used instead
     * of params for the post data. Any params will be appended to the URL.
     *
     * @param {Object/String} options.jsonData JSON data to use as the post. Note: This will be used
     * instead of params for the post data. Any params will be appended to the URL.
     *
     * @param {Array} options.binaryData An array of bytes to submit in binary form. Any params will be
	 * appended to the URL. If binaryData is present, you must set {@link Ext.data.Connection#binary binary}
	 * to <tt>true</tt> and options.method to <tt>POST</tt>.
     *
     * @param {Boolean} options.disableCaching True to add a unique cache-buster param to GET requests.
     *
     * @param {Boolean} options.withCredentials True to add the withCredentials property to the XHR object
     *
     * @param {Boolean} options.binary True if the response should be treated as binary data.  If true, the binary
     * data will be accessible as a "responseBytes" property on the response object.
	 *
	 * @param {Boolean} options.showMask whether to show a loading mask (requires that your class is a {@link Gprh.ades.util.Maskable}).
	 *
	 * @param {String}  options.loadMaskMsg the message to show in the mask (one will be provided by default if ignored).
	 *
	 * @param {Boolean} options.showNotification whether to show a notification upon success or failure.
	 *
	 * @param {String}  options.successMsg the message to show in the success notification (one will be provided by default if ignored).
	 *
	 * @param {String}  options.failureMsg the message to show in the failure notification (one will be provided by default if ignored).
	 *
	 * @return {Promise} a promise that will resolve when the request succeeds, or reject when it is cancelled or fails.
	 * @throws Error if no options are passed, or if the options contain one of the forbidden parameters. Also throws any
	 * error that might be thrown by {@link Ext.Ajax#request}.
	 * @public
	 */
	requestAjax(options) {
		if (!options) {
			throw new Error("Gprh.ades.util.RequestCapable::requestAjax(): missing 'options' parameter.");
		}
		if (options.callback) {
			throw new Error("Gprh.ades.util.RequestCapable::requestAjax(): the 'callback' option is not supported by this API. "
				+ 'Please use the Promise returned by this function instead.');
		}
		if (options.success) {
			throw new Error("Gprh.ades.util.RequestCapable::requestAjax(): the 'success' option is not supported by this API. "
				+ 'Please use the Promise returned by this function instead.');
		}
		if (options.failure) {
			throw new Error("Gprh.ades.util.RequestCapable::requestAjax(): the 'failure' option is not supported by this API. "
				+ 'Please use the Promise returned by this function instead.');
		}
		if (options.scope) {
			throw new Error("Gprh.ades.util.RequestCapable::requestAjax(): the 'scope' option is not supported by this API. "
				+ 'It serves no purpose. Please remove it.');
		}

		return this.requestCreatePromise(options, false);
	},
});
