import myPopUptemplate from './my-pop-up-template.js';
import { createTemplate } from '../lib/templatefactory.js';

class MyPopUp extends HTMLElement {
  static get observedAttributes() {
    return ['open', '_nodeDescription', '_nameOfNode'];
  }

  constructor() {
    super();
    this.close = this.close.bind(this);
    this._watchEscape = this._watchEscape.bind(this);
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
  }

  connectedCallback() {
    const template = createTemplate(myPopUptemplate());
    const node = document.importNode(template.content, true);
    this.appendChild(node);

    this.querySelector('button').addEventListener('click', this.close);
    // this.open = this.open;
  }

  disconnectedCallback() {
    this.querySelector('button').removeEventListener('click', this.close);
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(isOpen) {
    this.querySelector('.wrapper').classList.toggle('open', isOpen);
    this.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
    if (isOpen) {
      this._wasFocused = document.activeElement;
      this.setAttribute('open', '');
      document.addEventListener('keydown', this._watchEscape);
      this.focus();
      this.querySelector('button').focus();
    } else {
      this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
      this.removeAttribute('open');
      document.removeEventListener('keydown', this._watchEscape);
      this.close();
    }
  }

  set nameOfNode(nodeValue) {
    if (this._nameOfNode != nodeValue) {
      this.querySelector('#title').innerText = nodeValue;
      this._nameOfNode = nodeValue;
    }
  }

  get nameOfNode() {
    return this._nameOfNode;
  }

  set nodeDescription(desc) {
    if (this._nodeDescription != desc) {
      this.querySelector('#description').innerText = desc;
      this._nodeDescription = desc;
    }
  }

  get nodeDescription() {
    return this._nodeDescription;
  }

  close() {
    if (this.open !== false) {
      this.open = false;
    }
    const closeEvent = new CustomEvent('dialog-closed');
    this.dispatchEvent(closeEvent);
  }

  _watchEscape(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

customElements.get('my-pop-up') || customElements.define('my-pop-up', MyPopUp);