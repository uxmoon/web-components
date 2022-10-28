import { h, Host, Component, State, Prop, Watch } from '@stencil/core'
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

  @State() userInput: string;

  @State() validInput = false;

  @State() error: string;

  @Prop() stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.fetchStockPrice(newValue)
    }
  }

  // method to fetch data
  onFormSubmit(event: Event) {
    event.preventDefault();

    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
    const stockSymbol = this.elStockInput.value;
    this.fetchStockPrice(stockSymbol)
  }

  componentWillLoad() {
    console.log('component will load');
    console.log(this.stockSymbol);
    if (this.stockSymbol) {
      this.userInput = this.stockSymbol
      this.validInput = true
    }
  }

  componentDidLoad() {
    console.log('component did load');
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol)
    }
  }

  componentWillUpdate() {
    console.log('component will update');
  }

  componentDidUpdate() {
    console.log('component did update');
  }

  disconnectedCallback() {
    console.log('component did unload');
  }

  fetchStockPrice(stockSymbol) {
    // alpha vantage API
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`

    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (!data['Global Quote']['05. price']) {
          throw new Error('Invalid symbol!')
        }
        this.error = null;
        // get price and convert string to number
        this.fetchedPrice = +data['Global Quote']['05. price']
      })
      .catch((err) => {
        this.error = err.message;
      })
  }

  validateInput(event: Event) {
    this.userInput = (event.target as HTMLInputElement).value
    if (this.userInput.trim() !== '') {
      this.validInput = true
    } else {
      this.validInput = false
    }
  }

  render() {
    let textMessage = <p>Enter a valid symbol.</p>
    if (this.error) {
      textMessage = <p>{this.error}</p>
    }
    if (this.fetchedPrice) {
      textMessage = <p>Price: ${this.fetchedPrice}</p>
    }
    return (
      <Host>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input
            type="text"
            id="stock-symbol"
            ref={(el) => this.elStockInput = el}
            value={this.userInput}
            onInput={this.validateInput.bind(this)}
          />
          <button
            type="submit"
            disabled={!this.validInput}
          >Fetch</button>
        </form>
        {/* <p>Price: ${this.fetchedPrice}</p> */}
        {textMessage}
      </Host>
    )
  }
}
