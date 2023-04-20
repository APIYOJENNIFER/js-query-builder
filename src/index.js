import { nanoid } from 'nanoid';
import logical from './logical_operators';
import comparison from './comparison_operators';
import studentsData from './students_data';
import './styles.css';

const logicalArray = Object.values(logical);

const logicalDropdownList = document.getElementById('logical');
logicalArray.forEach((item) => {
  const option = document.createElement('option');
  option.value = option.innerHTML;
  option.innerHTML = item;
  logicalDropdownList.appendChild(option);
});

const comb = 'AND';

const rulesObj = {
  id: nanoid(),
  combinator: comb,
  rules: [],
};

logicalDropdownList.addEventListener('change', (e) => {
  rulesObj.combinator = e.target[e.target.selectedIndex].text;
});

function addNewRule(field, operator, value) {
  return {
    id: nanoid(),
    field,
    operator,
    value,
  };
}

const rulesList = document.getElementById('rules-list');

function onFieldChange(selectStudentInfo, id) {
  selectStudentInfo.addEventListener('change', (e) => {
    rulesObj.rules.forEach((rule) => {
      if (rule.id === id) {
        const updatedFieldValue = rule;
        updatedFieldValue.field = e.target[e.target.selectedIndex].text;
      }
    });
  });
}

function onOperatorChange(selectComparisonOp, id) {
  selectComparisonOp.addEventListener('change', (e) => {
    rulesObj.rules.forEach((rule) => {
      if (rule.id === id) {
        const updatedOperatorValue = rule;
        updatedOperatorValue.operator = e.target[e.target.selectedIndex].text;
      }
    });
  });
}

function onValueChange(input, id) {
  input.addEventListener('input', (e) => {
    rulesObj.rules.forEach((rule) => {
      if (rule.id === id) {
        const updatedInputValue = rule;
        updatedInputValue.value = e.target.value;
      }
    });
  });
}

function onDeleteRule(deleteRule, id) {
  deleteRule.addEventListener('click', () => {
    rulesObj.rules.pop(id);

    const node = document.getElementById(id);
    rulesList.removeChild(node);
  });
}

function addRule() {
  const studentsArray = Object.values(studentsData);

  const selectStudentInfo = document.createElement('select');
  selectStudentInfo.id = 'select-student-info';
  const field = 'First Name';
  const operator = '=';

  studentsArray.forEach((info) => {
    const studentOption = document.createElement('option');
    studentOption.value = studentOption.innerHTML;
    studentOption.innerHTML = info;
    selectStudentInfo.appendChild(studentOption);
  });

  const comparisonArray = Object.values(comparison);

  const selectComparisonOp = document.createElement('select');
  selectComparisonOp.id = 'select-comp-op';

  comparisonArray.forEach((comp) => {
    const comparisonOption = document.createElement('option');
    comparisonOption.value = comparisonOption.innerHTML;
    comparisonOption.innerHTML = comp;
    selectComparisonOp.appendChild(comparisonOption);
  });

  const input = document.createElement('input');
  input.id = 'input-value';
  const { value } = input;

  const deleteRule = document.createElement('button');
  deleteRule.id = 'btn-delete-rule';
  deleteRule.appendChild(document.createTextNode('DELETE'));

  rulesObj.rules.push(addNewRule(field, operator, value));

  let id = '';
  const getId = () => {
    rulesObj.rules.map((rule) => {
      id = rule.id;
      return id;
    });
  };

  getId();

  const li = document.createElement('li');
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

document.getElementById('btn-add-rule').addEventListener('click', addRule);
