`use strict`;

const {createConnection} = require(`mysql`);

const {  existsSync, mkdir, readdir, readFile, readFileSync, stat, unlinkSync, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

class Sql {
  
  constructor (Arg) {

    this.credentials = Arg[0];
  }

  Sql (Arg) {

    return createConnection(this.credentials).query(Arg[0], (A, B, C) => Arg[1]([A, B, C]));
  }

  pulls (Arg) {

    this.credentials.database = `sq`;

    this.Sql([readFileSync(`bin/sql/tables.sql`, {encoding: `utf8`}), (Raw) => {

      let Fields = {};

      Raw[2].forEach((Field, field) => {

        Fields[Field[0].table] = [[], {}];

        Raw[1][field].forEach(Obj => {

          Fields[Field[0].table][0].push(JSON.parse(Obj.json));

          Fields[Field[0].table][1][JSON.parse(Obj.json).md] = JSON.parse(Obj.json);
        });
      });

      Arg(Fields);
    }]);
  }

  places (Arg) {

    this.credentials.database = `sq`;

    this.Sql([{
      sql: `update ${Arg[0]} set json = ? where json = ?`,
      values: [JSON.stringify(Arg[1]), JSON.stringify(Arg[2])]}, (Raw) => Arg[3](Raw)]);
  }

  putlist (Arg) {

    this.credentials.database = `sq`;

    let Put = [];

    Arg[1].forEach(MD => {

      Put.push([new Tools().coats(MD)]);
    });

    this.Sql([{
      sql: `insert into ?? (json) values?`,
      values: [Arg[0], Put]}, (Raw) => Arg[2](Raw)]);     
  }

  puts (Arg) {

    this.credentials.database = `sq`;

    this.Sql([{
      sql: `insert into ?? set ?`,
      values: [Arg[0], {json: JSON.stringify(Arg[1])}]}, (Raw) => Arg[2](Raw)]);      
  }
}

class Tools {

  constructor () {}

  coats (types) { return JSON.stringify(types) }

  typen (coat) { return JSON.parse(coat) }

  csv2json () {

    let Obj = {SVG: {tally: {}}}, 

      CSV = readFileSync(`bin/csv/.iceout.csv`, {encoding: `utf8`});

    CSV = CSV.split(`\n`); 

    CSV.forEach(Value => {

      Value = Value.split(`,`);

      if (Value[3] && Value[4] && typeof parseFloat(Value[3]) === `number` && typeof parseFloat(Value[4]) === `number`) {

        if (Constants.geo[`${parseFloat(Value[3])}/${parseFloat(Value[4])}`]) {

          if (!Obj.SVG.tally[Constants.geo[`${parseFloat(Value[3])}/${parseFloat(Value[4])}`][0]]) {

            Obj.SVG.tally[Constants.geo[`${parseFloat(Value[3])}/${parseFloat(Value[4])}`][0]] = [];
          }

          Obj.SVG.tally[Constants.geo[`${parseFloat(Value[3])}/${parseFloat(Value[4])}`][0]].push(Value)
        }
      }
    });

    writeFileSync(`bin/json/1770821887204.json`, this.coats(Obj));
  }
}

let Constants = {

  geo: {
    [`-122.0842/37.4231`]: [`alphabet`],
    [`-122.15308/37.48116`]: [`meta`],
    [`-122.012701/37.334956`]: [`apple`],
    [`-122.3969288/37.7897845`]: [`salesforce`],
    [`-122.042018/37.392702`]: [`linkedin`],
    [`-122.268986/37.808955`]: [`block`],
    [`-122.4054484/37.7719568`]: [`airbnb`]
  }
}

module.exports = {

  Constants: Constants,
  
  Sql : new Sql([{
    host: `127.0.0.1`,
    user: `root`,
    password: `Mann2asugo`,
    multipleStatements: true
  }]),

  Tools : new Tools()
}