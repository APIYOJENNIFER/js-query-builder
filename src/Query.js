import { nanoid } from 'nanoid';
import logicalOperators from './logicalOperators';

export default class Query {
  #id;

  #combinator;

  #rules;

  #queryObject;

  constructor(combinator = 'AND') {
    this.#id = nanoid();
    this.#combinator = combinator;
    this.#rules = [];

    this.#queryObject = {};

    this.logicalSelect = null;

    this.init();
  }

  init() {
    this.createQueryObject();
    this.createLogicalSelect();
    this.addEventListener();
  }

  setCombinator(value) {
    this.#combinator = value;
  }

  getCombinator() {
    return this.#combinator;
  }

  setRules(value) {
    this.#rules = value;
  }

  getRules() {
    return this.#rules;
  }

  getLogicalElement() {
    return this.logicalSelect;
  }

  getQueryObject() {
    return this.#queryObject;
  }

  createQueryObject() {
    this.#queryObject = {
      id: this.#id,
      combinator: this.#combinator,
      rules: this.#rules,
    };

    return this;
  }

  createLogicalSelect() {
    this.logicalSelect = document.getElementById('logical');

    logicalOperators.forEach((item) => {
      const option = document.createElement('option');
      option.value = item;
      option.innerHTML = item;
      this.logicalSelect.appendChild(option);
    });

    return this;
  }

  addEventListener() {
    if (this.logicalSelect) {
      this.logicalSelect.addEventListener('change', (event) => {
        this.#combinator = event.target.value;
        if (this.onChangeLogicalCallback) {
          this.onChangeLogicalCallback(this.#combinator);
        }
      });
    }
  }

  onChangeLogical(callback) {
    this.onChangeLogicalCallback = callback;
  }
}
