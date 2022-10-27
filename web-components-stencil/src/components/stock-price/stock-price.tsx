import { h, Host, Component, State } from '@stencil/core'
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'wc-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})

export class StockPrice {
  elStockInput: HTMLInputElement;

  // @Element() el: HTMLElement;

  @State() fetchedPrice: number;

  // method to fetch data
  onFormSubmit(event: Event) {
    event.preventDefault();

    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
    const stockSymbol = this.elStockInput.value;

    // alpha vantage API
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`

    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log(data['Global Quote']['05. price']);

        // get price and convert string to number
        this.fetchedPrice = +data['Global Quote']['05. price']
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input
            type="text"
            id="stock-symbol"
            ref={(el) => this.elStockInput = el}
          />
          <button type="submit">Fetch</button>
        </form>
        <p>Price: ${this.fetchedPrice}</p>
      </Host>
    )
  }
}
