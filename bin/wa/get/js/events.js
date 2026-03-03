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

        SVG.select(`g`).attr(`fill`, `#f2f3f0`).attr(`stroke`, `#000`).style(`stroke-width`, 1);

        let ts = new Date().valueOf();

        io().emit(`data`, [ts, Arg.ts]);

        io().on(`data`, Obj => {

          if (Obj[0] === ts) {

            if (Obj[1].SVG.polmultiple) {

              let highlight = () => {

                document.querySelectorAll(`.cd119`).forEach(XO => {

                  this.listen([XO, `mouseover`, S => {

                    //XO.style.stroke = `#000`;

                    XO.style.strokeDasharray = 0;

                    XO.style.strokeWidth = 3;

                        //document.querySelector(`#tally`).innerHTML = DOM.getAttribute(`sum`);

                        let SX = parseFloat(XO.getAttribute(`x`));
                  }]);

                  this.listen([XO, `mouseleave`, S => {

                    //XO.style.stroke = `#dfdfdf`;

                    XO.style.strokeDasharray = 2;

                    XO.style.strokeWidth = 1;
                  }]);
                });
              } 

              let Polit = [];

              for (let pol in Obj[1].SVG.polmultiple) {

                Polit.push([[pol.toLowerCase()], Obj[1].SVG.polmultiple[pol]]);
              }

              View.pop();

              View.DOM([`#polmultiple`, [Models.app.polmultiple(Polit)]]);

              document.querySelectorAll(`.adm_1`).forEach(XO => {

                XO.style.strokeWidth = .25;

                let XOV = Tools.typen(XO.getAttribute(`info`));

                if (XOV[0].toLowerCase() === Constants.pseudo[Polit[0][0]][0]) { XO.style.stroke = `#000`; XO.style.strokeWidth = 2 }
              });

              let CD = [], CDV = {};

              d3.json(`/wa/data/maps/cb_2024_us_cd119_20m.json`).then(Obj => {

                CD = [];

                CDV = Obj;

                Obj.features.forEach(PV => {

                  if (PV.properties.STATEFP === "36") {

                    Polit[0][1].forEach(PV2 => {

                      if (PV.properties.CD119FP === PV2[6][1]) {CD.push(PV)}
                    })
                  }
                });

                SVGDOM.selectAll(`path.cd119`).data(CD).enter().append(`path`).attr(`d`, path).attr(`class`, `cd119`).attr(`stroke`, `#dfdfdf`).attr(`stroke-dasharray`, 2).attr(`stroke-width`, 1).attr(`fill`, `#fff`)

                highlight();

              }).catch(error => {throw error})

              this.listen([document.querySelector(`#polmultiple .pM0`), `click`, S => { 

                document.querySelector(`#polmultiple .pMAZ`).style.display = (document.querySelector(`#polmultiple .pMAZ`).style.display === `none`)? `flex`: `none`;
              }]);

              document.querySelectorAll(`.pM`).forEach(DOM => {

                this.listen([DOM, `click`, S => {

                  let OValue = Tools.typen(DOM.getAttribute(`state`));

                  document.querySelector(`#polmultiple .pM0`).innerHTML = OValue[0]

                  document.querySelector(`#polmultiple .pMAZ`).style.display = `none`;

                  projection.scale(OValue[2])
                  
                  projection.center(OValue[1]);
                  
                  SVGDOM.selectAll("path").attr("d", path); 

                  document.querySelectorAll(`.adm_1`).forEach(XO => {

                    XO.style.strokeWidth = .25;

                    let XOV = Tools.typen(XO.getAttribute(`info`));

                    if (XOV[0].toLowerCase() === OValue[0]) { XO.style.stroke = `#000`; XO.style.strokeWidth = 2 }
                  }); 

                  CD = [];

                  CDV.features.forEach(PV => {

                    if (parseFloat(PV.properties.STATEFP) === OValue[3]) {

                      Polit[0][1].forEach(PV2 => {

                        if (PV.properties.CD119FP === PV2[6][1]) {CD.push(PV)}
                      })
                    }
                  });

                  SVGDOM.selectAll(`.cd119`).remove()

                  SVGDOM.selectAll(`cd119`).data(CD).enter().append(`path`).attr(`d`, path).attr(`class`, `cd119`).attr(`stroke`, `#dfdfdf`).attr(`stroke-dasharray`, 2).attr(`stroke-width`, 1).attr(`fill`, `#fff`);

                  highlight(); 
                }]);
              })
            }

            if (Obj[1].SVG.tally) {

              let Dot = [];

              for (let dot in Obj[1].SVG.tally) {

                Dot.push([
                  [parseFloat(Obj[1].SVG.tally[dot][0][3]), parseFloat(Obj[1].SVG.tally[dot][0][4])], dot, Obj[1].SVG.tally[dot].length]);
              }

              SVG.selectAll(`circle`).data(Dot)
                .enter().append(`circle`)
                .attr(`cx`, S => {return projection(S[0]) [0]})
                .attr(`cy`, S => {return projection(S[0]) [1]})
                .attr(`r`, 1.5)
                .attr(`fill`, `#000`)
                .attr(`stroke`, `#fff`)

              SVG.selectAll(`text`).data(Dot)
                .enter().append(`text`)
                .attr(`class`, `tally-txt`)
                .attr(`x`, S => {return projection(S[0]) [0] + 5})
                .attr(`y`, S => {return projection(S[0]) [1] + 3})
                .attr(`sum`, S => {return S[2]})
                .attr(`font-size`, `11px`)
                .style(`text-transform`, `capitalize`)
                .text(S => {return S[1]});

              document.querySelectorAll(`.tally-txt`).forEach(DOM => {

                this.listen([DOM, `mouseover`, S => {

                  document.querySelector(`#tally`).innerHTML = DOM.getAttribute(`sum`);

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