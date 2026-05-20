`use strict`;

class View {

  constructor() {this.appendString = ``}

  ModelDOM(Model) {

    if (typeof Model !== `object`) return;

    Model.forEach(Obj => {

      let a = Obj[0], z, last;

      z = a; 

      if (a === `html`) a = `!doctype html><html`;

      this.appendString += `<` + a;
                
      for (let meta in Obj[1]) {

        let value = ``;

        if (meta === `style`) {

          for (let style in Obj[1][meta]) {

            value += `${style}:${Obj[1][meta][style]};`
          }
        }

        else value = Obj[1][meta];

        this.appendString += ` ${meta}='${value}'`;
      }

      this.appendString += `>`;
                
      if (Obj[2]) {

        if (typeof Obj[2] === `object`) this.ModelDOM(Obj[2]);

        else if (typeof Obj[2] === `string`) this.appendString += Obj[2];
      }

      let Queer = [`img`, `input`, `meta`];

      if (!Queer.indexOf(z) > -1) this.appendString += `</` + z + `>`;
    });

    return Tools.plains(this.appendString);
  }

  DOM(Arg) { document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]);}

  pop () {this.appendString = ``};
}

let Models = {

  app: {

    footnav: () => {

      let Settype = [`congressional district`, `county`, `state`];

      let DOM = [[`div`, {id: `polmultiple`, style: {background: ``, display: `nne`, [`font-family`]: `opensq`, [`font-size`]: `${11}px`, position: `absolute`, bottom: `${32}px`, [`z-index`]: 13}}, []]];

      Settype.forEach(type => {

        DOM[0][2].push([`div`, {}, [[`a`, {href: `javascript:;`, style: {[`border-top`]: `1px solid #ececec`, color: `#000`, display: `flex`, [`padding`]: `${2}px ${12}px`}}, 
          [[`span`, {style: {opacity: .75, [`text-transform`]: `capitalize`}}, type]]]]])//[`a`, {href: `javascript:;`, style: {[`border-top`]: `1px solid #ececec`, color: `#000`, display: `flex`, [`padding`]: `${2}px ${12}px`}}, 
          //[[`span`, {style: {opacity: .75, [`text-transform`]: `capitalize`}}, type]]]);
      });

      return [`nav`, {class: `_gxM`, style: {border: `1px solid #ececec`, bottom: 0, background: `#fff`, display: `none`, position: `absolute`, width: `${100}%`}},
        [[`div`, {href: `javascript:;`, class: `_gxM _geQ`, style: {[`border-right`]: `1px solid #ececec`, display: `flex`, [`font-family`]: `insvg`, [`font-size`]: `${11}px`, [`max-width`]: `fit-content`, padding: `${3}px ${12}px`, position: `relative`}}, 
          [[`span`, {style: {color: `#000`}}, `State`],
          [`svg`, {viewbox: `0 0 24 24`, style: {height: `${6}px`, [`margin-left`]: `${12}px`, width: `${6}px`}}, 
            [[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 6, d: `M0 18 12 6 24 18`}]]], DOM[0]]], [`div`]]];
    },

    polmultiple: (Arg) => {

      let Polit = [];

      Arg.forEach(A => { Polit.push(Constants.pseudo[A[0]].concat(A)) });

      Polit.sort();

      let DOM = [];

      Polit.forEach(GV => {

        DOM.push([`a`, {class: `pM`, state: (Tools.coats(GV)), href: `javascript:;`, style: {[`border-top`]: `1px solid #E5E5E5`, color: `#000`, padding: `${4}px ${12}px`}}, GV[0]])
      });

      return [`div`, {style: {background: `#ffffffeb`, [`border-radius`]: `${4}px`, [`box-shadow`]: `rgba(${10}, ${14}, ${29}, ${0.08}) 0 ${8}px ${64}px ${4}px`, margin: `${12}px`, [`text-transform`]: `uppercase`, [`max-width`]: `max-content`}}, 
        [[`div`, {class: `_gxM _geQ`, style: {[`align-self`]: `end`, padding: `${4}px ${12}px`}}, 
          [[`a`, {class: `pM0`, href: `javascript:;`, style: {color: `#000`}}, Constants.pseudo[Arg[0][0]][0]],
          [`svg`, {class: `_gZz`, viewbox: `0 0 24 24`, style: {height: `${6}px`, [`margin-left`]: `${12}px`, width: `${6}px`}}, 
            [[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 6, d: `M0 6 12 18 24 6`}]]]]], [`div`, {class: `pMAZ`, style: {display: `none`, [`max-height`]: `${400}px`, [`overflow-y`]: `scroll`, [`scrollbar-width`]: `none`, [`text-align`]: `right`}}, DOM]]];
    },

    _main: () => {

      let Situ = [];

      for (let ts in SDATA) { Situ.push(ts) }

      Situ = Situ.sort((A, B) => {return B - A});

      let DOM = [[]];

      for (let i = 0; i < 4; i++) {
        
        //DOM[0].push([`img`, {style: {border: `${2}px solid #078870`, [`border-radius`]: `${100}%`, [`margin-right`]: `${8}px`, width: `${36}px`}, src: `/wa/get/img.png`}])
      }

      DOM[1] = [];

      Situ.forEach(ts => {

        DOM[1] = [];

        SDATA[ts][3].quotes.forEach(Obj => {
        
          DOM[1].push([`img`, {style: {border: `${2}px solid #078870`, [`border-radius`]: `${100}%`, [`margin-right`]: `${8}px`, width: `${36}px`}, src: `/wa/get/img/mug/${Mug[Obj[0]][0]}.jpg`}])
        });

        DOM[0].push([`section`, {style: {}}, 
          [[`a`, {href: (SDATA[ts][0] > 0)? `/data/${ts}`: `javascript:;`, style: {padding: `${10}px ${12}px`}}, SDATA[ts][2]], 
            [`div`, {class: `_gxM _geQ`, style: {margin: `${0} ${12}px ${10}px`}}, DOM[1]], 
            [`div`, {class: `_gxM _geQ`, style: {margin: `${0} ${12}px ${10}px`}}, 
              [[`span`, {style: {color: `#7d7d7d`, [`font-family`]: `intext`, [`font-size`]: `${9.88}px`, [`font-weight`]: 300}}, new Date(parseInt(ts)).toLocaleString()]]]]]);
      });

      return [`main`, {}, 
        [[`header`, {style: {background: `#fff`, [`box-shadow`]: `rgba(${10}, ${14}, ${29}, ${0.2}) 0 ${8}px ${64}px ${4}px`, position: `fixed`, width: `${100}%`, [`z-index`]: 1}}, 
          [[`div`, {style: {[`brder-bottom`]: `${1}px solid #e7e7e7`, margin: `auto`, [`max-width`]: `${540}px`, padding: `${12}px ${12}px`, width: `${100}%`}}, 
            [[`a`, {href: `/`, style: {color: `#000`, [`font-family`]: `aspg`, [`font-size`]: `${12.88}px`, [`font-weight`]: 600, width: `max-content`}}, `OPENSQ`]]]]], 
        [`div`, {id: `slack`, style: {margin: `${50}px auto ${24}px`, [`max-width`]: `${540}px`, width: `${100}%`}}, DOM[0]], Models.app.tick()]];
    },

    latest: () => {

      let DOM = [[]];

      let Situ = [];

      for (let ts in SDATA) { Situ.push(ts) }

      Situ = Situ.sort((A, B) => {return B - A});

      Situ.forEach((ts, i)=> {

        let DT = new Date(parseInt(ts));

        DOM[0].push([`div`, {class: `_gxM`, style: {[`font-size`]: `${9.88}px`, width: `${100}%`}}, 
          [[`div`, {}, 
            [[`span`, {style: {[`algn-self`]: `center`}}, (parseInt(ts) > DAY)? `${DT.toTimeString().split(`:`)[0]}:${DT.toTimeString().split(`:`)[1]}`: `${DT.toLocaleString().split(`/`)[0]}.${DT.toLocaleString().split(`/`)[1]}.`], 
            [`span`, {style: {[`margin`]: `${8}px`, background:(i === Situ.length - 1)? ``: `#3a3a3a`, height: `${50}px`, width: `${1}px`}}]]], 
          [`div`, {style: {flex: 1, [`margin-left`]: `${12}px`, width: `calc(${30}vw - ${53}px)`}}, 
            [[`span`, {style: {[`text-transform`]: `capitalize`}}, SDATA[ts][4][0]], 
            [`a`, {href: `javascript:;`, style: {[`align-content`]: `center`, color: `#fff`, height: `${50}px`}}, SDATA[ts][2]]]]]]);
      });

      return [`div`, {style: {[`margin-top`]: `${24}px`}}, DOM[0]]
    },

    main: () => {

      let DOM = [[]];

      let Pair = [`AUD-USD`, `EUR-USD`, `GBP-USD`, `NZD-USD`, `USD-CAD`, `USD-CHF`, `USD-NOK`, `USD-SEK`];

      Pair.forEach(b => {

        DOM[0].push([`div`, {id: b, class: `_gxM _geQ`, style: {[`align-items`]: `baseline`, [`font-size`]: `${8.88}px`, [`margin-left`]: `${12}px`}}, 
          [[`a`, {href: `https://sojava.xyz/trade/${b.replace(`-`, `_`)}`, target: `blank`, style: {color: `#fff`, [`letter-spacing`]: `${.88}px`, [`white-space`]: `nowrap`}}, b.replace(`-`, `/`)],
          [`span`, {id: `COST`, style: {[`letter-spacing`]: `${.65}px`, [`font-size`]: `${8.88}px`, [`margin`]: `${0}px ${6}px ${0}px`}}],
          [`span`, {id: `MOD`, style: {[`letter-spacing`]: `${.65}px`, [`font-size`]: `${8.88}px`}}, ``]]]);
      });

      return [`main`, {style: {color: `#fff`}}, 
        [[`header`, {style: {background: `#0c0f0c`, position: `fixed`, width: `${100}%`, [`z-index`]: 1}}, 
          [[`div`, {class: `_gxM _geQ`, style: {margin: `auto`, [`max-width`]: `${1400}px`, padding: `${12}px ${12}px`, width: `${100}%`}}, 
            [[`a`, { href: `/`, style: {[`font-family`]: `consolas`, [`font-size`]: `${24.88}px`, width: `max-content`}}, 
              [[`svg`, {vewbox: `0 0 24 24`, style: {[`font-weight`]: 600, height: `${24}px`, fill: `#fff`, width: `${24}px`}}, 
                [[`text`, {x: 2, y: 23}, `0`], [`text`, {x: 17, y: 12, [`font-size`]: `${10.88}px`}, `2`]]]]], 
            [`div`, {class: `_gZz`}, [[`a`, {class: `Au`, href: `javascript:;`, style: {border: `${1}px solid #2d2d2d`, color: `#fff`, [`font-family`]: `aspg`, padding: `${8}px ${12}px`, [`text-transform`]: ``}}, `Buy Us Coffee`]]]]], 
          [`div`, {style: {border: `${1}px solid #2d2d2d`, [`border-left`]: 0, [`border-right`]: 0}}, 
            [[`div`, {class: `_gxM _geQ`, style: {margin: `auto`, [`max-width`]: `${1400}px`, padding: `${0}px ${12}px`, width: `${100}%`}}, 
              [[`a`, {class: `_gxM _geQ`, href: `javascript:;`, style: {[`border-right`]: `${1}px solid #2d2d2d`, color: `#fff`, display: `flex`, padding: `${6}px ${0}`, [`max-width`]: `max-content`}}, 
                [[`span`, {style: {[`font-size`]: `${8.88}px`}}, `MARKETS`], 
                [`svg`, {viewbox: `0 0 24 24`, height: `${8}px`, width: `${8}px`, style: {margin: `${0} ${8}px`}}, [[`path`, {fill: `none`, stroke: `#fff`, d: `M0 6 12 18 24 6`}]]]]], 
              [`div`, {class: `_geQ _gxM`}, DOM[0]]]]]]]], 
        [`div`, {id: `ylva`, class: ``, style: {margin: `${88}px auto ${24}px`, [`max-width`]: `${1400}px`, width: `${100}%`}}, 
          [[`section`, {class: `s2`}, [[`h1`, {}, `latest`], Models.app.latest()]], [`section`, {class: `s0`}, [[`h1`, {}, `top stories`]]], [`section`, {class: `s2`}, [[`h1`, {}, `finance`], Models.app.timeline()]]]]]];
    },

    data: (Arg) => {

      let DOM = [[], []];

      let Quote = SDATA[Arg[0]][3].quotes;

      SDATA[Arg[0]][3].quotes.forEach(Quote => {

        DOM[1] = []

        Quote[2].forEach(txt => {

          DOM[1].push([`p`, {style: {[`margin-top`]: `${12}px`}}, `"${txt}"`])
        });
        
        DOM[0].push([`div`, {style: {border: `1px solid #078870`, [`border-radius`]: `${16}px`, margin: `${12}px`, padding: `${12}px`}}, 
          [[`div`, {class: `_gxM _geQ`}, 
            [[`img`, {style: {border: `${2}px solid #078870`, [`border-radius`]: `${100}%`, [`margin-right`]: `${8}px`, width: `${36}px`}, src: `/wa/get/img/mug/${Mug[Quote[0]][0]}.jpg`}], 
            [`div`, {style: {}}, [[`span`, {}, Quote[0]], [`span`, {style: {[`text-transform`]: `capitalize`}}, Quote[1]]]]]], [`div`, {}, DOM[1]]]]);
      });

      return [`main`, {}, 
        [[`header`, {style: {background: `#fff`, position: `fixed`, width: `${100}%`, [`z-index`]: 1}}, 
          [[`div`, {style: {[`brder-bottom`]: `${1}px solid #e7e7e7`, margin: `auto`, [`max-width`]: `${540}px`, padding: `${12}px ${12}px`, width: `${100}%`}}, 
            [[`a`, {href: `/`, style: {color: `#000`, [`font-family`]: `aspg`, [`font-size`]: `${12.88}px`, [`font-weight`]: 600, width: `max-content`}}, `OPENSQ`]]]]], 
        [`div`, {style: {margin: `${50}px auto ${24}px`, [`max-width`]: `${540}px`, width: `${100}%`}}, 
          [[`section`, {style: {}}, 
            [[`a`, {href: `/data/${Arg[0]}`, style: {padding: `${10}px ${12}px`}}, SDATA[Arg[0]][2]], (Models.SVG[Arg[0]])? Models.SVG[Arg[0]][0](): [],
            [`div`, {class: ``, style: {margin: `${0} ${12}px ${10}px`}}, DOM[0]], 
            [`div`, {class: `_gxM _geQ`, style: {margin: `${0} ${12}px ${10}px`}}, [[`span`, {style: {color: `#7d7d7d`, [`font-family`]: `aspg`, [`font-weight`]: 300}}, new Date(parseInt(Arg[0])).toLocaleString()]]]]]]]]];
    },

    timeline: () => {

      let DOM = [[]];

      let Situ = [];

      for (let ts in SDATA) {

        if (SDATA[ts][4][0] === `finance`) { Situ.push(ts) }
      }

      Situ = Situ.sort((A, B) => {return B - A});

      Situ.forEach((ts, i)=> {

        let DT = new Date(parseInt(ts));

        DOM[0].push([`div`, {class: `_gxM`, style: {[`font-size`]: `${9.88}px`, width: `${100}%`}}, 
          [[`div`, {}, 
            [[`span`, {style: {[`algn-self`]: `center`}}, (parseInt(ts) > DAY)? `${DT.toTimeString().split(`:`)[0]}:${DT.toTimeString().split(`:`)[1]}`: `${DT.toLocaleString().split(`/`)[0]}.${DT.toLocaleString().split(`/`)[1]}.`], 
            [`span`, {style: {[`margin`]: `${8}px`, background:(i === Situ.length - 1)? ``: `#3a3a3a`, height: `${50}px`, width: `${1}px`}}]]], 
          [`div`, {style: {flex: 1, [`margin-left`]: `${12}px`, width: `calc(${30}vw - ${53}px)`}}, 
            [[`span`, {style: {[`text-transform`]: `capitalize`}}, SDATA[ts][4][1]], 
            [`a`, {href: `javascript:;`, style: {[`align-content`]: `center`, color: `#fff`, height: `${50}px`}}, SDATA[ts][2]]]]]]);
      });

      return [`div`, {style: {[`margin-top`]: `${24}px`}}, DOM[0]]
    },

    tick: (Arg) => {

      return [`div`, {style: {bottom: 0, position: `fixed`, width: `${100}%`, [`z-index`]: 2}}, 
        [[`div`, {style: {margin: `auto`, [`max-width`]: `${540}px`, width: `${100}%`}}, 
          [[`div`, {class: `_gxM _geQ`}, 
            [[`a`, {id: ``, href: `javascript:;`, class: `_gxM`, style: {[`align-items`]: `center`, [`border-right`]: `1px solid #e3e3e3`, color: `#000`, display: `flex`, [`font-family`]: ``, [`font-size`]: `${11.88}px`, padding: `${12}px ${12}px`}}, 
              [[`span`, {}, `Forex`],
              [`svg`, {viewbox: `0 0 24 24`, style: {height: `${8}px`, [`margin-left`]: `${6}px`, width: `${8}px`}}, 
                [[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M0 6 12 18 24 6`}]]]]], 
              [`div`, {class: `_eYG _geQ _gxM`, style: {[`font-family`]: `insvg`}}, 
                [[`div`, {class: `_geQ _gxM`, style: {[`width`]: `${30}%`}}, 
                  [[`a`, {href: ``, class: `_gxM`, style: {[`align-items`]: `baseline`, color: `#000`, display: `flex`, [`margin-left`]: `${6}px`}}, 
                    [[`span`, {id: `asset`, style: {[`font-size`]: `${11.88}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `BTC`], 
                    [`span`, {id: `curr`, style: {color: `#8e8e8e`, [`font-size`]: `${11.88}px`, [`font-weight`]: 300, overflow: `hidden`, [`text-overflow`]: `ellipsis`, [`text-transform`]: `uppercase`}}, `/USD`]]]]],
                [`div`, {style: {width: `${30}%`}}, 
                  [[`span`, {id: `COST`, style: {[`font-size`]: `${11.88}px`,[`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]], 
                [`div`, {style: {width: `${40}%`}}, 
                  [[`span`, {id: `MOD`, style: {color: `#02ff02`, [`font-size`]: `${11.88}px`, [`font-weight`]: 300, [`letter-spacing`]: `${.25}px`, [`text-align`]: `right`}}, ``]]]]]]]]]]];
    }
  },

  SVG: {
    [1777742487952]: [
      () => {

        return [`svg`, {height: `${500}px`, width: `${100}%`, style: {[`font-family`]: `aspg`, [`font-size`]: `${8.88}px`, [`text-transform`]: `uppercase`}}, 
          [[`line`, {stroke: `#000`, [`stroke-width`]: 2, x1:`${50}%`, x2: `${50}%`, y1: 215, y2: 0}],
          [`line`, {stroke: `#000`, [`stroke-width`]: 2, x1:`${50}%`, x2: 0, y1: 10, y2: 10}],
          [`text`, {style: {}, [`text-anchor`]: ``, x: `${2}%`, y: 22}, `Anthropic`],
          [`line`, {stroke: `#000`, x1:`${16}%`, x2: `${16}%`, y1: 10, y2: 170}],
          [`line`, {stroke: `#000`, x1:`${16}%`, x2: `${16}%`, y1: 180, y2: 200}],
          [`line`, {stroke: `#000`, x1:`${16}%`, x2: `${50}%`, y1: 200, y2: 200}],
          [`text`, {style: {[`font-family`]: `insvg`}, [`text-anchor`]: `middle`, x: `${30}%`, y: 212}, `$1M`],
          [`text`, {style: {}, [`text-anchor`]: `middle`, x: `${16}%`, y: 179}, `Jobs & Democracy PAC`],
          [`line`, {stroke: `#000`, x1:`${25}%`, x2: `${25}%`, y1: 10, y2: 110}],
          [`text`, {style: {[`font-family`]: `insvg`, transform: `translateX(${4}px)`}, [`text-anchor`]: ``, x: `${25}%`, y: 70}, `$20M`],
          [`text`, {style: {transform: `translateX(${-18}px)`}, [`text-anchor`]: ``, x: `${25}%`, y: 119}, `Public First PAC`],
          [`line`, {stroke: `#000`, x1:`${25}%`, x2: `${25}%`, y1: 120, y2: 145}],
          [`line`, {stroke: `#000`, x1:`${25}%`, x2: `${50}%`, y1: 145, y2: 145}],
          [`text`, {style: {[`font-family`]: `insvg`}, [`text-anchor`]: `middle`, x: `${35}%`, y: 160}, `$1.5M`],
          [`circle`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, cx: `${50}%`, cy: `${230}px`, r: `${15}px`}], 
          [`text`, {style: {transform: `translateX(${-18}px)`, }, [`text-anchor`]: `end`, x: `${50}%`, y: `${235}px`}, `Alex Bores`], 
          [`circle`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, cx: `${50}%`, cy: `${270}px`, r: `${15}px`}],
          [`text`, {style: {transform: `translateX(${18}px)`, }, [`text-anchor`]: ``, x: `${50}%`, y: `${275}px`}, `Opposition`],
          [`line`, {stroke: `#000`, [`stroke-width`]: 2, x1:`${50}%`, x2: `${50}%`, y1: 285, y2: 500}],
          [`text`, {style: {[`font-family`]: `insvg`}, [`text-anchor`]: `middle`, x: `${75}%`, y: 365}, `$2M`],
          [`line`, {stroke: `#000`, x1:`${50}%`, x2: `${85}%`, y1: 370, y2: 370}],
          [`line`, {stroke: `#000`, [`stroke-width`]: 1, x1:`${85}%`, x2: `${85}%`, y1: 370, y2: 407}],
          [`text`, {style: {}, [`text-anchor`]: `end`, x: `${85}%`, y: 420}, `Leading the Future PAC`],
          [`line`, {stroke: `#000`, [`stroke-width`]: 1, x1:`${85}%`, x2: `${85}%`, y1: 425, y2: 490}],
          [`text`, {style: {[`font-family`]: `insvg`}, [`text-anchor`]: `middle`, x: `${65}%`, y: 305}, `$2M+`],
          [`line`, {stroke: `#000`, x1:`${50}%`, x2: `${87}%`, y1: 310, y2: 310}],
          [`line`, {stroke: `#000`, [`stroke-width`]: 1, x1:`${87}%`, x2: `${87}%`, y1: 332, y2: 310}],
          [`text`, {style: {}, [`text-anchor`]: `middle`, x: `${87}%`, y: 345}, `Think Big PAC`],
          [`line`, {stroke: `#000`, [`stroke-width`]: 1, x1:`${87}%`, x2: `${87}%`, y1: 350, y2: 490}],
          [`text`, {style: {}, [`text-anchor`]: `end`, x: `${98}%`, y: 485}, `OpenAI`],
          [`line`, {stroke: `#000`, [`stroke-width`]: 2, x1:`${50}%`, x2: `${100}%`, y1: 490, y2: 490}]]];
      },
    ]
  }
};

View = new View;