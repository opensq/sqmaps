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
    ak: [`alaska`, [-154.481318, 61.975301], 800, 2], 
    az: [`arizona`, [-111.799683,32.593621], 3000, 4], 
    ca: [`california`, [-119.442, 37.2], 2000, 6], 
    co: [`colorado`, [-105.59962,38.499987], 2500, 8], 
    ct: [`connecticut`, [-72.727775,41.100696], 8700, 9], 
    de: [`delaware`, [-75.273786,38.7222], 7000, 10], 
    fl: [`florida`, [-81.811693,26.568745], 3000, 12], 
    ia: [`iowa`, [-96.621875,42.779255], 2500, 19], 
    il: [`illinois`, [-91.5062615151283,40.2001550699717], 3000, 17], 
    md: [`maryland`, [-76.046213,38.025533], 5000, 24], 
    mi: [`michigan`, [-84.61622,45.89447], 2000, 26], 
    mo: [`missouri`, [-92.565645,38.585208], 2700, 29], 
    mn: [`minnesota`, [-93.229039,46.000687], 2500, 27], 
    nh: [`new hampshire`, [-72.556112,42.866252], 5000, 33], 
    nj: [`new jersey`, [-75.559446,39.629812], 5000, 34], 
    nm: [`new mexico`, [-106.049195,33.796551], 2700, 35], 
    nv: [`nevada`, [-117.004795512304, 37.3164750119585], 2500, 32], 
    ny: [`new york`, [-75.8926,41.74114], 3000, 36], 
    oh: [`ohio`, [-82.863342,39.693693], 3800, 39], 
    or: [`oregon`, [-120.552441,42.840568], 2000, 41], 
    pa: [`pennsylvania`, [-77.619891,40.906661], 3200, 42], 
    ri: [`rhode island`, [-71.631472,41.166678], 5000, 44], 
    tx: [`texas`, [-100.23445,27.914034], 1500, 48], 
    va: [`virginia`, [-79.43475,37.289067], 2400, 51], 
    wa: [`washington`, [-120.737148,48.683466], 2000, 53], 
    wi: [`wisconsin`, [-89.934276,43.421149], 2500, 55],
    us: `usa`
  },

  DOMXY: [parseInt(document.querySelector(`body`).clientWidth), parseInt(document.querySelector(`#app`).clientHeight)]
}