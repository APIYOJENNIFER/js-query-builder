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
    this.deleteElement = null;

    // properly initialise rule
    this.init();
  }

  static createSelectElement(dropDownData, id) {
    const selectElement = document.createElement('select');
    selectElement.id = id;

    dropDownData.forEach((item) => {
      const option = document.createElement('option');
      option.value = item;
      option.innerHTML = item;
      selectElement.appendChild(option);
    });
    return selectElement;
  }

  get getFieldElement() {
    return this.fieldSelect;
  }

  get getValueElement() {
    return this.valueElement;
  }

  get getComparisonElement() {
    return this.comparisonSelect;
  }

  get getDeleteElement() {
    return this.deleteElement;
  }

  init() {
    this.createFieldSelect()
      .createOperatorSelect()
      .createValueInput()
      .createDeleteElement();
    this.addElementsToWrapper();
    this.addEventListeners();
  }

  createFieldSelect() {
    this.fieldSelect = Rule.createSelectElement(
      studentsInfo,
      'select-student-info',
    );

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

  createDeleteElement() {
    this.deleteElement = document.createElement('button');
    this.deleteElement.id = 'btn-delete-rule';
    this.deleteElement.appendChild(document.createTextNode('DELETE'));

    return this;
  }

  addElementsToWrapper() {
    if (this.wrapper) {
      this.wrapper.appendChild(this.fieldSelect);
      this.wrapper.appendChild(this.comparisonSelect);
      this.wrapper.appendChild(this.valueElement);
      this.wrapper.appendChild(this.deleteElement);
    } else {
      throw new Error('A wrapper element is required!');
    }
  }

  addEventListeners() {
    if (this.fieldSelect) {
      this.fieldSelect.addEventListener('change', (event) => {
        this.field = event.target.value;
        if (this.onChangeFieldCallback) {
          this.onChangeFieldCallback(this.field);
        }
      });
    }

    if (this.comparisonSelect) {
      this.comparisonSelect.addEventListener('change', (event) => {
        this.operator = event.target.value;
        if (this.onChangeComparisonCallback) {
          this.onChangeComparisonCallback(this.operator);
        }
      });
    }

    if (this.valueElement) {
      this.valueElement.addEventListener('change', (event) => {
        this.value = event.target.value;
        if (this.onChangeValueCallback) {
          this.onChangeValueCallback(this.value);
        }
      });
    }

    if (this.deleteElement) {
      this.deleteElement.addEventListener('click', () => {
        if (this.onDeleteCallback) {
          this.onDeleteCallback();
        }
      });
    }
  }

  onChangeField(callback) {
    this.onChangeFieldCallback = callback;
  }

  onChangeComparison(callback) {
    this.onChangeComparisonCallback = callback;
  }

  onChangeValue(callback) {
    this.onChangeValueCallback = callback;
  }

  onDelete(callback) {
    this.onDeleteCallback = callback;
  }
}
