# Import
typeChecker = require('typechecker')

# Define
module.exports = (opts,next,config={}) ->
	# Empty, set default
	if config.completionCallbackNames? is false
		config.completionCallbackNames = ['next']

	# Not array, make array
	else if typeChecker.isArray(config.completionCallbackNames) is false
		config.completionCallbackNames = [config.completionCallbackNames]

	# Arguments
	if typeChecker.isFunction(opts) and next? is false
		next = opts
		opts = {}
	else
		opts or= {}

	# Completion callback
	unless next
		for completionCallbackName in config.completionCallbackNames
			next = opts[completionCallbackName]
			delete opts[completionCallbackName]
			break  if next


	# Ensure
	next or= null

	# Return
	return [opts,next]