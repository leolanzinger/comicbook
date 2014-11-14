/*
	Page templates class
	@author: Leonardo Lanzinger
*/

function pageTemplateController() {
	this.width = 900;
	this.height = 1300;

	this.createTemplate = function(json_index, model) {
		$.getJSON( "canvas/templates.json").done( function(data) {
			for(var i=0; i < data.templates[json_index].panels.length; i++) {
				
				var panel = new panelView(data.templates[json_index].panels[i].id, data.templates[json_index].panels[i].x, data.templates[json_index].panels[i].y, data.templates[json_index].panels[i].width, data.templates[json_index].panels[i].height, model, i+1);
				
				panel.addCanvas(50);

				panel.createCanvasController(data.templates[json_index].panels[i].id, model, 50, i+1);
				

			}
		});
	}

}