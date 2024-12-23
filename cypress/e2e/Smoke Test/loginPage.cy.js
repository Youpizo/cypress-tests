describe("Page de connexion", () => {
    before(() => {
        // Naviguez vers la page de connexion
        cy.visit("http://localhost:8080/#/login"); // Remplacez par l'URL correcte de la page de connexion
    });

    it("Vérifie la présence des champs et boutons de connexion", () => {
        // Vérifie la présence du champ de nom d'utilisateur
        cy.get('input[id="username"]').should("be.visible");

        // Vérifie la présence du champ de mot de passe
        cy.get('input[id="password"]').should("be.visible");

        // Vérifie la présence du bouton de connexion
        cy.get('form').find('button').last().should("be.visible");

        // Vérifie la présence du label "Email"
        cy.get('label[for="username"]').contains("Email").should("be.visible");

        // Vérifie la présence du label "Mot de passe"
        cy.get('label[for="password"]').contains("Mot de passe").should("be.visible");
    });
});