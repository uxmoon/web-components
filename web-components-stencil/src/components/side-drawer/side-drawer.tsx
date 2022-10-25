import { h, Component, Prop } from '@stencil/core'

@Component({
  tag: 'wc-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})

export class SideDrawer {
  @Prop({ reflect: true }) heading: string;

  @Prop({ reflect: true, mutable: true }) show: boolean;

  // Methods
  onHideDrawer() {
    this.show = false;
  }

  render() {
    return (
      <aside>
        <header>
          <h1>{this.heading}</h1>
          <button
            type='button'
            onClick={this.onHideDrawer.bind(this)}
          >
            &times;
          </button>
        </header>
        <main>
          <slot></slot>
        </main>
      </aside>
    )
  }
}
