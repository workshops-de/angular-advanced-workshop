const findFormControls = (list: [string[]]) => {
  for (let id of list) {
    cy.get(`[formcontrolname="${id}"]`);
  }
};
