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
    let mainContent = <slot />
    mainContent = (
      <div class='contact-information'>
        <h2>Contact information</h2>
        <p>You can reach us via phone or email</p>
        <ul>
          <li>Phone: 11 5555 3333</li>
          <li>Email:
            <a href="mailto:fake@mail.com">
              fake@mail.com
            </a>
          </li>
        </ul>
      </div>
    );
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
        <section class='drawer-tabs'>
          <button class='active'>Navigation</button>
          <button>Contact</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    )
  }
}
