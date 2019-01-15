/**
 *	Template controller: template page layout manager
 *	@constructor
 */

function pageTemplateController() {
  this.width = 900
  this.height = 1300

  /** Retrieve template from JSON array and create panels accordingly
   *	@param {int} json_index - index in JSON array
   *	@param {Object} model - reference to model class
   */
  this.createTemplate = function (json_index, model) {
    const json = `{
      "templates": [
        {
          "title": "1x1",
          "panels": [
            {
              "id": "panel-1",
              "x": "0",
              "y": "0",
              "width": "900",
              "height": "1300"
            }
          ]
        },
        {
          "title": "1x2",
          "panels": [
            {
              "id": "panel-1",
              "x": "0",
              "y": "0",
              "width": "900",
              "height": "645"
            },
            {
              "id": "panel-2",
              "x": "0",
              "y": "655",
              "width": "900",
              "height": "645"
            }
          ]
        },
        {
          "title": "2x1",
          "panels": [
            {
              "id": "panel-1",
              "x": "0",
              "y": "0",
              "width": "445",
              "height": "1300"
            },
            {
              "id": "panel-2",
              "x": "455",
              "y": "0",
              "width": "445",
              "height": "1300"
            }
          ]
        },
        {
          "title": "2x2",
          "panels": [
            {
              "id": "panel-1",
              "x": "0",
              "y": "0",
              "width": "445",
              "height": "645"
            },
            {
              "id": "panel-2",
              "x": "455",
              "y": "0",
              "width": "445",
              "height": "645"
            },
            {
              "id": "panel-3",
              "x": "0",
              "y": "655",
              "width": "445",
              "height": "645"
            },
            {
              "id": "panel-4",
              "x": "455",
              "y": "655",
              "width": "445",
              "height": "645"
            }
          ]
        },
        {
          "title": "3x2",
          "panels": [
            {
              "id": "panel-1",
              "x": "0",
              "y": "0",
              "width": "445",
              "height": "400"
            },
            {
              "id": "panel-2",
              "x": "455",
              "y": "0",
              "width": "445",
              "height": "400"
            },
            {
              "id": "panel-3",
              "x": "0",
              "y": "410",
              "width": "445",
              "height": "400"
            },
            {
              "id": "panel-4",
              "x": "455",
              "y": "410",
              "width": "445",
              "height": "400"
            },
            {
              "id": "panel-5",
              "x": "0",
              "y": "820",
              "width": "445",
              "height": "480"
            },
            {
              "id": "panel-6",
              "x": "455",
              "y": "820",
              "width": "445",
              "height": "480"
            }
          ]
        },
        {
          "title": "3x2x1x2",
          "panels": [
            {
              "id": "panel-1",
              "x": "0",
              "y": "0",
              "width": "445",
              "height": "400"
            },
            {
              "id": "panel-2",
              "x": "455",
              "y": "0",
              "width": "445",
              "height": "400"
            },
            {
              "id": "panel-3",
              "x": "0",
              "y": "410",
              "width": "900",
              "height": "400"
            },
            {
              "id": "panel-4",
              "x": "0",
              "y": "820",
              "width": "445",
              "height": "480"
            },
            {
              "id": "panel-5",
              "x": "455",
              "y": "820",
              "width": "445",
              "height": "480"
            }
          ]
        },
        {
          "title": "3x1x1x2",
          "panels": [
            {
              "id": "panel-1",
              "x": "0",
              "y": "0",
              "width": "900",
              "height": "400"
            },
            {
              "id": "panel-2",
              "x": "0",
              "y": "410",
              "width": "900",
              "height": "400"
            },
            {
              "id": "panel-3",
              "x": "0",
              "y": "820",
              "width": "445",
              "height": "480"
            },
            {
              "id": "panel-4",
              "x": "455",
              "y": "820",
              "width": "445",
              "height": "480"
            }
          ]
        },
        {
          "title": "3x1",
          "panels": [
            {
              "id": "panel-1",
              "x": "0",
              "y": "0",
              "width": "900",
              "height": "400"
            },
            {
              "id": "panel-2",
              "x": "0",
              "y": "410",
              "width": "900",
              "height": "400"
            },
            {
              "id": "panel-3",
              "x": "0",
              "y": "820",
              "width": "900",
              "height": "480"
            }
          ]
        }
      ]
    }`;
    const jsonObj = JSON.parse(json)
    for (var i = 0; i < jsonObj.templates[json_index].panels.length; i++) {
      var panel = new panelView(
        jsonObj.templates[json_index].panels[i].id,
        jsonObj.templates[json_index].panels[i].x,
        jsonObj.templates[json_index].panels[i].y,
        jsonObj.templates[json_index].panels[i].width,
        jsonObj.templates[json_index].panels[i].height,
        model,
        i + 1
      )

      panel.addCanvas(50, false)

      panel.createCanvasController(
        jsonObj.templates[json_index].panels[i].id,
        model,
        50,
        i + 1
      )
    }
  }
}
