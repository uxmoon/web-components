import { h, Component } from "@stencil/core";

@Component({
  tag: 'wc-spinner',
  styleUrl: 'spinner.css',
  shadow: true
})

export class Spinner {
  return() {
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  }
}
