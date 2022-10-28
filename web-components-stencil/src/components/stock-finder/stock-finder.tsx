import { h, Host, Component, State, Event, EventEmitter } from '@stencil/core'
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'wc-stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})

export class StockFinder {
  // Add event emitter
  @Event({
    bubbles: true, composed: true
  }) wcSelectedSymbol: EventEmitter<string>

  // Add State for results
  @State() searchResults: {symbol: string, name: string}[] = [];

  // Add ref
  elStockName: HTMLInputElement;

  onSelectSymbol(symbol) {
    this.wcSelectedSymbol.emit(symbol)
  }

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
        console.log(data.bestMatches);
        this.searchResults =  data['bestMatches'].map((match) => {
          return {symbol: match['1. symbol'], name: match['2. name']}
        })
        console.log(this.searchResults);
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
        <ul>
          {this.searchResults.map((result) => {
            return <li>
              <button
                type='button'
                onClick={this.onSelectSymbol.bind(this, result.symbol)}
              >
                {result.symbol} - {result.name}
              </button>
            </li>
          })}
        </ul>
      </Host>
    )
  }
}
