import { FormTest } from './form.po';

describe('Book Shop', () => {
  it('zeisch Affe', () => {
    cy.visit('/books');
    cy.get('.mat-toolbar > span').should('contain.text', 'BOOK MONKEY');
    cy.get('.mat-toolbar > span').should('contain', 'BOOK MONKEY');
    cy.get('.mat-toolbar > span').contains('BOOK MONKEY');
    // cy.get('a:nth-child(2)>lable>span')
    // cy.xpath('');
  });
  it('iteract', () => {
    const foamTest = new FormTest();
    // cy.visit('/');
    // cy.get('[routerlink="books/new"]').click();
    // cy.get('.mat-raised-button').should('be.disabled');
    foamTest.goToForm();

    // testFormControl('isbn', '123', 'ISBN is required');
    // for (let id of ['isbn', 'title', 'author']) {
    //   cy.get(`[formcontrolname="${id}"]`).should('have.class', 'ng-invalid');
    //   cy.get(`[formcontrolname="${id}"]`).type('1');
    //   cy.get(`[formcontrolname="${id}"]`).clear();
    //   cy.contains('');
    // }

    // cy.get('.mat-card').eq(2).click();
    foamTest.testTheForm();
  });
});
