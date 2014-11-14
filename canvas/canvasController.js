/*
	paintController class for each panel
	@author: Leonardo Lanzinger
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

	// on click handler triggers image upload
	$('#' + canvas).on('click', function() {
		if (model.picture) {
			model.addImageCanvas(panel_index);
		}
	});

	// other click elements trigger drawing or move
	$('#' + canvas).on('mousedown', function(e){
		//get proper offset of absolute element	  	
	  	var offset = $(this).offset()
		//painting mode
	 	if (model.painting) {
	 		paint = true;
	  		addPaintClick(e.pageX - offset.left, e.pageY - offset.top);
		  	redraw(context_pers);
		}
	});

	// move mouse while drawing
	$('#' + canvas).on('mousemove', function(e){
		//get proper offset of absolute element
	  	var offset = $(this).offset()
	  	//painting mode
	  	if(paint) {
			addPaintClick(e.pageX - offset.left, e.pageY - offset.top, true);
		    redraw(context_pers);
	  	}
	});

	// release mouse
	$('#' + canvas).on('mouseup', function(e){
		paint = false;
	});

	// leave canvas area
	$('#' + canvas).on('mouseleave', function(e){
		paint = false;
	});

	var clickX = new Array();
	var clickY = new Array();
	var clickPaint = new Array();
	var paint;
	var context_pers = pers.getContext("2d");

	// add paint click to array
	function addPaintClick(x, y, painting) {
		clickX.push(x);
		clickY.push(y);
		clickPaint.push(painting);
	}

	// drawing function
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

	// create image and attach to canvas
	this.createImage = function(filename) {
		var imageObj = new Image();

		imageObj.onload = function() {
			context_pers.drawImage(imageObj, 0, 0, width, height);
		};

		imageObj.src = 'graphics/img/' + filename;
	}
}
