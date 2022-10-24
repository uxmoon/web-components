class Modal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.75);
          z-index: 10;
        }
        .modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          height: 30rem;
          z-index: 100;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
      </style>
      <div class="backdrop"></div>
      <div class="modal"></div>
    `;
  }
}

customElements.define('wc-modal', Modal);
