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
    }
  }
};

View = new View;