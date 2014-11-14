/* 
	Model class for panels
	@author: Leonardo Lanzinger

	[A4 paper format (892px * 1263px)]
	
	for now let's use those dimensions:
		• padding is 50px
		• total width is 900
		• total height is 1300
		• leave 10px margin between each panel
*/
function model() {

	this.painting = true;
	this.draggable = false;
	this.image = false;
	this.resizable = false;

	this.panelList = new Array();	
	this.bubbleList = new Array();

	this.templateController = new pageTemplateController();
	this.templateController.createTemplate(4,this);

	// call tool controller
	toolController(this);

	this.init = function() {
		// set pen cursor
		for (var i = 0; i < this.panelList.length; i++) {
			$('#' + this.panelList[i].id).addClass('pen-cursor');
		}
	}

	/*
	*	Set different modes
	*/

	this.setPaintingMode = function() {
		this.painting = true;
		this.draggable = false;
		this.picture = false;
		this.resizable = false;
		for (var i = 0; i < this.panelList.length; i++) {
			$('#' + this.panelList[i].id).removeClass('draggable-cursor');
			$('#' + this.panelList[i].id).removeClass('image-cursor');
			this.panelList[i].doTool();
		}
		for (var i = 0; i < this.bubbleList.length; i++) {
			$('#' + this.bubbleList[i].id).removeClass('draggable-cursor');
			this.bubbleList[i].doTool();
		}
	};

	this.setDraggableMode = function() {
		this.painting = false;
		this.draggable = true;
		this.picture = false;
		this.resizable = false;
		for (var i = 0; i < this.panelList.length; i++) {
			$('#' + this.panelList[i].id).addClass('draggable-cursor');
			$('#' + this.panelList[i].id).removeClass('image-cursor');
			this.panelList[i].doTool();
		}
		for (var i = 0; i < this.bubbleList.length; i++) {
			$('#' + this.bubbleList[i].id).addClass('draggable-cursor');
			this.bubbleList[i].doTool();
		}
	};

	this.setResizableMode = function() {
		this.painting = false;
		this.draggable = false;
		this.picture = false;
		this.resizable = true;
		for (var i = 0; i < this.panelList.length; i++) {
			$('#' + this.panelList[i].id).removeClass('image-cursor');
			$('#' + this.panelList[i].id).removeClass('draggable-cursor');
			this.panelList[i].doTool();
		}
		for (var i = 0; i < this.bubbleList.length; i++) {
			$('#' + this.bubbleList[i].id).removeClass('draggable-cursor');
			this.bubbleList[i].doTool();
		}
	};

	this.setImageMode = function() {
		this.painting = false;
		this.draggable = false;
		this.picture = true;
		this.resizable = false;
		for (var i = 0; i < this.panelList.length; i++) {
			$('#' + this.panelList[i].id).removeClass('draggable-cursor');
			$('#' + this.panelList[i].id).addClass('image-cursor');
		}
		for (var i = 0; i < this.bubbleList.length; i++) {
			$('#' + this.bubbleList[i].id).removeClass('draggable-cursor');
			this.bubbleList[i].doTool();
		}
	}

	// insert image
	this.addImageCanvas = function(panel_index) {
		var panel = this.panelList[panel_index - 1];
		// trigger input form
		$('#upload-field-'+panel.id).trigger('click');
	}

	// handle image uploaded file
	this.handleFiles = function(files, panel_index) {
		// get filename from input form
		var panel = this.panelList[panel_index-1];
		var form = document.getElementById('upload-field-'+panel.id);
		var filename = form.value.replace(/C:\\fakepath\\/i, '')

		// set new canvas and add image
		var cur_z = panel.n_of_layers;
		var new_z = 50 - 1;
		panel.addCanvas(new_z);
		var controller = new canvasController('panel-' + panel_index, this, new_z, panel_index)
		panel.canvasControllerList.push(controller);
		controller.createImage(filename);
	}

	// insert bubble as a new canvas
	this.createBubble = function() {
		var panel_bubble = new bubbleView('panel-bubble-' + this.bubbleList.length, 100, 100, this, 99);
		this.bubbleList.push(panel_bubble);
		panel_bubble.setBubble();
	}

	// create page from template
	this.template = function(index) {
		// empty arrays
		this.panelList = [];
		this.bubbleList = [];

		// remove all panels
		var persistent = document.getElementById("persistent");
		while (persistent.firstChild) {
		    persistent.removeChild(persistent.firstChild);
		}

		// create new panel template
		this.templateController.createTemplate(index,this);

		// close sliding menu
		$('#sliding-menu').mmenu().trigger("close.mm");
	}
}