import { h, Host, Component } from '@stencil/core'

@Component({
  tag: 'wc-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})

export class StockPrice {
  render() {
    return (
      <Host>
        <form>
          <input type="text" id="stock-symbol" />
          <button type="submit">Fetch</button>
        </form>
        <p>Price: {0}</p>
      </Host>
    )
  }
}
