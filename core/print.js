"use strict";

/*
  Unfold Yourself — afdruk- en PDF-logica
  Afhankelijkheden: core/test-renderer.js.
  Klassiek script; laadvolgorde staat expliciet in index.html.
*/

/* =========================================================
   RESULTAAT VOORBEREIDEN VOOR AFDRUKKEN EN PDF

   Voor het afdrukken worden:
   - alle facetgroepen zichtbaar gemaakt;
   - alle afzonderlijke facetinterpretaties geopend;
   - de oorspronkelijke schermstatus tijdelijk onthouden.
========================================================= */

let resultPrintState = null;


function isResultReportActive() {
  const workspace = document.getElementById("testWorkspace");
  const result = document.getElementById("resultScreen");

  return Boolean(
    workspace &&
    result &&
    !workspace.hidden &&
    !result.hidden &&
    !document.body.classList.contains("total-report-open") &&
    !document.body.classList.contains("total-report-printing")
  );
}


function prepareResultForPrint() {
  if (!isResultReportActive()) {
    return;
  }

  if (document.body.classList.contains("printing-result")) {
    return;
  }
  const facetItems =
    Array.from(
      document.querySelectorAll(
        ".facet-item"
      )
    );

  const expandableDetails =
    Array.from(
      document.querySelectorAll(
        "details[data-print-expand='true']"
      )
    );

  resultPrintState = {
    facetReportWasHidden:
      facetReport.hidden,

    facetReportWasCollapsed:
      facetReport.classList.contains(
        "is-collapsed"
      ),

    facetItems:
      facetItems.map(item => {
        return {
          element: item,
          wasOpen: item.open
        };
      }),

    expandableDetails:
      expandableDetails.map(item => {
        return {
          element: item,
          wasOpen: item.open
        };
      })
  };

  if (!facetReport.hidden) {
    facetReport.classList.remove(
      "is-collapsed"
    );

    facetItems.forEach(item => {
      item.open = true;
    });
  }

  expandableDetails.forEach(item => {
    item.open = true;
  });

  document.body.classList.add(
    "printing-result"
  );
}


function restoreResultAfterPrint() {
  if (!resultPrintState) {
    document.body.classList.remove(
      "printing-result"
    );

    return;
  }

  facetReport.hidden =
    resultPrintState
      .facetReportWasHidden;

  facetReport.classList.toggle(
    "is-collapsed",
    resultPrintState
      .facetReportWasCollapsed
  );

  resultPrintState
    .facetItems
    .forEach(savedItem => {
      savedItem.element.open =
        savedItem.wasOpen;
    });

  (resultPrintState.expandableDetails || [])
    .forEach(savedItem => {
      savedItem.element.open =
        savedItem.wasOpen;
    });

  document.body.classList.remove(
    "printing-result"
  );

  resultPrintState = null;
}


function printActiveResult() {
  prepareResultForPrint();

  requestAnimationFrame(() => {
    window.print();
  });
}

function finishActiveTest() {
  renderDomains();
  renderProgress();

  closeTestWorkspace();
}

