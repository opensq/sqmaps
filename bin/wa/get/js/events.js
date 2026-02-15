`use strict`;

class Event {

  listen (Arg) { 

    (Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
  }

  getSource (Arg) {

    if (Arg.target) return Arg.target;
  }

  /** **/

  illustrate (Arg) {

      let SVGScale = false;

      d3.json(`/wa/data/maps/cb_2024_us_state_20m.json`).then(json => {
      
        let projection = d3.geoMercator().scale(Arg.scale).translate([Constants.DOMXY[0] / 2, Constants.DOMXY[1] / 2]).center(Arg.pin),

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

        let ts = new Date().valueOf();

        io().emit(`data`, [ts, Arg.ts]);

        io().on(`data`, Obj => {

          if (Obj[0] === ts) {

            if (Obj[1].SVG.tally) {

              let Dot = [];

              for (let dot in Obj[1].SVG.tally) {

                Dot.push([
                  [parseFloat(Obj[1].SVG.tally[dot][0][3]), parseFloat(Obj[1].SVG.tally[dot][0][4])], dot]);
              }

              SVG.selectAll(`circle`).data(Dot)
                .enter().append(`circle`)
                .attr(`cx`, S => {return projection(S[0]) [0]})
                .attr(`cy`, S => {return projection(S[0]) [1]})
                .attr(`r`, 2.5)
                .attr(`fill`, `#000`)
                .attr(`stroke`, `#fff`)

              SVG.selectAll(`text`).data(Dot)
                .enter().append(`text`)
                .attr(`class`, `tally-txt`)
                .attr(`x`, S => {return projection(S[0]) [0] + 5})
                .attr(`y`, S => {return projection(S[0]) [1] + 3})
                .attr(`font-size`, `11px`)
                .style(`text-transform`, `capitalize`)
                .text(S => {return S[1]});

              document.querySelectorAll(`.tally-txt`).forEach(DOM => {

                this.listen([DOM, `mouseover`, S => {

                  let SX = parseFloat(DOM.getAttribute(`x`));

                  document.querySelector(`#bubble`).style.left = `${SX + 10}px`;

                  document.querySelector(`#bubble`).style.right = `unset`;

                  if (SX > Constants.DOMXY[0]/2) {

                    document.querySelector(`#bubble`).style.left = `unset`;

                    document.querySelector(`#bubble`).style.right = `${(Constants.DOMXY[0] - SX) + 10}px`;
                  }

                  let SY = parseFloat(DOM.getAttribute(`y`));

                  document.querySelector(`#bubble`).style.top = `${SY + 10}px`;

                  document.querySelector(`#bubble`).style.bottom = `unset`;

                  if (SY > Constants.DOMXY[1]/2) {

                    document.querySelector(`#bubble`).style.top = `unset`;

                    document.querySelector(`#bubble`).style.bottom = `${(Constants.DOMXY[1] - SY) + 10}px`;
                  }

                  document.querySelector(`#bubble`).style.display = `flex`
                }]);

                this.listen([DOM, `mouseleave`, S => {

                  //document.querySelector(`#bubble`).style.display = `none`
                }]);
              });
            }
          }
        });
      }).catch(error => {throw error});

  }

  app (Arg) {

    document.querySelectorAll(`.atxt`).forEach(VAR => {

      this.listen([VAR, `click`, S => {

        window.location = VAR.getAttribute(`url`);
      }]);
    });
  }
}

Event = new Event;