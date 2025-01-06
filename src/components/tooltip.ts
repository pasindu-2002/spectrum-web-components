import { html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FastDialog } from "./FastDialog";

@customElement("pl-tooltip")
export class Tooltip extends FastDialog {
  @property({ type: String })
  content = "Hello World";

  renderDialog() {
    return html`
      <sp-action-button>
        Trigger
        <sp-tooltip self-managed variant="info">
            ${this.content} 
        </sp-tooltip>
      </sp-action-button>
    `;
  }

  static styles = css`
  sp-action-button {
    margin: 100px;
    
  };`;
}

declare global {
  interface HTMLElementTagNameMap {
    "pl-tooltip": Tooltip;
  }
}
