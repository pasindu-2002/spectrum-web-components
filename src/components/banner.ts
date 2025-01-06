import { html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FastDialog } from "./FastDialog";

@customElement("annoucement-component")
export class Annoucement extends FastDialog {
  @property({ type: String })
  title = "Banner Title";
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  btnText = "Click me";

  async onBtnPress(): Promise<void> {
    this.dispatchEvent(
      new CustomEvent("btn-press", {
        bubbles: true,
        composed: true,
      })
    );
    await this.close();
  }

  renderDialog() {
    return html`
        <sp-alert-banner open class="alert-banner" dismissible>
          <div class="title">${this.title}</div>
          <div class="content">
            ${this.content}
          </div>
          <sp-button treatment="outline" static-color="white" slot="action" @click=${this
          .onBtnPress}>
            ${this.btnText}
          </sp-button>
        </sp-alert-banner>
    `;
  }

  static styles = css`
    .alert-banner {
      margin: 10px;
      width: 100%;
    }
    .alert-banner {
      align-items: center;
      background-color: #0367e0;
      font-family: Arial, sans-serif;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.5rem;
    }
    .content {
      font-size: 14px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "annoucement-component": Annoucement;
  }
}
