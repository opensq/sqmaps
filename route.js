`use strict`;

const { existsSync, readFile, readFileSync, createReadStream, mkdir, stat, writeFile, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const { Constants, Sql, Tools } = require(`./tools`);

class Route {

  Call (Arg) {

    let url = (`./${Arg[0].url}`).replace(`//`, `/`).replace(/%(...)/g, (match, hex) => { return String.fromCharCode(parseInt(hex, 16))});

    let State = url.split(`/`);

    if (Arg[0].method === `GET`)  {

      if (State[1] === `favicon.ico`) {

        let File = createReadStream(`bin/wa/get/ico/.202605142100.png`);

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

              if (Pulls.pull === `ledge`) {

                Pulls[`ts`] = new Date().valueOf();

                Pulls[`md`] = createHash(`md5`).update(`${Pulls.ts}`, `utf8`).digest(`hex`)

                Sql.puts([`ledge`, Pulls, (Bill) => {Arg[1].end(Tools.coats({ts: Pulls.ts}))}]);
              }
            });
          }
        }
      });
    }
  }

  io (App) {

    App.on(`connection`, Polling => {

    setInterval(() => {

      Tools.Y24 = Tools.typen(readFileSync(`bin/json/index.json`, {encoding: `utf8`}));

    }, 4000);

      Polling.on(`data`, Arg => {

        if (existsSync(`bin/json/${Arg[1]}.json`) === true) {

          App.emit(`data`, [Arg[0], Tools.typen(readFileSync(`bin/json/${Arg[1]}.json`, {encoding: `utf8`}))]);
        }
      });

      setInterval(() => {

        let YValue = [];

        for (let plot in Tools.Y24[0]) {YValue.push([plot, Tools.Y24[0][plot]])}

        App.emit(`Y24`, [YValue, Tools.Y24[1]]);

      }, 1000);
    });
  }
}

module.exports = new Route();