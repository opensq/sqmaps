`use strict`;

class Route {

  constructor () {

    this.State = [];
  }

  getState () {

      let url = (`./${window.location}`).replace(`//`, `/`).replace(/%(..)/g, function (match, hex) {
          return String.fromCharCode(parseInt(hex, 16))
      });

      this.State = url;

      this.State = url.split(`/`);
  }

  Call () {

    View.pop();

    this.getState();

    let State = this.State;

    if (State.length === 4 && State[3] === ``) {

      View.pop();

      View.DOM([`#app`, Models.app.main()]);

      //document.querySelector(`#app`).innerHTML = `<svg></svg>${View.ModelDOM([Models.app.footnav()])}`;

      /**

      let SVGScale = false;

      d3.json(`/wa/data/maps/cb_2024_us_state_20m.json`).then(json => {
      
        let projection = d3.geoMercator().scale(400).translate([Constants.DOMXY[0] / 2, Constants.DOMXY[1] / 2]).center([-115.723, 52]),

        path = d3.geoPath().projection(projection);

        let SVG = d3.select(`#app`).selectAll(`svg`).data([json]).style(`width`, Constants.DOMXY[0] + `px`).style(`height`, (Constants.DOMXY[1]) + `px`).style(`cursor`, `pointer`);

        let SVGDOM = SVG.append(`g`).attr(`class`, `boundary`);

        let ADMI = [];

        json.features.forEach(Obj => {
          
          ADMI.push(Obj);
        });

        SVGScale = projection;

        SVGDOM.selectAll(`path`).data(ADMI).enter().append(`path`).attr(`d`, path).attr(`class`, `adm_1`).attr(`info`, Obj => {return Tools.coats([Obj.properties.NAME])});

        SVG.select(`g`).attr(`fill`, `#d7d7dd`).attr(`fill`, `#cccccc`).attr(`stroke`, `#fff`).style(`stroke-width`, 1);

        let scaleSVG = d3.zoom().scaleExtent([1, 48]).on(`zoom`, zSVG);

        SVG.call(scaleSVG);

        let Z = [];

        function zSVG (d) {

          let zScale = d3.zoomTransform(SVG.node());

          projection.translate([zScale.x, zScale.y]).scale(zScale.k*400);

          if (zScale.k < 2) {

            if (document.querySelector(`.cd119`)) d3.selectAll(`.cd119`).remove();
          }

          if (zScale.k >= 2) {

            if (!Z[0]) {

              d3.json(`/wa/data/maps/cb_2024_us_cd119_20m.json`).then(Obj => {

                Z[0] = Obj;

                SVGDOM.selectAll(`path.cd119`).data(Obj.features).enter().append(`path`).attr(`d`, path).attr(`class`, `cd119`).attr(`stroke`, `#fff`).attr(`stroke-width`, `.75`).attr(`fill`, `none`)
              }).catch(error => {throw error})
            }

            if (Z[0] && !document.querySelector(`.cd119`)) {

              SVGDOM.selectAll(`path.cd119`).data(Z[0].features).enter().append(`path`).attr(`d`, path).attr(`class`, `cd119`).attr(`stroke`, `#fff`).attr(`stroke-width`, `.75`).attr(`fill`, `none`)  
            }
          }

          d3.selectAll(`path`).attr(`d`, path);
        }
      }).catch(error => {throw error});
      **/
    }
  }
}

Route = new Route();