import { nanoid } from 'nanoid';

export default class AddRule {
  #id;

  #field;

  #operator;

  #value;

  constructor(field = 'First Name', operator = '=', value = '') {
    this.#id = nanoid();
    this.#field = field;
    this.#operator = operator;
    this.#value = value;
  }

  set setField(value) {
    this.#field = value;
  }

  get getField() {
    return this.#field;
  }

  set setOperator(value) {
    this.#operator = value;
  }

  get getOperator() {
    return this.#operator;
  }

  set setValue(value) {
    this.#value = value;
  }

  get getValue() {
    return this.#value;
  }

  createRuleObject() {
    return {
      id: this.#id,
      field: this.#field,
      operator: this.#operator,
      value: this.#value,
    };
  }
}
