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
}
