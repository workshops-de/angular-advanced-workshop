describe('Book Shop', () => {
  it('zeisch Affe', () => {
    cy.visit('/books');
    cy.get('.mat-toolbar > span').should('contain.text', 'BOOK MONKEY');
    cy.get('.mat-toolbar > span').should('contain', 'BOOK MONKEY');
    cy.get('.mat-toolbar > span').contains('BOOK MONKEY');
  });
});
