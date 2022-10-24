# Web Components

Web component basic structure:

```javascript
// Set name and extend HTMLElement
class Modal extends HTMLElement {
  constructor() {
    // Add 'super' to extend class
    super()
    // Add Shadow DOM
    this.attachShadow({ mode: 'open' })
  }
}

// Component name should be two words to avoid conflicts with HTML tags
customElements.define('wc-modal', Modal);
```