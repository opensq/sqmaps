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

      View.DOM([`#app`, [Models.app.main()]]);

      /**

      let Situ = [], Byline = [];

      for (let ts in Open) { 

        Situ.push(ts);

        Byline.push([`/${Open[ts][0]}/${ts}`, Open[ts][4]])
      }

      Situ = Situ.sort((A, B) => {return B - A});

      let Obj = {
        geo: Open[Situ[0]][0],
        lead: Open[Situ[0]][1], 
        pin: Open[Situ[0]][2],
        scale: Open[Situ[0]][3],
        ts: Situ[0]
      };

      View.pop();

      View.DOM([`#app`, Models.app.metal([Situ[0], Byline.reverse()])]);

      Event.illustrate(Obj);

      **/

      /**

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

        /*
      }).catch(error => {throw error});
      **/

      Event.app()
    }

    if (State.length === 5) {

      if (SDATA[State[4]] && State[3] === `data`) {

        document.title = `${SDATA[State[4]][2]} | OPENSQ`;

        View.pop();

        View.DOM([`#app`, [Models.app.data([State[4], []])]]);

      }

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

        View.DOM([`#app`, Models.app.metal([State[4], []])]);

        Event.illustrate(Obj);
      }
    }
  }
}

Route = new Route();

const SDATA = {
  [1778008426864]: [
    0, [`us`, `mn`], `Anthropic furthers domination in Wall Street with more patnerships`, {quotes: []}],
  [1778007285858]: [
    0, [`us`, `mn`], `VA internally investigated employees who participated in Alex Pretti's vigil`, {quotes: []}],
  [1777742487952]: [
    1777742487952, [`us`, `ny`], `Alex Bores' primary fight becomes proxy for Big AI Regulation Battle`, 
    {quotes: [
      [
        `Chris Larsen`, 
        `cofounder, Ripple Labs`, 
        [
          `They are trying to destroy and intimidate and send a clear message that if you do come up with clear guardrails, we
are going to crush you, While some of these folks are going to try to crush you, others are going to step up, and we’re going to support you.`]], [`Alex Bores`, `NY-CD12 primary candidate (D)`, []]]}],
  [1777666598622]: [
    1777666598622, [`us`], `Israel's Center leadership Seeks to win back Democrats`, 
    {quotes: [
      [`Rahm Emanuel`, 
        `chief of staff to President Barack Obama`, 
        [`The right question is not whether they repair relations with Democrats, it’s whether they repair relationships with the public in Europe and the United States,” he said. “Now, I think on the present course, it tells you everything you need to know, because I don’t see any way of changing.`]],
      [`Yair Lapid`, 
        `Party Leader, Yesh Atid`, 
        [`The larger portion of Democrats are still the kind of people I know how to talk with. And of course, that’s true on the Republican side as well,” Lapid said. “And what was missing in the equation is an Israeli government that is preoccupied with this, committed to, focused on its importance for our national security.`]],
      [`Ilan Goldenberg`, 
        `chief policy officer, J Street`, [`Netanyahu leaving would create an opportunity, but these new Israeli leaders will have to follow through with action if they really want to start changing the relationship with the Democratic Party, That would include doing much more to stop Israeli settler violence against Palestinians in the West Bank, taking immediate steps to do more to improve peoples’ lives in Gaza, prioritizing diplomacy to address security concerns in Lebanon and doing the same in Iran rather than drawing the U.S. into conflict there`]],
      [`Jeanne Shaheen`, `US Senator (Democrat), New Hampshire`, 
        [`I have been deeply disappointed by Prime Minister Benjamin Netanyahu and his government, whose conduct in recent years has done real damage to the longstanding bipartisan support for Israel in the United States and raised serious concerns among Democrats, Repairing that trust will require a renewed commitment to democratic principles, restraint and a serious effort to pursue lasting peace and stability in the region.`]],
      [`Shelly Tal Meron`, 
        `Member, Yesh Atid Party`, 
        [`I really feel bad with what this government has done through our relations with the United States, especially when it comes to the Democrats,” Meron said. “I don’t know what this government is doing with Democrats. They’re ignoring them.`]],
      [`Dahlia Scheindlin`, 
        `political strategist & public opinion expert, tel aviv`, 
        [
          `In Israel, the overwhelming perspective portrayed by everybody, whether it’s Netanyahu or the mainstream media, is Democrats as having become just irreparably, irredeemably anti-Israel`, 
          `Between Trump and Netanyahu, they’re turning the whole concept of liberal democracy on its head, both for America and Israel, calling into question whether the world runs on that currency anymore.`]], 
      ]}]
}

const Mug = {
  [`Alex Bores`]: [1777744977577],
  [`Chris Larsen`]: [1777745037620],
  [`Dahlia Scheindlin`]: [`1777725298656`],
  [`Ilan Goldenberg`]: [`1777737835665`],
  [`Jeanne Shaheen`]: [`1777738600102`],
  [`Rahm Emanuel`]: [`1777734472154`], 
  [`Shelly Tal Meron`]: [`1777739484806`],
  [`Yair Lapid`]: [`1777735467881`]
}

const Open = {

  //[1770566116156]: [`ca`, `Silicon Valley Money Fronts As Affordability Drive To Counter Labor Progressives & Wealth Tax`, [-122.0842, 37.2], 12000, `tech monopolies test ca labor`],
  //[1770821887204]: [`ca`, `ICEout.tech Signatories Highlights Glaring Disparity Between Silicon Valley Labor & C-Suite`, [-122.15308, 37.48116], 40000, `iceout san francisco`],
  [1771789645312]: [`us`, `Palantir Money Running Through Democrat Campaigns`, [-75.8926,42.74114], 3000, `palantir funded democrats`]
} 