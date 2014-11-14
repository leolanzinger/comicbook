/**
*	Canvas controller class: manage drawing and image insertion
*	@param {string} panel - panel id
*	@param {Object} model - reference to model class
*	@param {int} layer - canvas z-index
*	@param {int} panel_index - panel z-index
*/
function canvasController(panel, model, layer, panel_index) {

	var panel = panel;
	var model = model;
	var layer = layer;
	var panel_index = panel_index;

	var pers = document.getElementById(panel + '-canvas-' + layer);;

	var width = $('#' + panel + '-canvas-' + layer).width();
	var height = $('#' + panel + '-canvas-' + layer).height();

	var canvas = panel + '-canvas-' + layer;

	/** onClick handles image insertion if system is in image mode */
	$('#' + canvas).on('click', function() {
		if (model.picture) {
			model.addImageCanvas(panel_index);
		}
	});

	/** mousedown event is handled to start drawing */
	$('#' + canvas).on('mousedown', function(e){
	  	var offset = $(this).offset()
	 	if (model.painting) {
	 		paint = true;
	  		addPaintClick(e.pageX - offset.left, e.pageY - offset.top);
		  	redraw(context_pers);
		}
	});

	/** mousemove event is handled to draw the path */
	$('#' + canvas).on('mousemove', function(e){
	  	var offset = $(this).offset()
	  	if(paint) {
			addPaintClick(e.pageX - offset.left, e.pageY - offset.top, true);
		    redraw(context_pers);
	  	}
	});

	/** mouseup event is handled to end drawing */
	$('#' + canvas).on('mouseup', function(e){
		paint = false;
	});

	/** mouseleave event */
	$('#' + canvas).on('mouseleave', function(e){
		paint = false;
	});

	var clickX = new Array();
	var clickY = new Array();
	var clickPaint = new Array();
	var paint;
	var context_pers = pers.getContext("2d");

	/** Add click to path array
	*	@param {int} x - x position of point
	*	@param {int} y - y position of point
	*	@param {boolean} painting - checks if point has been drawed or not
	*/ 
	function addPaintClick(x, y, painting) {
		clickX.push(x);
		clickY.push(y);
		clickPaint.push(painting);
	}

	/** Draw function
	*	@param {Context} context - 2d canvas drawing context
	*/
	function redraw(context){
		context.strokeStyle = "#000";
		context.lineJoin = "round";
		context.lineWidth = 2;
				
		for(var i=0; i < clickX.length; i++) {		
			context.beginPath();
			if(clickPaint[i] && i) {
				context.moveTo(clickX[i-1], clickY[i-1]);
			}
			else {
				context.moveTo(clickX[i]-1, clickY[i]);
			}
			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			context.stroke();
			
		}
	}

	/** Create image from filename and add it to canvas
	*	@param {String} filename - image file name
	*/
	this.createImage = function(filename) {
		var imageObj = new Image();

		imageObj.onload = function() {
			context_pers.drawImage(imageObj, 0, 0, width, height);
		};

		imageObj.src = 'graphics/img/' + filename;
	}
}
