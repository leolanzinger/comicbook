/** Tool controller class for the top tool bar
*	@param {Object} model - reference to model class
*/
function toolController(model) {
	
	/** onClick event on move tool */
	$('#tool-move').click(function () {
		model.setDraggableMode();
		setActiveIcon("move");
	});

	/** onClick event on resize tool */
	$('#tool-resize').click(function () {
		model.setResizableMode();
		setActiveIcon("resize");
	});

	/** onClick event on pen tool */
	$('#tool-pen').click(function () {
		model.setPaintingMode();
		setActiveIcon("pen");
	});

	/** onClick event on add picture tool */
	$('#tool-picture').click(function() {
		model.setImageMode();
		setActiveIcon("picture");
	});

	/** onClick event on add bubble tool */
	$('#tool-bubble').click(function() {
		model.createBubble();
		model.setDraggableMode();
		setActiveIcon("move");
	});

	/** Sets the current active mode's icon to active
	*	@param {String} id - id of tool's icon to set as active
	*/
	this.setActiveIcon = function(id) {
		$('.pointable-cursor').removeClass("active-tool");
		$('#' + "tool-" + id).addClass("active-tool");
	}

}