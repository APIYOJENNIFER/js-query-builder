import logical from "./logical_operators";
import comparison from "./comparison_operators";
import studentsData from "./students_data";
import "./styles.css";
import { nanoid } from "nanoid";

const logicalArray = [];

for (const key in logical) {
  logicalArray.push(logical[key]);
}

const logicalDropdownList = document.getElementById("logical");
logicalArray.forEach(function (item) {
  const option = document.createElement("option");
  option.value = option.innerHTML = item;
  logicalDropdownList.appendChild(option);
});

const comb = "AND";

const rulesObj = {
  id: nanoid(),
  combinator: comb,
  rules: [],
};

logicalDropdownList.addEventListener("change", (e) => {
  rulesObj.combinator = e.target.value;
});

function addNewRule(field, operator, value) {
  return {
    id: nanoid(),
    field: field,
    operator: operator,
    value: value,
  };
}

const rulesList = document.getElementById("rules-list");

function onFieldChange(selectStudentInfo, id) {
  selectStudentInfo.addEventListener("change", function (e) {
    rulesObj.rules.map((rule) => {
      if (rule.id === id) {
        rule.field = e.target.value;
      }
    });
  });
}

function onOperatorChange(selectComparisonOp, id) {
  selectComparisonOp.addEventListener("change", function (e) {
    rulesObj.rules.map((rule) => {
      if (rule.id === id) {
        rule.operator = e.target.value;
      }
    });
  });
}

function onValueChange(input, id) {
  input.addEventListener("input", function (e) {
    rulesObj.rules.map((rule) => {
      if (rule.id === id) {
        rule.value = e.target.value;
      }
    });
  });
}

function onDeleteRule(deleteRule, id) {
  deleteRule.addEventListener("click", function () {
    rulesObj.rules.pop(id);

    const node = document.getElementById(id);
    rulesList.removeChild(node);
  });
}

function addRule() {
  const studentsArray = [];
  for (const key in studentsData) {
    studentsArray.push(studentsData[key]);
  }
  const selectStudentInfo = document.createElement("select");
  selectStudentInfo.id = "select-student-info";
  const field = "First Name";
  const operator = "=";

  studentsArray.forEach(function (info) {
    const studentOption = document.createElement("option");
    studentOption.value = studentOption.innerHTML = info;
    selectStudentInfo.appendChild(studentOption);
  });

  const comparisonArray = [];
  for (const key in comparison) {
    comparisonArray.push(comparison[key]);
  }
  const selectComparisonOp = document.createElement("select");
  selectComparisonOp.id = "select-comp-op";

  comparisonArray.forEach(function (comp) {
    const comparisonOption = document.createElement("option");
    comparisonOption.value = comparisonOption.innerHTML = comp;
    selectComparisonOp.appendChild(comparisonOption);
  });

  const input = document.createElement("input");
  input.id = "input-value";
  const value = input.value;

  const deleteRule = document.createElement("button");
  deleteRule.id = "btn-delete-rule";
  deleteRule.appendChild(document.createTextNode("DELETE"));

  rulesObj.rules.push(addNewRule(field, operator, value));

  let id = "";
  const getId = function () {
    rulesObj.rules.map((rule) => {
      id = rule.id;
      return id;
    });
  };

  getId();

  const li = document.createElement("li");
  li.id = id;
  li.appendChild(selectStudentInfo);
  li.appendChild(selectComparisonOp);
  li.appendChild(input);
  li.appendChild(deleteRule);
  rulesList.appendChild(li);

  onFieldChange(selectStudentInfo, id);
  onOperatorChange(selectComparisonOp, id);
  onValueChange(input, id);
  onDeleteRule(deleteRule, id);
}

document.getElementById("btn-add-rule").addEventListener("click", addRule);
