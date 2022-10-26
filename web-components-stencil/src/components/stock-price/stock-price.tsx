import { h, Host, Component, State } from '@stencil/core'

@Component({
  tag: 'wc-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})

export class StockPrice {
  @State() fetchedPrice: number;

  // method to fetch data
  onFormSubmit(event: Event) {
    event.preventDefault();

    // alpha vantage API
    const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo'

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
          <input type="text" id="stock-symbol" />
          <button type="submit">Fetch</button>
        </form>
        <p>Price: ${this.fetchedPrice}</p>
      </Host>
    )
  }
}
