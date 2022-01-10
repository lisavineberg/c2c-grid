describe('Cypress', () => {   
  it('is working', () => {     
      expect(true).to.equal(true)   
  }) 
  
  it('opens the app', () => {   
      cy.visit('http://localhost:3000') 
  })

  it('has animal dropdown', () => {
    cy.get('.cypress-test-animals').select('bear')

    cy.get('.cell').first().should('have.css', 'background-color', 'rgb(74, 62, 116)')
  })
})