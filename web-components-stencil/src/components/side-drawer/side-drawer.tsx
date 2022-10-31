import { h, Host, Component, Prop, State, Method } from '@stencil/core'

@Component({
  tag: 'wc-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})

export class SideDrawer {
  @State() showContactTab = false;

  @Prop({ reflect: true }) heading: string;

  @Prop({ reflect: true, mutable: true }) show: boolean;

  // Private Methods
  onHideDrawer() {
    this.show = false;
    console.log('hide');
  }

  onContentChange(content: string) {
    // console.log(content);
    this.showContactTab = content === 'contact';
  }

  // Public methods
  @Method()
  async showDrawer() {
    this.show = true;
  }

  render() {
    let mainContent = <slot />
    if (this.showContactTab) {
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
    }
    return (
      <Host>
        <div
          class='backdrop'
          onClick={this.onHideDrawer.bind(this)}
        />
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
            <button
              class={!this.showContactTab ? 'active' : ''}
              onClick={this.onContentChange.bind(this, 'nav')}
            >
              Navigation
            </button>
            <button
              class={this.showContactTab ? 'active' : ''}
              onClick={this.onContentChange.bind(this, 'contact')}
            >
              Contact
            </button>
          </section>
          <main>
            {mainContent}
          </main>
        </aside>
      </Host>
    )
  }
}
