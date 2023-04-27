import { nanoid } from 'nanoid';

export default class AddRule {
  #id;

  #field;

  #operator;

  #value;

  #ruleObject;

  constructor(field = 'First Name', operator = '=', value = '') {
    this.#id = nanoid();
    this.#field = field;
    this.#operator = operator;
    this.#value = value;

    this.#ruleObject = {};

    this.createRuleObject();
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

  getRuleObject() {
    return this.#ruleObject;
  }

  createRuleObject() {
    this.#ruleObject = {
      id: this.#id,
      field: this.#field,
      operator: this.#operator,
      value: this.#value,
    };
    return this;
  }
}
