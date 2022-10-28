import { h, Host, Component } from '@stencil/core'
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'wc-stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})

export class StockFinder {
  // Add ref
  elStockName: HTMLInputElement;

  // method
  onFindStocks(event: Event) {
    event.preventDefault();
    const stockName = this.elStockName.value;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`
    fetch(url)
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <Host>
        <h2>Stock finder</h2>
        <form onSubmit={this.onFindStocks.bind(this)}>
          <input
            type="text"
            id="stock-symbol"
            ref={(el) => this.elStockName = el}
          />
          <button
            type="submit"
          >Find</button>
        </form>
      </Host>
    )
  }
}
