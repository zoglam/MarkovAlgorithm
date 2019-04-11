//Ограничения ввода данных в ячейки
function validate(evt, id) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (id == "word") {
      var regex = /[A-z]|[0-9]|\+|\*/;
    }
    else {
      var regex = /[A-z]|[0-9]|\+|\*|[" "]/;
    }
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }