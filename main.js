document.addEventListener('DOMContentLoaded', saveEmptyRule);

function saveEmptyRule() {
  count = 1
  emptyRule = document.getElementsByClassName("rule")[0]
  rule = emptyRule.outerHTML
  document.getElementsByClassName("deleteRule")[0].remove()
}

//Ограничения ввода данных в ячейки
function validate(evt, id) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  if (id == "word") {
    var regex = /[A-z]|[0-9]|\+|\-|\*/;
  } else if (id == "iterationLimit") {
    var regex = /[0-9]/;
  } else {
    var regex = /[A-z]|[0-9]|\+|\-|\*|\$|\_/;
  }
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

function setIdForRules() {
  let allRules = document.getElementsByClassName("rule")
  for (let i = 0; i < allRules.length; i++) {
    allRules[i].childNodes[1].innerText = "Rule " + (i + 1) + ":"
  }
  return allRules
}

function increaseId(direction) {
  direction ? count++ : count--;
  return rule
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

function deleteRule(currentRule) {
  ruleID = currentRule.parentNode.parentNode.id
  if (ruleID != 1)
    if (ruleID == count)
      increaseId(false)
  currentRule.parentNode.parentNode.remove()
}

function addDown(currentRule) {
  let prevElem = document.getElementById(currentRule.parentNode.parentNode.id)
  let parentDiv = document.getElementById("rules")
  let newRule = document.createElement('div')
  newRule.innerHTML = increaseId(true)
  newRule.id = count
  insertAfter(parentDiv, newRule, prevElem)
}

function solve() {
  let allRules = setIdForRules()

  let word = document.getElementById("word").value
  let VARIABLE = "_" + word;
  document.getElementById('target').innerHTML = "<b>Target:&emsp;" + VARIABLE + "</b>";

  let listLeft = new Map([]); //Левый столбец
  let listRight = new Map([]); //Правый столбец

  let iterationLimit = +(document.getElementById("iterationLimit").value)
  let errorMessage = "<b>Error: no end of cycle | max iterations = " + iterationLimit + "</b>"
  let progress = "";

  for (let i = 0; i < allRules.length; i++) {
    let key = allRules[i].childNodes[3].value
    let value = allRules[i].childNodes[7].value
    listLeft.set(i, key); //Добавление правил
    listRight.set(i, value);
  }

  let j = 0
  for (let i = 0;; j++) {
    if (j >= iterationLimit || (listLeft.get(i) == "" && listRight.get(i) == "")) {
      document.getElementById('error').innerHTML = errorMessage
      document.getElementById('error').style.display = "block";
      break;
    } else {
      document.getElementById('error').style.display = "none";
    }

    if (VARIABLE.search("_") == -1) {
      VARIABLE = "_" + VARIABLE
    }

    if (VARIABLE.indexOf(listLeft.get(i)) == -1) {
      i++;
      continue;
    } else {
      VARIABLE = VARIABLE.replace(listLeft.get(i), listRight.get(i));
      //Проверка на основку программы
      if (listRight.get(i) == "$") {
        VARIABLE = VARIABLE.replace("$", " ");
        progress += "<b>Ans: " + (i + 1) + "&emsp;" + VARIABLE + "</b><br />";
        break;
      }

      progress += "Rule: " + (i + 1) + " " + "&emsp;" + VARIABLE + "<br />";
      i = 0;
      continue;
    }
  }
  document.getElementById('progress').innerHTML = progress;

}