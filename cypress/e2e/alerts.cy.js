describe('Cypress application', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should click on the first button and assert the ' +
      'text inside the alert.', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.eq('You clicked a button');
    });

    cy.get('#alertButton').click();
  });

  it('Should click on the second button and assert the ' +
      'text inside the alert after 5s.', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.eq('This alert appeared after 5 seconds');
    });

    cy.get('#timerAlertButton').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
  });

  it('Should click on the third button and assert the ' +
      'text inside the alert after confirming', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.eq('Do you confirm action?');
      return true;
    });

    cy.get('#confirmButton').click();
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('Should click on the third button and assert the ' +
      'text inside the alert after canceling', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.eq('Do you confirm action?');
      return false;
    });

    cy.get('#confirmButton').click();
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('Should click on the fourth button and assert your ' +
      'name is shown on the page.', () => {
    cy.window().then((window) => {
      cy.stub(window, 'prompt').returns('Vlad');
    });

    cy.get('#promtButton').click();

    cy.get('#promptResult').should('contain', 'You entered Vlad');
  });
});
