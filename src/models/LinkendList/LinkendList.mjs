import Node from "./Node.mjs";
import Estado from "../Estado.mjs";

export default class LinkedList {
  #head;
  #count;

  constructor() {
    this.#head = undefined;
    this.#count = 0;
  }

  push(name, peso) {
    let estado = new Estado(name, peso);
    const node = new Node(estado);

    if (this.#head == null) {
      this.#head = node;
    } else {
      let current = this.#head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.#count++;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.#head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node.data.name;
    }
    return undefined;
  }

  getWeightAt(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.#head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node.data.peso;
    }
    return undefined;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#count;
  }

  remove(value) {
    if (this.#head === null) {
      return null;
    }

    if (this.#head.getData() === value) {
      this.#head = this.#head.next;
      this.#count--;
      return;
    }

    let current = this.#head;
    let previous = null;

    while (current) {
      if (current.getData() === value) {
        previous.next = current.next;
        this.#count--;
        return;
      }
      previous = current;
      current = current.next;
    }
  }
}
