import { h, Component } from '@stencil/core'

@Component({
  tag: 'wc-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})

export class StockPrice {
  render() {
    return (
      <div>
        <h1>
          StockPrice
        </h1>
      </div>
    )
  }
}
