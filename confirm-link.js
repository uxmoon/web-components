class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      if (!confirm('Do you really want to leave the page?')) {
        event.preventDefault();
      }
    })
  }
}

customElements.define('wc-confirm-link', ConfirmLink, { extends: 'a' })