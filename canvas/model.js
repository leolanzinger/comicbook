/**
*	Model class for the panel system
*	@constructor
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

	toolController(this);

	/** Init function called once document is loaded: simply sets the cursor as drawing cursor */
	this.init = function() {
		// set pen cursor
		for (var i = 0; i < this.panelList.length; i++) {
			$('#' + this.panelList[i].id).addClass('pen-cursor');
		}
	}

	/** Set painting mode: drawing is enabled on canvases */
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

	/** Set dragging mode: panels can be dragged and moved around the container */
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

	/** Set resizing mode: bubbles can be resized */
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

	/** Set image mode: clicking on a panel will result in an image uploader */
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

	/** Open image uploader 
	*	@param {int} panel_index - index of panel in panelList[] array
	*/
	this.addImageCanvas = function(panel_index) {
		var panel = this.panelList[panel_index - 1];
		$('#upload-field-'+panel.id).trigger('click');
	}

	/** Handle image uploader result 
	*	@param {string} files - retrieved files data
	*	@param {int} panel_index - index of panel in panelList[] array
	*/
	this.handleFiles = function(files, panel_index) {

		var panel = this.panelList[panel_index-1];
		var form = document.getElementById('upload-field-'+panel.id);
		var filename = form.value.replace(/C:\\fakepath\\/i, '')

		var cur_z = panel.n_of_layers;
		var new_z = 50 - 1;
		panel.addCanvas(new_z, true);
		var controller = new canvasController('panel-' + panel_index, this, new_z, panel_index);
		panel.canvasControllerList.push(controller);
		controller.createImage(filename);
	}

	/** Add bubble to page */
	this.createBubble = function() {
		var panel_bubble = new bubbleView('panel-bubble-' + this.bubbleList.length, 100, 100, this);
		this.bubbleList.push(panel_bubble);
		panel_bubble.setBubble();
	}

	/** Create new page from template 
	*	@param {int} index - template index in JSON array
	*/
	this.template = function(index) {
		
		this.panelList = [];
		this.bubbleList = [];

		
		var persistent = document.getElementById("persistent");
		while (persistent.firstChild) {
		    persistent.removeChild(persistent.firstChild);
		}		
		this.templateController.createTemplate(index,this);

		$('#sliding-menu').mmenu().trigger("close.mm");
	}
}