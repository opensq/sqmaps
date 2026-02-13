`use strict`;

const { readFile, readFileSync, createReadStream, mkdir, stat, writeFile, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const { Constants, Sql, Tools } = require(`./tools`);

class Route {

  Call (Arg) {

    let url = (`./${Arg[0].url}`).replace(`//`, `/`).replace(/%(...)/g, (match, hex) => { return String.fromCharCode(parseInt(hex, 16))});

    let State = url.split(`/`);

    if (Arg[0].method === `GET`)  {

      if (State[1] === `favicon.ico`) {

        let File = createReadStream(`bin/wa/get/ico/202601192137.png`);

        Arg[1].writeHead(200, {[`Content-Type`]: `image/png`});

        File.on(`data`, Arg[1].write.bind(Arg[1]));

        File.on(`close`, () => Arg[1].end());
      }

      else {

        let DOM = readFileSync(`bin/html/app.html`, {encoding: `utf8`});

        let CSS = readFileSync(`bin/css/app.css`, {encoding: `utf8`});

        DOM = DOM.replace(/`css`/, CSS);

        Arg[1].writeHead(200, {[`Content-Type`]: `text/html`});

        Arg[1].end(DOM);
      }
    }

    else if (Arg[0].method === `POST`) {

      let blob = new Buffer.alloc(+Arg[0].headers[`content-length`]);

      let Pull = ``;

      let allocate = 0;

      Arg[0].on(`data`, (Data) => {

        Data.copy(blob, allocate);

        allocate += Data.length;

        Pull += Data;

      }).on(`end`, () => {

        let Pulls;

        if (Pull[0] === `{`) Pulls = JSON.parse(Pull);

        if (State[1] === `json`) {

          Arg[1].setHeader(`Content-Type`, `application/json`);

          if (State[2] === `web`) {

            Sql.pulls(Raw => {

              if (Pulls.pull === `app`) { Arg[1].end(Tools.coats({})) }
            });
          }
        }
      });
    }
  }

  io (App) {

    App.on(`connection`, Polling => {

      Polling.on(`data`, Arg => {

        App.emit(`data`, [Arg[0], Tools.typen(readFileSync(`bin/json/${Arg[1]}.json`, {encoding: `utf8`}))])});
    });
  }
}

module.exports = new Route();