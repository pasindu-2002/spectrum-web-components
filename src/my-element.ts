import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('my-element')
export class MyElement extends LitElement {

  @property({ type: Number })
  count = 0

  render() {
    return html`
      <div>
        <p>Count</p>
      </div>
    `
  }

  
  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
