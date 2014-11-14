/*
	toolController class for the tool bar buttons
	@author: Leonardo Lanzinger
*/
function toolController(model) {
	
	// move button listener
	$('#tool-move').click(function () {
		model.setDraggableMode();
		setActiveIcon("move");
	});

	// resize button listener
	$('#tool-resize').click(function () {
		model.setResizableMode();
		setActiveIcon("resize");
	});

	// drawing button listener
	$('#tool-pen').click(function () {
		model.setPaintingMode();
		setActiveIcon("pen");
	});

	$('#tool-picture').click(function() {
		model.setImageMode();
		setActiveIcon("picture");
	});

	$('#tool-bubble').click(function() {
		model.createBubble();
		model.setDraggableMode();
		setActiveIcon("move");
	});

	this.setActiveIcon = function(id) {
		$('.pointable-cursor').removeClass("active-tool");
		$('#' + "tool-" + id).addClass("active-tool");
	}

}