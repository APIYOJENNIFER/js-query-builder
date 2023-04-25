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

  init() {
    this.createFieldSelect().createOperatorSelect().createValueInput();
    this.addElementsToWrapper();
    this.addEventListeners();
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
      });
    }

    if (this.valueElement) {
      this.valueElement.addEventListener('change', (event) => {
        this.value = event.target.value;
      });
    }
  }

  onChangeField(callback) {
    this.onChangeFieldCallback = callback;
  }

  onDelete(callback) {
    this.onDeleteCallback = callback;
  }
}
