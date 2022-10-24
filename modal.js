class Modal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        .backdrop {
          position: fixed;
          opacity: 0;
          pointer-events: none;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.75);
          z-index: 10;
        }
        .modal {
          position: fixed;
          opacity: 0;
          pointer-events: none;
          top: 15vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        :host([show]) .backdrop {
          opacity: 1;
          pointer-events: all;
        }
        :host([show]) .modal {
          opacity: 1;
          pointer-events: all;
        }
        .modal-header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }
        .modal-header ::slotted(*) {
          font-size: 1.75rem;
          margin: 0;
        }
        .modal-actions {
          border-top: 1px solid #ccc;
          display: flex;
          justify-content: flex-end;
          padding: 1rem;
        }
        .modal-actions button {
          margin: 0 0.5rem;
        }
        .modal-content {
          padding: 1rem;
        }
      </style>
      <div class="backdrop"></div>
      <div class="modal">
        <header class="modal-header">
          <slot name="title">
            Modal title
          </slot>
        </header>
        <section class="modal-content">
          <slot></slot>
        </section>
        <footer class="modal-actions">
          <button type="button">Cancel</button>
          <button type="button">Ok</button>
        </footer>
      </div>
    `;
  }

  show() {
    this.setAttribute('show', '')
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === 'show') {
  //     if (this.hasAttribute('show')) {
  //       this.shadowRoot.querySelector('.backdrop').style.opacity = 1;
  //       this.shadowRoot.querySelector('.backdrop').style.pointerEvents = 'all';
  //       this.shadowRoot.querySelector('.modal').style.opacity = 1;
  //       this.shadowRoot.querySelector('.modal').style.pointerEvents = 'all';
  //     }
  //   }
  // }
  
  // static get observedAttributes() {
  //   return ['show'];
  // }
}

customElements.define('wc-modal', Modal);
