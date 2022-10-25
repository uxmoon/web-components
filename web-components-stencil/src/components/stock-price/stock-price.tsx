import { h, Host, Component } from '@stencil/core'

@Component({
  tag: 'wc-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})

export class StockPrice {

  // method to fetch data
  onFormSubmit(event: Event) {
    event.preventDefault();
    console.log('go... fetch!');
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" id="stock-symbol" />
          <button type="submit">Fetch</button>
        </form>
        <p>Price: {0}</p>
      </Host>
    )
  }
}
