import { nanoid } from 'nanoid';
import logicalOperators from './logicalOperators';
import './styles.css';
// import AddRule from './AddRule';
import Rule from './Rule';

// const addRule = new AddRule();

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

// function ruleObject(field, operator, value) {
//   return {
//     id: nanoid(),
//     field,
//     operator,
//     value,
//   };
// }

const rulesList = document.getElementById('rules-list');

document.getElementById('btn-add-rule').addEventListener('click', () => {
  // addRule.addRule(
  //   queryObject,
  //   ruleObject,
  //   rulesList,
  //   studentsInfo,
  //   comparisonOperators,
  // );
  const li = document.createElement('li');
  const newRule = new Rule(li);
  rulesList.appendChild(li);

  newRule.getFieldElement.addEventListener('change', () => {
    console.log('Changed!', newRule.field);
  });
});
