import './styles.css';
import AddRule from './AddRule';
import Rule from './Rule';
import Query from './Query';

const query = new Query();

const queryObject = query.getQueryObject();

query.onChangeLogical((value) => {
  queryObject.combinator = value;
});

const rulesList = document.getElementById('rules-list');
const arrayRules = {};

document.getElementById('btn-add-rule').addEventListener('click', () => {
  const addRule = new AddRule();

  queryObject.rules.push(addRule.getRuleObject());

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
