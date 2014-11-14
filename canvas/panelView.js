/*
	View class for each panel
	@author: Leonardo Lanzinger

	base z-index: 50 + n_of_layers
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

	// push into panel list
	model.panelList.push(this);

	$('#persistent').append('<div id="' + this.id + '" class="canvas-panel" style="position: absolute; margin-left: ' + x +'px; margin-top: '+ y +'px; width: '+this.width+'px; height: '+this.height+'px;"><input id="upload-field-'+this.id+'" class="upload-field" type="file" name="upload" onchange="canvas_model.handleFiles(this.files, ' + this.index + ')" /></div>');
	$('.upload-field').hide();

	this.addCanvas = function(z_index) {
		$('#'+ this.id).append('<canvas id="' +  this.id + '-canvas-' + z_index + '" class="canvas-layer" width="'+this.width+'" height="'+this.height+'" style="z-index: '+  z_index +'"></canvas>');	
		var layer = document.getElementById(this.id);
		this.layerList.push(layer);
		this.n_of_layers = this.layerList.length;
	}

	this.createCanvasController = function(panel, model, layer, panel_index) {
		this.canvasContr = new canvasController(panel, model, layer, panel_index);
		this.addController(this.canvasContr);
	}

	this.addController = function(controller) {
		this.canvasControllerList.push(controller);
	}
	
	this.setBackground = function(z_index, color) {
		$('#' + id + '-canvas-' + z_index).css("background-color", color);
	}

	this.draggable = function(draggable_mode) {
		if(draggable_mode) {
			$('#' + id).draggable({ disabled: false });
		}
		else {
			$('#' + id).draggable({ disabled: true });
		}
	}

	this.doTool = function() {
		if (model.draggable) {
			this.draggable(true);
			// this.resizable(false);
		}
		else if (!model.draggable) {
			this.draggable(false);
		}
	}

	this.setBubble = function() {
		$('#' + this.id).addClass('bubble-background');
	}
}