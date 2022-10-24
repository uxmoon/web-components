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
    // Add the HTML template structure
    // Add style tag
    this.shadowRoot.innerHTML = `
      <style></style>
      <div></div>
    `;
  }

  // Listen to attributes changes
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }
  
  static get observedAttributes() {
    return ['show'];
  }
}

// Component name should be two words to avoid conflicts with HTML tags
customElements.define('wc-modal', Modal);
```

## Visual studio code

Recommended extension for syntax highlighting:

[Comment tagged templates](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates)