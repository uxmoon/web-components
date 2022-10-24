class Modal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.isOpen = false
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
          top: 10vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease-in-out;
        }
        :host([show]) .backdrop {
          opacity: 1;
          pointer-events: all;
        }
        :host([show]) .modal {
          opacity: 1;
          pointer-events: all;
        }
        :host([show]) .modal {
          top: 15vh;
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
          <button type="button" class="action-cancel">Cancel</button>
          <button type="button" class="action-ok">Ok</button>
        </footer>
      </div>
    `;
    // const slots = this.shadowRoot.querySelectorAll('slot')
    // slots[1].addEventListener('slotchange', () => {
    //   console.dir(slots[1].assignedNodes());
    // })

    const buttonCancel = this.shadowRoot.querySelector('.action-cancel')
    const buttonOk = this.shadowRoot.querySelector('.action-ok')
    const backdrop = this.shadowRoot.querySelector('.backdrop')

    buttonCancel.addEventListener('click', this._decline.bind(this))
    buttonOk.addEventListener('click', this._confirm.bind(this))
    backdrop.addEventListener('click', this._decline.bind(this))
  }

  show() {
    this.setAttribute('show', '')
    this.isOpen = true
  }

  hide() {
    if (this.hasAttribute('show')) {
      this.removeAttribute('show')
    }
    this.isOpen = false
  }

  _decline(event) {
    this.hide()
    const declineEvent = new Event('decline', { bubbles: true, composed: true })
    event.target.dispatchEvent(declineEvent)
  }

  _confirm() {
    this.hide()
    const confirmEvent = new Event('confirm')
    this.dispatchEvent(confirmEvent)
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
