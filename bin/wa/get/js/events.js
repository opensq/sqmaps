`use strict`;

class Event {

  listen (Arg) { 

    (Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
  }

  getSource (Arg) {

    if (Arg.target) return Arg.target;
  }

  /** **/

  app (Arg) {

    document.querySelectorAll(`.atxt`).forEach(VAR => {

      this.listen([VAR, `click`, S => {

        window.location = VAR.getAttribute(`url`);
      }]);
    });
  }
}

Event = new Event;