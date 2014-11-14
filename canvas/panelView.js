/**
*	View class for each panel
*	@constructor
*	@param {string} id - given panel id
*	@param {int} x - panel position on the x-axis
*	@param {int} y - panel position on the y-axis
*	@param {int} width - panel width
*	@param {int} height - panel height
*	@param {Object} model - reference to model class
*	@param {int} index - model class panel array's index
*/
function panelView(id, x, y, width, height, model, index) {
	this.id = id;
	this.class = 'canvas-panel';
	this.height = height;
	this.width = width;
	this.layerList = new Array();
	this.n_of_layers = this.layerList.length;
	this.index = index;
	this.canvasContr;

	this.canvasControllerList = new Array();

	model.panelList.push(this);

	$('#persistent').append('<div id="' + this.id + '" class="canvas-panel" style="position: absolute; margin-left: ' + x +'px; margin-top: '+ y +'px; width: '+this.width+'px; height: '+this.height+'px;"><input id="upload-field-'+this.id+'" class="upload-field" type="file" name="upload" onchange="canvas_model.handleFiles(this.files, ' + this.index + ')" /></div>');
	$('.upload-field').hide();

	/** Add canvas to this panel
	*	@param {int} z_index - given z_index of last created canvas
	*/
	this.addCanvas = function(z_index) {
		$('#'+ this.id).append('<canvas id="' +  this.id + '-canvas-' + z_index + '" class="canvas-layer" width="'+this.width+'" height="'+this.height+'" style="z-index: '+  z_index +'"></canvas>');	
		var layer = document.getElementById(this.id);
		this.layerList.push(layer);
		this.n_of_layers = this.layerList.length;
	}

	/** Create canvas controller and add it to canvas controllers array
	*	@param {Object} panel - reference to panel object where the canvas is attached
	*	@param {Object} model - reference to model class
	*	@param {int} layer - z-index of canvas
	* 	@param {int} panel_index - z-index of panel
	*/
	this.createCanvasController = function(panel, model, layer, panel_index) {
		this.canvasContr = new canvasController(panel, model, layer, panel_index);
		this.addController(this.canvasContr);
	}

	/** Add controller to controller list
	*	@param {Object} controller - controller to be added to list
	*/
	this.addController = function(controller) {
		this.canvasControllerList.push(controller);
	}
	
	/** Set Background color to canvas
	*	@param {int} z_index - index of panel
	*	@param {String} color - color hex code
	*/
	this.setBackground = function(z_index, color) {
		$('#' + id + '-canvas-' + z_index).css("background-color", color);
	}

	/** Set panel draggable
	*	@param {boolean} draggable_mode
	*/
	this.draggable = function(draggable_mode) {
		if(draggable_mode) {
			$('#' + id).draggable({ disabled: false });
		}
		else {
			$('#' + id).draggable({ disabled: true });
		}
	}

	/** Triggers draggable state */
	this.doTool = function() {
		if (model.draggable) {
			this.draggable(true);
		}
		else if (!model.draggable) {
			this.draggable(false);
		}
	}
}