import logical from "./logical_operators";
import comparison from "./comparison_operators";
import studentsData from "./students_data";
import "./styles.css";
import {nanoid} from "nanoid";

let logicalArray = [];

for (const key in logical) {
    logicalArray.push(logical[key]);
}

let logicalDropdownList = document.getElementById("logical");
logicalArray.forEach(function (item) {
    let option = document.createElement("option");
    option.value = option.innerHTML = item;
    logicalDropdownList.appendChild(option);
});

const comb = "AND";

    logicalDropdownList.addEventListener("change", (e) => {
       rulesObj.combinator = e.target.value
    });

let rulesObj = {id: nanoid(), combinator: comb, rules:[]}

function addNewRule(field, operator, value){
    return {
        id: nanoid(), 
        field: field,
        operator: operator,
        value: value
    }
}

document.getElementById("btn-add-rule").addEventListener("click", addRule);

let rulesList = document.getElementById("rules-list");
function addRule() {
    
    let studentsArray = [];
    for(const key in studentsData){
        studentsArray.push(studentsData[key]);
    }
    let selectStudentInfo = document.createElement("select");
    selectStudentInfo.id = "select-student-info";
    let field = "First Name";
    let operator = "=";

    studentsArray.forEach(function (info) {
        let studentOption = document.createElement("option")
        studentOption.value = studentOption.innerHTML = info;
        selectStudentInfo.appendChild(studentOption);
    })

    let comparisonArray = [];
    for (const key in comparison){
        comparisonArray.push(comparison[key]);
    }
    let selectComparisonOp = document.createElement("select");
    selectComparisonOp.id = "select-comp-op";
    
    comparisonArray.forEach(function (comp){
        let comparisonOption = document.createElement("option");
        comparisonOption.value = comparisonOption.innerHTML = comp;
        selectComparisonOp.appendChild(comparisonOption);
    })

    let input = document.createElement("input");
    input.id = "input-value"
    let value = input.value;
    
    let deleteRule = document.createElement("button")
    deleteRule.id = "btn-delete-rule";
    deleteRule.appendChild(document.createTextNode("DELETE"));

    rulesObj.rules.push(addNewRule(field, operator, value));

    let id = "";
    let getId = function(){
        rulesObj.rules.map(rule => {
         id = rule.id;
         return id;
    })}

    getId()

    let li = document.createElement("li");
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

function onFieldChange(selectStudentInfo, id){
  selectStudentInfo.addEventListener("change", function(e){
      rulesObj.rules.map(rule => {
            if(rule.id === id){ 
                rule.field = e.target.value;
            }
      })
  })
}

function onOperatorChange(selectComparisonOp, id){
    selectComparisonOp.addEventListener("change", function(e){
        rulesObj.rules.map(rule => {
            if(rule.id === id){
                rule.operator = e.target.value;
            }
        })
    })
}

function onValueChange(input, id){
    input.addEventListener("input", function(e){
        rulesObj.rules.map(rule => {
            if(rule.id === id){
                rule.value = e.target.value;
            }
        })
    })
}

function onDeleteRule(deleteRule, id){
    deleteRule.addEventListener("click", function(){
        rulesObj.rules.pop(id);
        
        let node = document.getElementById(id)
        rulesList.removeChild(node)

    })
}
