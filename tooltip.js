class Tooltip extends HTMLElement {
  constructor() {
    super()
    // this._tooltipContent
    this._tooltipVisible = false
    this._tooltipIcon
    this._tooltipText = "Default tooltip text"
    this.attachShadow({ mode: 'open' })
    // const template = document.querySelector('#tooltip-template')
    // this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: #222;
          color: #fff;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;          
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.25)
        }

        ::slotted(.highlight) {
          border-bottom: 1px dotted #000;
        }

        :host {
          position: relative;
        }

        :host(.important) {
          background-color: var(--color-primary);
          padding: 0.15rem;
        }

        :host-context(p) {
          font-weight: bold;
        }

        .icon {
          background-color: #000;
          color: #fff;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>
      <slot>Default slot text</slot>
      <span class="icon">?</span>
    `
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span')
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    // const tooltipIcon = this.shadowRoot.querySelector('span')
    // tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    // tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // performance, if new value is the same as old is redundant, don't run
    if (newValue === oldValue) return;

    // listen to desired attribute
    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ['text'];
  }

  disconnectedCallback() {
    console.log('disconnected');
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
  }

  _render() {
    let tooltipContent = this.shadowRoot.querySelector('div')
    if (this._tooltipVisible) {
      tooltipContent = document.createElement('div')
      tooltipContent.textContent = this._tooltipText
      this.shadowRoot.appendChild(tooltipContent)
    } else {
      if (tooltipContent) {
        this.shadowRoot.removeChild(tooltipContent)
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true
    this._render()
    // this._tooltipContent = document.createElement('div')
    // this._tooltipContent.textContent = this._tooltipText
    // this.shadowRoot.appendChild(this._tooltipContent)
  }

  _hideTooltip() {
    this._tooltipVisible = false
    this._render()
    // this.shadowRoot.removeChild(this._tooltipContent)
  }
}

customElements.define('vds-tooltip', Tooltip);