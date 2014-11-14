/*
	View class for each bubble
	@author: Leonardo Lanzinger

	base z-index: 50 + n_of_layers
*/
function bubbleView(id, x, y, model, index) {
	this.id = id;
	this.index = index;

	// push into panel list
	model.bubbleList.push(this);

	$('#persistent').append('<div id="' + this.id + '" class="canvas-panel bubble-panel" style="position: absolute; margin-left: ' + x +'px; margin-top: '+ y +'px;"></div>');
	
	this.draggable = function(draggable_mode) {
		if(draggable_mode) {
			$('#' + id).draggable({ disabled: false });
		}
		else {
			$('#' + id).draggable({ disabled: true });
		}
	}

	this.resizable = function(resizable_mode) {
		if(resizable_mode) {
			$('#' + id).resizable({ disabled: false });
		}
		else {
			$('#' + id).resizable({ disabled: true });
		}
	}

	this.doTool = function() {
		if (model.draggable && !model.resizable) {
			this.draggable(true);
			this.resizable(false);
		}
		else if (!model.draggable && !model.resizable) {
			this.draggable(false);
			this.resizable(false);
		}
		else if (!model.draggable && model.resizable) {
			this.resizable(true);
			this.draggable(false);
			console.log("resizable");
		}
	}

	this.setBubble = function() {
		$('#' + this.id).addClass('bubble-background');
	}
}