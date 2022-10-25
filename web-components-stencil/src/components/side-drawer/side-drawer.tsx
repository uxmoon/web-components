import { h, Component, Prop } from '@stencil/core'

@Component({
  tag: 'wc-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})

export class SideDrawer {
  @Prop({ reflect: true }) title: string;

  @Prop({ reflect: true }) show: boolean;

  render() {
    return (
      <aside>
        <header>
          <h1>{this.title}</h1>
        </header>
        <main>
          <slot></slot>
        </main>
      </aside>
    )
  }
}
