import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FastDialog } from "./FastDialog";

@customElement("pl-announcement")
export class Announcement extends FastDialog {
  @property({ type: String })
  title = "Title";

  @property({ type: String })
  description = "Content";

  @property({ type: String })
  primaryBtnText = "Primary Button";

  @property({ type: String })
  secondaryBtnText = "Secondary Button";

  async onPrimaryBtnClick(): Promise<void> {
    this.dispatchEvent(
      new CustomEvent("primary-btn-click", {
        bubbles: true,
        composed: true,
      })
    );
    await this.close();
  }

  async onSecondaryBtnClick(): Promise<void> {
    this.dispatchEvent(
      new CustomEvent("secondary-btn-click", {
        bubbles: true,
        composed: true,
      })
    );
    await this.close
  }

  renderDialog() {
    return html`
      <sp-dialog-wrapper dismissable underlay>
        <sp-alert-dialog variant="information">
            
          <h2 style="font-size:24px;" slot="heading">${this.title}</h2>

          ${this.description}

          <div class="flex asset">
            <sp-asset variant="file"></sp-asset>
          </div>

          <sp-button
            slot="button"
            id="cancelButton"
            variant="secondary"
            treatment="outline"
            @click="${this.onPrimaryBtnClick}"
          >
            ${this.primaryBtnText}
          </sp-button>
          <sp-button
            slot="button"
            id="confirmButton"
            variant="accent"
            treatment="fill"
            onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));"
          >
            ${this.secondaryBtnText}
          </sp-button>
        </sp-alert-dialog>
      </sp-dialog-wrapper>
    `;
  }

  static styles = css`
    sp-alert-dialog {
        max-width: 400px;
        text-align:  justify;
    }
    .asset{
        margin-top: 30px;
        display: flex;
        border: 1px solid var(--spectrum-global-color-gray-200);
        padding: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "pl-announcement": Announcement;
  }
}