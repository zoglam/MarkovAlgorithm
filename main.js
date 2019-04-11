var listLeft = new Map([]);//Левый столбец
var listRight = new Map([]);//Правый столбец
var step = 0;
function rule() {
  console.clear();

  listLeft.set(step, ruleLeft.value);//Добавление правил
  listRight.set(step, ruleRight.value);
  step++;

  let ruleProgress = "Rules: <br />"

  //Цикл отображения таблицы правил в конце
  for (let j = 0; j < listLeft.size; j++) {
    if (j == 0) console.log("\n\n\n\nRules:\n")
    console.log((j + 1) + ":\t\t" + listLeft.get(j) + " → " + listRight.get(j));
    ruleProgress += (j + 1) + ":&emsp;" + listLeft.get(j) + " → " + listRight.get(j) + "<br />";
  }
  document.getElementById('rule').innerHTML = ruleProgress;
  return listLeft, listRight;
}

function main() {
  document.getElementById('error').style.display = "none";

  //Ввести слово
  let input = word.value;
  /*
    ------------------------------------------------------------------------------------
  */
  let VARIABLE = " " + input;//добавление пробела перед словом
  console.log("\n\n\n\nTarget: \t\t" + VARIABLE);//вывод в консоль условия
  document.getElementById('target').innerHTML = "<b>Target:&emsp;" + VARIABLE + "</b>";

  let progress = "";

  //Цикл, использующий правила, для преобразований
  for (let i = 0; ;) {
    if (i == 2000 || (listLeft.get(i) == "" && listRight.get(i) == "")) {
      console.log("Error: no end of cycle");
      document.getElementById('error').innerHTML = "<b>Error: no end of cycle</b>";
      document.getElementById('error').style.display = "block";
      break;
    }
    if (VARIABLE.indexOf(listLeft.get(i)) == -1) {
      i++;
      continue;
    }
    else {
      VARIABLE = VARIABLE.replace(listLeft.get(i), listRight.get(i));
      //Проверка на основку программы
      if (listRight.get(i) == "O") {
        VARIABLE = VARIABLE.replace("O", " ");
        console.log("Rtrn: " + (i + 1) + " " + "\t\t" + VARIABLE);
        progress += "<b>Rtrn: " + (i + 1) + "&emsp;" + VARIABLE + "</b><br />";
        break;
      }

      console.log("Rule: " + (i + 1) + " " + "\t\t" + VARIABLE);
      progress += "Rule: " + (i + 1) + " " + "&emsp;" + VARIABLE + "<br />";
      i = 0;
      continue;
    }
  }
  document.getElementById('progress').innerHTML = progress;
}