describe("Test du panier", () => {


    it("Ajoute un produit au panier", () => {
        // Connexion 
        cy.visit("http://localhost:8080/#/login");
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
        cy.get('[data-cy="login-input-password"]').type("testtest");
        cy.get('[data-cy="login-submit"]').click();
        cy.wait(10);

        // Sélectionne un produit et clique sur "Consulter"
        
        cy.get('.text-header > button').click();
        cy.get(':nth-child(1) > .add-to-cart > [data-cy="product-link"]').click();

        //Ajout du produit au panier et changement de page vers le panier 

        cy.get('[data-cy="detail-product-add"]').click();
        cy.get('[data-cy="nav-link-cart"]').click();

        //Verification que le produit est bien existant dans le panier
        
        cy.get(':nth-child(2) > .product-name > [data-cy="cart-line-name"]').should('exist');
    });
});