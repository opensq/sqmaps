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

      /**/

      let SVGScale = false;

      d3.json(`/wa/data/maps/cb_2024_us_state_20m.json`).then(json => {
      
        let projection = d3.geoMercator().scale(12000).translate([Constants.DOMXY[0] / 2, Constants.DOMXY[1] / 2]).center([-122.0842, 37.2]),

        path = d3.geoPath().projection(projection);

        let SVG = d3.select(`#app`).selectAll(`svg`).data([json]).style(`width`, Constants.DOMXY[0] + `px`).style(`height`, (Constants.DOMXY[1]) + `px`).style(`cursor`, `pointer`);

        let SVGDOM = SVG.append(`g`).attr(`class`, `boundary`);

        let ADMI = [];

        json.features.forEach(Obj => {
          
          ADMI.push(Obj);
        });

        SVGScale = projection;

        SVGDOM.selectAll(`path`).data(ADMI).enter().append(`path`).attr(`d`, path).attr(`class`, `adm_1`).attr(`info`, Obj => {return Tools.coats([Obj.properties.NAME])});

        SVG.select(`g`).attr(`fill`, `#f2f3f0`).attr(`stroke`, `#fff`).style(`stroke-width`, 1);

        /**

        SVG.append(`circle`)
          .attr(`cx`, projection([-122.15308, 37.48116])[0])
          .attr(`cy`, projection([-122.15308, 37.48116])[1])
          .attr(`r`, 25)
          .attr(`fill`, `#ef1f2f`)
          .attr(`stroke`, `#fff`)

        SVG.append(`path`)
          .attr(`d`, `M${projection([-122.15308, 37.48116])[0] + 26} ${projection([-122.15308, 37.48116])[1]} ${projection([-122.15308, 37.48116])[0] + 50} ${projection([-122.15308, 37.48116])[1]}`)
          .attr(`stroke`, `#000`)

        SVG.append(`text`)
          .attr(`x`, projection([-122.15308, 37.48116])[0] + 54) 
          .attr(`y`, projection([-122.15308, 37.48116])[1])
          .attr(`font-size`, `11px`)
          .text(`Meta, 25M+`)

        SVG.append(`circle`)
          .attr(`cx`, projection([-122.0842, 37.4231])[0])
          .attr(`cy`, projection([-122.0842, 37.4231])[1])
          .attr(`r`, 5)
          .attr(`fill`, `#ef1f2f`)
          .attr(`stroke`, `#fff`)

        SVG.append(`path`)
          .attr(`d`, `M${projection([-122.0842, 37.4231])[0] + 6} ${projection([-122.0842, 37.4231])[1]} ${projection([-122.0842, 37.4231])[0] + 50} ${projection([-122.0842, 37.4231])[1]}`)
          .attr(`stroke`, `#000`)

        SVG.append(`text`)
          .attr(`x`, projection([-122.0842, 37.4231])[0] + 54) 
          .attr(`y`, projection([-122.0842, 37.4231])[1])
          .attr(`font-size`, `11px`)
          .text(`Google, 5M+`)

        SVG.append(`circle`)
          .attr(`cx`, projection([-122.409746, 37.792405])[0])
          .attr(`cy`, projection([-122.409746, 37.792405])[1])
          .attr(`r`, 2.5)
          .attr(`fill`, `#ef1f2f`)
          .attr(`stroke`, `#fff`)

        SVG.append(`path`)
          .attr(`d`, `M${projection([-122.409746, 37.792405])[0] + 2.6} ${projection([-122.409746, 37.792405])[1]} ${projection([-122.409746, 37.792405])[0] + 50} ${projection([-122.409746, 37.792405])[1]}`)
          .attr(`stroke`, `#000`)

        SVG.append(`text`)
          .attr(`x`, projection([-122.409746, 37.792405])[0] + 54) 
          .attr(`y`, projection([-122.409746, 37.792405])[1])
          .attr(`font-size`, `11px`)
          .text(`SV Angel, 100K+`)
        **/

        /*

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

        */
      }).catch(error => {throw error});
      /**/

      Event.app()
    }

    if (State.length === 5) {

      if (Open[State[4]] && State[3] === Open[State[4]][0]) {

        document.title = `${Open[State[4]][1]} | Opensq`;

        let Obj = {
          geo: Open[State[4]][0],
          lead: Open[State[4]][1], 
          pin: Open[State[4]][2],
          scale: Open[State[4]][3],
          ts: State[4]
        };

        View.pop();

        View.DOM([`#app`, Models.app.metal([State[4]])]);

        Event.illustrate(Obj);
      }
    }
  }
}

Route = new Route();

const Open = {

  [1770566116156]: [
    `ca`, 
    `Silicon Valley Money Fronts As Affordability Drive To Counter Labor Progressives & Wealth Tax`, [-122.0842, 37.2], 12000],
  [1770821887204]: [`ca`, `ICEout.tech Activism Highlights Glaring Disparity Between Silicon Valley Labor & C-Suite`, [-122.15308, 37.48116], 32000]
} 