"use strict";

function renderWorkWellbeingQuestionInput(context) {
  const { question, choices, selectedAnswer, container, session, onChange, interactionApi } = context;
  interactionApi.configureNavigation({ previousHidden: false, nextHidden: false, saveExitHidden: false });

  container.classList.remove("ww-status-options", "ww-frequency-options");
  container.classList.add(question.type === "status" ? "ww-status-options" : "ww-frequency-options");

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option ww-answer-option";
    button.dataset.value = String(choice.value);
    button.setAttribute("role", "radio");

    const isSelected = String(selectedAnswer) === String(choice.value);
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-checked", String(isSelected));

    const marker = document.createElement("span");
    marker.className = "answer-option-marker";
    marker.textContent = String(choice.marker ?? index + 1);

    const copy = document.createElement("span");
    copy.className = "answer-option-copy";
    const label = document.createElement("strong");
    label.textContent = choice.label;
    const description = document.createElement("small");
    description.textContent = choice.description || "";
    description.hidden = !description.textContent;
    copy.append(label, description);
    button.append(marker, copy);

    button.addEventListener("click", () => {
      session.answerMeta = session.answerMeta || {};
      const existing = session.answerMeta[question.id] || {};
      const now = new Date().toISOString();
      session.answerMeta[question.id] = {
        firstAnsweredAt: existing.firstAnsweredAt || now,
        lastAnsweredAt: now,
        changes: (Number(existing.changes) || 0) + 1
      };
      onChange(choice.value);
      container.querySelectorAll(".ww-answer-option").forEach(candidate => {
        const selected = candidate === button;
        candidate.classList.toggle("is-selected", selected);
        candidate.setAttribute("aria-checked", String(selected));
      });
      interactionApi.save();
    });

    container.appendChild(button);
  });

  return true;
}
