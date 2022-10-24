import { FormTest } from './form.po';

describe('Book Shop', () => {
  const isbn = String(Math.floor(1000000000000 + Math.random() * 900000));
  let bookCount = 0;

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4730/books');
    cy.visit('');
  });

  it('zeisch Affe', () => {
    cy.get('.mat-toolbar > span').should('contain.text', 'BOOK MONKEY');
    cy.get('.mat-toolbar > span').should('contain', 'BOOK MONKEY');
    cy.get('.mat-toolbar > span').contains('BOOK MONKEY');
    // cy.get('a:nth-child(2)>lable>span')
    // cy.xpath('');
  });
  it('iteract', () => {
    const foamTest = new FormTest(isbn);
    cy.get('ws-book-card')
      .then(list => (bookCount = list.length))
      .then(() => {
        // cy.visit('/');
        // cy.get('[routerlink="books/new"]').click();
        // cy.get('.mat-raised-button').should('be.disabled');
        foamTest.goToForm();
        console.log('!!!!!', bookCount);
        // testFormControl('isbn', '123', 'ISBN is required');
        // for (let id of ['isbn', 'title', 'author']) {
        //   cy.get(`[formcontrolname="${id}"]`).should('have.class', 'ng-invalid');
        //   cy.get(`[formcontrolname="${id}"]`).type('1');
        //   cy.get(`[formcontrolname="${id}"]`).clear();
        //   cy.contains('');
        // }

        // cy.get('.mat-card').eq(2).click();
        foamTest.testTheForm();
        foamTest.save(bookCount);
      });
  });
  after(() => {
    // cy.get('ws-book-card').should('have.length', bookCount + 1);
    // cy.request('DELETE', 'http://localhost:4730/books/' + isbn);
  });
});
