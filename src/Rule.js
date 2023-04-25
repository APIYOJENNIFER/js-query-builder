import studentsInfo from './studentsInfo';
import comparisonOperators from './comparisonOperators';

export default class Rule {
  constructor(wrapper) {
    this.wrapper = wrapper;

    // initialise values
    this.field = '';
    this.operator = '';
    this.value = '';

    // initialise elements
    this.comparisonSelect = null;
    this.fieldSelect = null;
    this.valueElement = null;

    // properly initialise rule
    this.init();
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

  init() {
    this.createFieldSelect().createOperatorSelect().createValueInput();
    this.addElementsToWrapper();
  }

  createFieldSelect() {
    this.fieldSelect = Rule.createSelectElement(studentsInfo, 'select-student-info');

    return this;
  }

  createOperatorSelect() {
    this.comparisonSelect = Rule.createSelectElement(
      comparisonOperators,
      'select-comparison-operator',
    );

    return this;
  }

  createValueInput() {
    this.valueElement = document.createElement('input');
    this.valueElement.id = 'input-value';

    return this;
  }

  addElementsToWrapper() {
    if (this.wrapper) {
      this.wrapper.appendChild(this.fieldSelect);
      this.wrapper.appendChild(this.comparisonSelect);
      this.wrapper.appendChild(this.valueElement);
    } else {
      throw new Error('A wrapper element is required!');
    }
  }
}
