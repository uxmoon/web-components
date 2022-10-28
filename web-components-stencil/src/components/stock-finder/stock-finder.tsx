import { h, Host, Component } from '@stencil/core'

@Component({
  tag: 'wc-stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})

export class StockFinder {
  render() {
    return (
      <Host>
        <h2>
          Stock finder
        </h2>
      </Host>
    )
  }
}
