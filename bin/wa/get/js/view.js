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

    main: () => {

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
          [[`a`, {href: `/data/${ts}`, style: {padding: `${10}px ${12}px`}}, SDATA[ts][2]], 
            [`div`, {class: `_gxM _geQ`, style: {margin: `${0} ${12}px ${10}px`}}, DOM[1]], 
            [`div`, {class: `_gxM _geQ`, style: {margin: `${0} ${12}px ${10}px`}}, [[`span`, {style: {color: `#7d7d7d`, [`font-family`]: `intext`, [`font-size`]: `${10.88}px`, [`font-weight`]: 300}}, new Date(parseInt(ts)).toLocaleString()]]]]]);
      });

      return [`main`, {}, 
        [[`header`, {style: {background: `#fff`, position: `fixed`, width: `${100}%`, [`z-index`]: 1}}, 
          [[`div`, {style: {[`border-bottom`]: `${1}px solid #e7e7e7`, margin: `auto`, [`max-width`]: `${540}px`, padding: `${12}px ${12}px`, width: `${100}%`}}, 
            [[`a`, {href: `/`, style: {color: `#000`, [`font-family`]: `aspg`, [`font-size`]: `${12.88}px`, [`font-weight`]: 600, width: `max-content`}}, `OPENSQ`]]]]], 
        [`div`, {style: {margin: `${50}px auto ${24}px`, [`max-width`]: `${540}px`, width: `${100}%`}}, DOM[0]]]];
    },

    metal: (Arg) => {

      let Obj = {
        geo: Open[Arg[0]][0],
        lead: Open[Arg[0]][1],
      };

      let DOM = [];

      Arg[1].forEach((Byline, A) => {

        DOM.push([`g`, {}, 
          [[`text`, {fill: `#000`, x: 1, y: (A*40)+10, [`font-family`]: `insvg`, [`font-size`]: `${12.88}px`}, `${A + 1}.`], 
          [`text`, {class: `atxt`, url: Byline[0], fill: `#000`, x: 20, y: (A*40)+10, [`font-size`]: `${11.88}px`}, Byline[1]], 
          [`path`, {display: (A === Arg[1].length - 1)?`none`:`flex`, fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M5 ${(A*40)+14} 5 ${(A*40)+38}`}]]]);
      });

      return [[`svg`, {style: {background: `#c4d8dd`}}], 
        [`section`, {id: `byline`, style: {position: `fixed`, left: 0, top: 0, [`z-index`]: 20}}, 
          [[`svg`, {style: {display: (Arg[1].length === 0)? `none`: `flex`, background: `#ffffffeb`, [`border-radius`]: `${4}px`, [`box-shadow`]: `rgba(${10}, ${14}, ${29}, ${0.08}) 0 ${8}px ${64}px ${4}px`, [`font-family`]: `aspg`, [`font-weight`]: 600, height: `${48*Arg[1].length - 28}px`, margin: `${12}px`, [`text-transform`]: `uppercase`, [`max-width`]: `${400}px`, padding: `${12}px`}}, DOM]]], 
        [`footer`, {id: `foot`, style: {bckground: `rgba(${217}, ${217}, ${217}, ${0.8})`, bottom: 0, position: `fixed`, width: `${100}%`, [`z-index`]: 18}}, 
          [[`div`, {style: {bottom: 0, left: 0, margin: `auto`, [`max-width`]: `${640}px`, position: `absolute`, right: 0, width: `${100}%`}}, 
            [[`div`, {style: {width: `${100}%`}}, 
              [[`div`, {class: `_gxM _geQ`, style: {[`border-bottom`]: `${1}px solid #ececec`, padding: `${10}px ${16}px`}}, 
                [[`div`, {style: {width: `${95}%`}},  
                  [[`a`, {href: `/${Obj.geo}/${Arg[0]}`}, 
                    [[`h1`, {style: {color: `#000`, [`font-size`]: `${18}px`, [`font-weight`]: 600, [`text-transform`]: `uppercase`}}, Obj.lead]]],
                    [`div`, {class: `_gxM _geQ`, style: {color: `#9d9d9d`, [`font-weight`]: 300, [`font-size`]: `${9}px`, [`text-transform`]: `uppercase`}}, 
                      [[`a`, {href: `/${Obj.geo}`}, Constants.pseudo[Obj.geo]]]]]], 
                                [`div`, {class: `_gZz`}, 
                                    [[`svg`, {id: `multiClose`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${12}px`, width: `${12}px`}}, 
                                        [[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, m: `M0 6 12 18 24 6`}]]]]]]]]]]]]], 
        [`div`, {id: `bubble`, style: {background: `#fff`, border: `${1}px solid #f0f0f0de`, [`border-radius`]: `${8}px`, [`box-shadow`]: `${0} ${8}px ${64}px ${4}px rgba(${10},${14},${29},${.08})`, display: `none`, [`font-size`]: `${11}px`, [`min-width`]: `${160}px`, position: `absolute`, left: 0, top: `${38}px`, [`z-index`]: 24}}, 
          [[`div`, {style: {[`font-size`]: `${11}px`, margin: `${2}px ${8}px`}}, 
            [[`div`, {class: `_gxM _geQ`}, 
              [[`span`, {}, `CURRENT SIGNATORIES`], [`div`, {class: `_gZz`}, [[`span`, {id: `tally`, style:{ [`font-family`]: `insvg`, [`font-weight`]: 600}}, ``]]]]],
            [`div`, {class: `_gxM`, style: {color: `#909090`, [`font-family`]: `aspg`, [`font-size`]: `${8}px`, [`text-transform`]: `uppercase`}}, 
              [[`span`, {}, `data by`], [`a`, {href: `https://iceout.tech`, style: {[`margin-left`]: `${4}px`, [`text-decoration`]: `underline`}}, `iceout.tech`]]]]]]], 
        [`section`, {id: `polmultiple`, style: {[`font-family`]: `opensq`, [`font-size`]: `${10.88}px`, [`font-weight`]: 300, [`letter-spacing`]: `${.75}px`, position: `fixed`, right: 0, top: 0, [`z-index`]: 18}}, ]];
    },

    bubbly: (Arg) => {

      if (Arg[0] === 1771789645312) {

        let DOM = [];

        Arg[1].forEach(Obj => {

          DOM.push([`div`, {style: {padding: `${4}px ${8}px ${0} ${8}px`}}, 
            [[`span`, {style: {[`text-decoration`]: `underline`}}, Obj[0]], 
            [`div`, {class: `_gxM _geQ`, style: {[`font-family`]: `insvg`}}, 
              [[`span`, {}, `2024.`], 
              [`div`, {class: `_gZz`}, [[`span`, {style: {[`text-align`]: `right`, [`font-weight`]: 600}}, `$${Obj[1]}`]]]]]]])
        });

        return [`div`, {style: {[`letter-spacing`]: `${.75}px`}}, 
          [[`div`, {style: {[`border-bottom`]: `${1}px solid #f0f0f0`, padding: `${2}px ${8}px`}}, 
            [[`span`, {style: {[`font-weight`]: 600, [`text-transform`]: `uppercase`}}, `${Constants.pseudo[(Arg[1][0][6][0].toLowerCase())][0]} district ${parseInt(Arg[1][0][6][1])}`]]], 
          [`div`, {style: {blank: `${2}px ${8}px`}}, DOM]]];
      }
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
          [[`div`, {style: {[`border-bottom`]: `${1}px solid #e7e7e7`, margin: `auto`, [`max-width`]: `${540}px`, padding: `${12}px ${12}px`, width: `${100}%`}}, 
            [[`a`, {href: `/`, style: {color: `#000`, [`font-family`]: `aspg`, [`font-size`]: `${12.88}px`, [`font-weight`]: 600, width: `max-content`}}, `OPENSQ`]]]]], 
        [`div`, {style: {margin: `${50}px auto ${24}px`, [`max-width`]: `${540}px`, width: `${100}%`}}, 
          [[`section`, {style: {}}, 
            [[`a`, {href: `/data/${Arg[0]}`, style: {padding: `${10}px ${12}px`}}, SDATA[Arg[0]][2]], 
            [`div`, {class: ``, style: {margin: `${0} ${12}px ${10}px`}}, DOM[0]], 
            [`div`, {class: `_gxM _geQ`, style: {margin: `${0} ${12}px ${10}px`}}, [[`span`, {style: {color: `#7d7d7d`, [`font-family`]: `aspg`, [`font-weight`]: 300}}, new Date(parseInt(Arg[0])).toLocaleString()]]]]]]]]];
    }
  }
};

View = new View;