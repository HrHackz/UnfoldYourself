"use strict";

const DIGITAL_SKILLS_ANSWER_SCALES = Object.freeze({
  "knowledge": [
    {
      "value": 0,
      "label": "Ik weet hier niets van of heb hier nog nooit van gehoord"
    },
    {
      "value": 1,
      "label": "Ik begrijp dit beperkt en heb meer uitleg nodig"
    },
    {
      "value": 2,
      "label": "Ik begrijp dit goed"
    },
    {
      "value": 3,
      "label": "Ik beheers dit volledig en kan het aan anderen uitleggen"
    }
  ],
  "skill": [
    {
      "value": 0,
      "label": "Ik weet niet hoe ik dit moet doen"
    },
    {
      "value": 1,
      "label": "Ik kan dit met hulp"
    },
    {
      "value": 2,
      "label": "Ik kan dit zelfstandig"
    },
    {
      "value": 3,
      "label": "Ik kan dit met vertrouwen en kan anderen hierbij helpen"
    }
  ],
  "attitude": [
    {
      "value": 0,
      "label": "Helemaal niet"
    },
    {
      "value": 1,
      "label": "Niet veel / heel weinig"
    },
    {
      "value": 2,
      "label": "Ja"
    },
    {
      "value": 3,
      "label": "Zeer sterk"
    }
  ]
});
window.DIGITAL_SKILLS_ANSWER_SCALES = DIGITAL_SKILLS_ANSWER_SCALES;
