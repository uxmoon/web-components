import { h, Component } from '@stencil/core'

@Component({
  tag: 'wc-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})

export class SideDrawer {
  render() {
    return (
      <aside>
        <h1>
          SideDrawer
        </h1>
      </aside>
    )
  }
}
