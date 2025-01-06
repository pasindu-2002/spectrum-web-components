import { html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FastDialog } from "./FastDialog";

export interface Task {
  id: number;
  title: string;
  description: string;
  isChecked?: boolean;
  isExpanded?: boolean;
  ctaText: string;
  secondaryCtaText?: string;
}

@customElement("pl-checklist")
export class Checklist extends FastDialog {
  @property({ type: String })
  p = "Hello, World!";

  @property({ type: Array })
  tasks: Task[] = [];

  @property({ type: String })
  headerTitle = "";
  headerDescription = "";

  toggleTask(task: Task, state: boolean) {
    task.isChecked = state;
    this.requestUpdate();
  }

  toggleDetails(task: Task) {
    task.isExpanded = !task.isExpanded;
    this.requestUpdate();
  }

  async onClickButton(eventName: string, task: Task): Promise<void> {
    this.dispatchEvent(
      new CustomEvent(eventName + task.id, {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          task: task,
        },
      })
    );
  }

  renderDialog() {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(
      (task: Task) => task.isChecked
    ).length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return html`
      <sp-dialog-wrapper dismissable underlay>
        <sp-alert-dialog variant="info" style="text-align: justify;">
          <h2 slot="heading" style="font-size:22px;">${this.headerTitle}</h2>
          ${this.headerDescription}

          <div
            style="display: flex; flex-direction: column; align-items: letf; justify-content: space-around;  padding-top: 10px; padding-bottom: 30px;"
          >
            <sp-progress-bar
              size="l"
              label="Progress"
              progress="${progress}"
            ></sp-progress-bar>
          </div>

          <div class="tasks-list">
            ${this.tasks.map(
              (task: Task) => html`
                <div class="task-item">
                  <div
                    class="task-header"
                    @click="${() => this.toggleDetails(task)}"
                  >
                    <div class="task-checkbox">
                      <input
                        type="checkbox"
                        .checked=${!!task.isChecked}
                        id=${task.id}
                      />
                      <label for=${task.id}>${task.title}</label>
                    </div>
                    <button class="expand-button">
                      ${task.isExpanded
                        ? html`<span class="chevron"></span>`
                        : html`<span class="chevron bottom"></span>`}
                    </button>
                  </div>
                  ${task.isExpanded
                    ? html`
                        <div class="task-body">
                          <div class="task-media-placeholder">
                            <div class="flex">
                              <sp-asset variant="file"></sp-asset>
                            </div>
                          </div>
                          <p>${task.description}</p>
                          <div class="task-actions">
                            <button
                              class="cta-button"
                              @click=${() => {
                                this.onClickButton("primary-button-", task);
                                this.toggleTask(task, true);
                              }}
                            >
                              ${task.ctaText}
                            </button>
                            ${!!task.secondaryCtaText
                              ? html` <button
                                  class="cta-button secondary"
                                  @click=${() => {
                                    this.onClickButton(
                                      "secondary-button-",
                                      task
                                    );
                                    this.toggleTask(task, false);
                                  }}
                                >
                                  ${task.secondaryCtaText}
                                </button>`
                              : nothing}
                          </div>
                        </div>
                      `
                    : ""}
                </div>
              `
            )}
          </div>
        </sp-alert-dialog>
      </sp-dialog-wrapper>
    `;
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    sp-progress-bar {
      width: 100%;
    }

    .step-info {
      font-size: 14px;
      font-weight: bold;
      color: #000;
    }

    .task-list {
      margin-top: 10px;
    }

    .task-item {
      margin-bottom: 12px;
      border: 2px solid #edeef0;
      border-radius: 12px;
      padding: 16px;
      background-color: #fff;
      font-family: Arial, sans-serif;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .task-header input {
      margin-right: 12px;
    }

    .task-header input,
    label {
      pointer-events: none;
    }

    .task-checkbox {
      display: flex;
      align-items: center;
    }

    .task-checkbox input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      width: 28px;
      height: 28px;
      border-radius: 15px;
      background-color: #fff;
      position: relative;
      border: 2px solid #edeef0;
      transition: background-color 0.3s ease, border 0.3s ease;
    }

    .task-checkbox input[type="checkbox"]:checked {
      background-color: #20d257;
      border: 2px solid #20d257;
    }

    .task-checkbox input[type="checkbox"]:checked::before {
      content: "";
      position: absolute;
      top: 4px;
      left: 9px;
      width: 4px;
      height: 12px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .expand-button {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }

    .chevron::before {
      border: solid #32363e;
      border-width: 0.12em 0.12em 0 0;
      content: "";
      display: inline-block;
      height: 0.4em;
      left: 0.15em;
      position: relative;
      top: 0.15em;
      transform: rotate(-45deg);
      vertical-align: top;
      width: 0.45em;
    }

    .chevron.bottom:before {
      top: 0;
      transform: rotate(135deg);
    }

    .task-body {
      margin-top: 12px;
    }

    .task-media-placeholder {
      width: 100%;
      padding: 5%;
      border-radius: 8px;
      background-color: #f1f2f4;
    }

    .task-body p {
      font-size: 14px;
      color: #32363e;
      text-overflow: clip;
    }

    .task-actions {
      display: flex;
      gap: 12px;
      margin-top: 12px;
    }

    .cta-button {
      padding: 12px 20px;
      background-color: #0571f2;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    .cta-button.secondary {
      background-color: #edeef0;
      color: black;
    }

    label {
      font-weight: bold;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "pl-checklist": Checklist;
  }
}
