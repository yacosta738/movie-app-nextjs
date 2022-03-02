describe('Search a movie', () => {
  it('should search a movie Dune', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
    // Search for a movie
    cy.get('input[name=search]').type('Dune', { delay: 100 })
    cy.get('#search-results').find('img').should('have.attr', 'alt', 'Dune')
  })
})