/**
*	View class for each bubble
*	@constructor
*	@param {string} id - bubble given id
*	@param {int} x - position on the x axis
*	@param {int} y - position on the y axis
*	@param {Object} model - reference to model object
**/
function bubbleView(id, x, y, model) {
	this.id = id;

	model.bubbleList.push(this);

	$('#persistent').append('<div id="' + this.id + '" class="canvas-panel bubble-panel" style="position: absolute; margin-left: ' + x +'px; margin-top: '+ y +'px;"></div>');
	
	/** Set bubble view as draggable 
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

	/** Set bubble view as resizable
	*	@param {boolean} resizable_mode
	*/
	this.resizable = function(resizable_mode) {
		if(resizable_mode) {
			$('#' + id).resizable({ disabled: false });
		}
		else {
			$('#' + id).resizable({ disabled: true });
		}
	}

	/** Execute state action after checking model conditions on dragging and resizing */
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
		}
	}

	/** Set bubble background image */
	this.setBubble = function() {
		$('#' + this.id).addClass('bubble-background');
	}
}