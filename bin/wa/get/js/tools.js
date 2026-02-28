`use strict`;

class Tools {

    constructor () {

        this.call = new XMLHttpRequest;

        this.synonyms = [[`\f`, ``], [`\n`, ``], [`\t`, ``], [`\r`, ``], [`'`, `u0027`], [`"`, `u0022`], [`/`, `u002f`], [`&`, `u0026`]];
    }

    coats (types) { return JSON.stringify(types); }

    plains (Raw)  {

        this.synonyms.slice(4).forEach(Regex => {

            Raw = Raw.replace(new RegExp(Regex[1], `g`), Regex[0]);
        });

        return Raw;
    }

    pull (Arg) {

        this.call.open(`POST`, Arg[0], true);

        this.call.setRequestHeader(`Content-Type`, `application/json`);

        this.call.send(JSON.stringify(Arg[1]));

        return this.call;
    }

  slim (String) {

    if (!String || String.length < 1 || String.match(/^(\s+)$/)) return;

    return String;
  }

  typen (coat) { return JSON.parse(coat) }
}

Tools = new Tools();

let Clients = sessionStorage;

const Constants = {

  pseudo: { 
    al: [`alabama`, [-86.9,31.8938557116156], 3000, 1],
    ak: [`alaska`, [-154.481318, 61.975301], 800], 
    az: [`arizona`, [-111.799683,32.593621], 3000, 4], 
    ca: [`california`, [-119.442, 37.2], 2000, 6], 
    co: [`colorado`, [-105.59962,38.499987], 2500, 8], 
    ct: [`connecticut`, [-72.727775,41.100696], 8700, 9], 
    de: [`delaware`, [-75.273786,38.7222], 7000, 10], 
    fl: [`florida`, [-81.811693,26.568745], 3000, 12], ia: `iowa`, il: `illinois`, md: `maryland`, mi: `michigan`, 
    mo: `missouri`, mn: `minnesota`, 
    nh: `new hampshire`, nj: `new jersey`, nm: `new mexico`, 
    nv: `nevada`, 
    ny: [`new york`, [-75.8926,42.74114], 3000, 36], oh: `ohio`, 
    or: `oregon`, pa: `pennsylvania`, ri: `rhode island`, tx: `texas`, va: `virginia`, wa: `washington`, wi: `wisconsin`,
    us: `usa`
  },

  DOMXY: [parseInt(document.querySelector(`body`).clientWidth), parseInt(document.querySelector(`#app`).clientHeight)]
}