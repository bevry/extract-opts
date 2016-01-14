'use strict'

// Import
const typeChecker = require('typechecker')

// Define
module.exports = function (opts, next, config = {}) {
	// Empty, set default
	if ( config.completionCallbackNames == null ) {
		config.completionCallbackNames = ['next']
	}

	// Not array, make array
	else if ( typeChecker.isArray(config.completionCallbackNames) === false ) {
		config.completionCallbackNames = [config.completionCallbackNames]
	}

	// Arguments
	if ( typeChecker.isFunction(opts) && next == null ) {
		next = opts
		opts = {}
	}
	else if ( !opts ) {
		opts = {}
	}

	// Completion callback
	if ( !next ) {
		for ( const completionCallbackName of config.completionCallbackNames ) {
			next = opts[completionCallbackName]
			delete opts[completionCallbackName]
			if ( next )  break
		}
	}

	// Ensure
	if ( !next )  next = null

	// Return
	return [opts, next]
}
