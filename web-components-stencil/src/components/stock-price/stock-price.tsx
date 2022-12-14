import { h, Component, State, Prop, Watch, Listen } from '@stencil/core'
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

  @State() loading = false;

  @Prop() stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.userInput = newValue
      this.validInput = true
      this.fetchStockPrice(newValue)
    }
  }

  @Listen('wcSelectedSymbol', { target: 'body' })
  onSelectedSymbol(event: CustomEvent) {
    console.log('stock symbol selected', event.detail);
    if(event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail
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
    // if (this.stockSymbol) {
    //   this.userInput = this.stockSymbol
    //   this.validInput = true
    // }
  }

  componentDidLoad() {
    console.log('component did load');
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol)
      this.userInput = this.stockSymbol
      this.validInput = true
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
    this.loading = true;
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
        this.loading = false
      })
      .catch((err) => {
        this.error = err.message;
        this.fetchedPrice = null;
        this.loading = false;
      })
  }

  hostData() {
    return { class: this.error ? 'error' : ''}
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
    if (this.loading) {
      textMessage = <wc-spinner></wc-spinner>
    }
    return (
      <div>
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
            disabled={!this.validInput || this.loading}
          >Fetch</button>
        </form>
        {/* <p>Price: ${this.fetchedPrice}</p> */}
        {textMessage}
      </div>
    )
  }
}
