export default class AddRule {
  constructor(field = 'First Name', operator = '=', value = '') {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  set setField(value) {
    this.field = value;
  }

  get getField() {
    return this.field;
  }

  set setOperator(value) {
    this.operator = value;
  }

  get getOperator() {
    return this.operator;
  }

  set setValue(value) {
    this.value = value;
  }

  get getValue() {
    return this.value;
  }

  static onFieldChange(queryObject, selectStudentInfo, id) {
    selectStudentInfo.addEventListener('change', (e) => {
      queryObject.rules.forEach((rule) => {
        if (rule.id === id) {
          const updatedFieldValue = rule;
          updatedFieldValue.field = e.target[e.target.selectedIndex].text;
        }
      });
    });
  }

  static onOperatorChange(queryObject, selectComparisonOperator, id) {
    selectComparisonOperator.addEventListener('change', (e) => {
      queryObject.rules.forEach((rule) => {
        if (rule.id === id) {
          const updatedOperatorValue = rule;
          updatedOperatorValue.operator = e.target[e.target.selectedIndex].text;
        }
      });
    });
  }

  static onValueChange(queryObject, input, id) {
    input.addEventListener('input', (e) => {
      queryObject.rules.forEach((rule) => {
        if (rule.id === id) {
          const updatedInputValue = rule;
          updatedInputValue.value = e.target.value;
        }
      });
    });
  }

  static onDeleteRule(queryObject, rulesList, deleteRule, id) {
    deleteRule.addEventListener('click', () => {
      const returnedRules = queryObject;
      returnedRules.rules = queryObject.rules.filter((rule) => rule.id !== id);

      const node = document.getElementById(id);
      rulesList.removeChild(node);
    });
  }

  static createSelectElement(dropDownData, id) {
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

  addRule(
    queryObject,
    ruleObject,
    rulesList,
    studentsInfo,
    comparisonOperators,
  ) {
    const selectStudentInfo = AddRule.createSelectElement(
      studentsInfo,
      'select-student-info',
    );
    const selectComparisonOperator = AddRule.createSelectElement(
      comparisonOperators,
      'select-comparison-operator',
    );

    const input = document.createElement('input');
    input.id = 'input-value';

    const deleteRule = document.createElement('button');
    deleteRule.id = 'btn-delete-rule';
    deleteRule.appendChild(document.createTextNode('DELETE'));

    queryObject.rules.push(
      ruleObject(this.getField, this.getOperator, this.getValue),
    );

    const { id: idx } = queryObject.rules[queryObject.rules.length - 1];

    const li = document.createElement('li');
    li.id = idx;
    li.appendChild(selectStudentInfo);
    li.appendChild(selectComparisonOperator);
    li.appendChild(input);
    li.appendChild(deleteRule);
    rulesList.appendChild(li);

    AddRule.onFieldChange(queryObject, selectStudentInfo, idx);
    AddRule.onOperatorChange(queryObject, selectComparisonOperator, idx);
    AddRule.onValueChange(queryObject, input, idx);
    AddRule.onDeleteRule(queryObject, rulesList, deleteRule, idx);
  }
}
