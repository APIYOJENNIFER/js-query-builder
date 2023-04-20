import { nanoid } from 'nanoid';
import logicalOperators from './logicalOperators';
import comparisonOperators from './comparisonOperators';
import studentsInfo from './studentsInfo';
import './styles.css';

const logicalDropdownList = document.getElementById('logical');
logicalOperators.forEach((item) => {
  const option = document.createElement('option');
  option.value = option.innerHTML;
  option.innerHTML = item;
  logicalDropdownList.appendChild(option);
});

const combinator = 'AND';

const queryObject = {
  id: nanoid(),
  combinator,
  rules: [],
};

logicalDropdownList.addEventListener('change', (e) => {
  queryObject.combinator = e.target[e.target.selectedIndex].text;
});

function ruleObject(field, operator, value) {
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
    queryObject.rules.forEach((rule) => {
      if (rule.id === id) {
        const updatedFieldValue = rule;
        updatedFieldValue.field = e.target[e.target.selectedIndex].text;
      }
    });
  });
}

function onOperatorChange(selectComparisonOperator, id) {
  selectComparisonOperator.addEventListener('change', (e) => {
    queryObject.rules.forEach((rule) => {
      if (rule.id === id) {
        const updatedOperatorValue = rule;
        updatedOperatorValue.operator = e.target[e.target.selectedIndex].text;
      }
    });
  });
}

function onValueChange(input, id) {
  input.addEventListener('input', (e) => {
    queryObject.rules.forEach((rule) => {
      if (rule.id === id) {
        const updatedInputValue = rule;
        updatedInputValue.value = e.target.value;
      }
    });
  });
}

function onDeleteRule(deleteRule, id) {
  deleteRule.addEventListener('click', () => {
    queryObject.rules = queryObject.rules.filter((rule) => rule.id !== id);

    const node = document.getElementById(id);
    rulesList.removeChild(node);
  });
}

function createSelectElement(dropDownData, id) {
  const selectElement = document.createElement('select');
  selectElement.id = id;

  dropDownData.forEach((item) => {
    const option = document.createElement('option');
    option.value = option.innerHTML;
    option.innerHTML = item;
    selectElement.appendChild(option);
  });
  return selectElement;
}

function addRule() {
  const field = 'First Name';
  const operator = '=';

  const selectStudentInfo = createSelectElement(
    studentsInfo,
    'select-student-info',
  );
  const selectComparisonOperator = createSelectElement(
    comparisonOperators,
    'select-comparison-operator',
  );

  const input = document.createElement('input');
  input.id = 'input-value';
  const { value } = input;

  const deleteRule = document.createElement('button');
  deleteRule.id = 'btn-delete-rule';
  deleteRule.appendChild(document.createTextNode('DELETE'));

  queryObject.rules.push(ruleObject(field, operator, value));

  const { id: idx } = queryObject.rules[queryObject.rules.length - 1];

  const li = document.createElement('li');
  li.id = idx;
  li.appendChild(selectStudentInfo);
  li.appendChild(selectComparisonOperator);
  li.appendChild(input);
  li.appendChild(deleteRule);
  rulesList.appendChild(li);

  onFieldChange(selectStudentInfo, idx);
  onOperatorChange(selectComparisonOperator, idx);
  onValueChange(input, idx);
  onDeleteRule(deleteRule, idx);
}

document.getElementById('btn-add-rule').addEventListener('click', addRule);
