import { nanoid } from 'nanoid';
import logicalOperators from './logicalOperators';
import './styles.css';
import AddRule from './AddRule';
import Rule from './Rule';

const logicalDropdownList = document.getElementById('logical');
logicalOperators.forEach((item) => {
  const option = document.createElement('option');
  option.value = item;
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
  queryObject.combinator = e.target.value;
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
const arrayRules = {};

document.getElementById('btn-add-rule').addEventListener('click', () => {
  const addRule = new AddRule();

  queryObject.rules.push(
    ruleObject(addRule.getField, addRule.getOperator, addRule.getValue),
  );

  const { id: idx } = queryObject.rules[queryObject.rules.length - 1];

  const li = document.createElement('li');
  li.id = idx;
  const newRule = new Rule(li);
  rulesList.appendChild(li);

  arrayRules.instance = newRule;

  newRule.onChangeField((value) => {
    queryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        const updateFieldValue = rule;
        updateFieldValue.field = value;
      }
    });
  });

  newRule.onChangeComparison((value) => {
    queryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        const updateOperatorValue = rule;
        updateOperatorValue.operator = value;
      }
    });
  });

  newRule.onChangeValue((value) => {
    queryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        const updateInputValue = rule;
        updateInputValue.value = value;
      }
    });
  });

  newRule.onDelete(() => {
    queryObject.rules = queryObject.rules.filter((rule) => rule.id !== idx);

    const node = document.getElementById(idx);
    rulesList.removeChild(node);

    if (queryObject.rules.length === 0) {
      arrayRules.instance = null;
    }
  });
});
