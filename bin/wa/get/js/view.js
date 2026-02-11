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

    main: () => {

      let Situ = [];

      for (let ts in Open) { Situ.push(ts) }

      Situ = Situ.sort((A, B) => {return B - A});

      return [[`svg`, {style: {background: `#c4d8dd`}}], 
        [`section`, {style: {margin: `${12}px`, position: `fixed`, left: 0, top: 0, width: `max-content`, [`z-index`]: 20}}, 
          [[`svg`, {style: {[`font-family`]: `aspg`, height: `${180}px`, [`text-transform`]: `uppercase`, width: `${150}px`}}, 
            [
              [`g`, {style: {[`font-weight`]: 600}}, 
                [[`text`, {fill: `#000`, x: 1, y: 10, [`font-size`]: `${11.88}px`}, `1.`], 
                [`text`, {class: `atxt`, url: `/${Open[Situ[0]][0]}/${Situ[0]}`, fill: `#000`, x: 20, y: 10, [`font-size`]: `${11.88}px`}, Constants.pseudo[Open[Situ[0]][0]]], 
                [`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M5 14 5 38`}]]], 
              [`g`, {}, 
                [[`text`, {fill: `#000`, x: 1, y: 50, [`font-size`]: `${11.88}px`}, `2.`], 
                [`text`, {class: `atxt`, url: `/${Open[Situ[1]][0]}/${Situ[1]}`, fill: `#000`, x: 20, y: 50, [`font-size`]: `${11.88}px`}, Constants.pseudo[Open[Situ[1]][0]]], 
                /*[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M5 54 5 78`}]*/]], 
              /*[`g`, {style: {[`text-transform`]: `apitalize`}}, 
                [[`text`, {fill: `#000`, x: 1, y: 90, [`font-size`]: `${11.88}px`}, `3.`], 
                [`text`, {fill: `#000`, x: 20, y: 90, [`font-size`]: `${11.88}px`}, `minnesota`], 
                [`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M5 94 5 118`}]]], 
              [`g`, {style: {[`text-transform`]: `apitalize`}}, 
                [[`text`, {fill: `#000`, x: 1, y: 130, [`font-size`]: `${11.88}px`}, `4.`], 
                [`text`, {fill: `#000`, x: 20, y: 130, [`font-size`]: `${11.88}px`}, `maryland`], 
                [`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M5 134 5 158`}]]], 
              [`g`, {style: {[`text-transform`]: `apitalize`}}, 
                [[`text`, {fill: `#000`, x: 1, y: 170, [`font-size`]: `${11.88}px`}, `5.`], 
                [`text`, {fill: `#000`, x: 20, y: 170, [`font-size`]: `${11.88}px`}, `alaska`]]]*/]]]], 
        [`footer`, {id: `foot`, style: {bckground: `rgba(${217}, ${217}, ${217}, ${0.8})`, bottom: 0, position: `fixed`, width: `${100}%`, [`z-index`]: 18}}, 
          [[`div`, {style: {bottom: 0, left: 0, margin: `auto`, [`max-width`]: `${640}px`, position: `absolute`, right: 0, width: `${100}%`}}, 
            [[`div`, {style: {width: `${100}%`}}, 
              [[`div`, {class: `_gxM _geQ`, style: {[`border-bottom`]: `${1}px solid #ececec`, padding: `${10}px ${16}px`}}, 
                [[`div`, {style: {width: `${95}%`}},  
                  [[`a`, {href: `/${Open[Situ[0]][0]}/${Situ[0]}`}, 
                    [[`h1`, {style: {color: `#000`, [`font-size`]: `${24}px`, [`font-weight`]: 600}}, Open[Situ[0]][1]]]],
                    [`div`, {class: `_gxM _geQ`, style: {color: `#9d9d9d`, [`font-weight`]: 300, [`font-size`]: `${9}px`, [`margin-top`]: `${10}px`, [`text-transform`]: `uppercase`}}, 
                      [[`a`, {href: `/${Open[Situ[0]][0]}`}, Constants.pseudo[Open[Situ[0]][0]]]]]]], 
                                [`div`, {class: `_gZz`}, 
                                    [[`svg`, {id: `multiClose`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${12}px`, width: `${12}px`}}, 
                                        [[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, m: `M0 6 12 18 24 6`}]]]]]]]]]]]]]]
    }
  }
};

View = new View;