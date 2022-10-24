export class FormTest {
  private idList = ['isbn', 'title', 'author'];
  private valueList = [String(Math.floor(1000000000000 + Math.random() * 900000)), 'title', 'author'];
  private errorList = ['ISBN is required', 'Title is required', 'Author is required'];

  constructor() {
    cy.visit('/');
  }

  goToForm() {
    cy.get('[routerlink="books/new"]').click();
    cy.get('.mat-raised-button').should('be.disabled');
  }

  testTheForm() {
    cy.get('.mat-raised-button').should('be.disabled');
    for (let i of [0, 1, 2]) {
      this.testFormControl(this.idList[i], this.valueList[i], this.errorList[i]);
    }
    cy.get('.mat-raised-button').should('not.be.disabled');
  }

  private testFormControl(id: string, value: string, errorMsg: string) {
    cy.get(`[formcontrolname="${id}"]`).type('1');
    cy.get(`[formcontrolname="${id}"]`).clear();
    cy.get(`[formcontrolname="${id}"]`).blur();
    cy.contains(errorMsg);
    cy.get(`[formcontrolname="${id}"]`).should('have.class', 'ng-invalid');
    cy.get(`[formcontrolname="${id}"]`).type(value);
    cy.get(`[formcontrolname="${id}"]`).should('have.class', 'ng-valid');
    cy.contains(errorMsg).should('not.exist');
  }
}
