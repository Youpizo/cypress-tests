describe("Test de connexion", () => {
    
    it("Connexion avec des identifiants valides", () => {
        // Visite la page de connexion
        cy.visit("http://localhost:8080/#/login");

        // Remplit les champs de connexion avec les identifiants de test
        cy.get('#username').type("loic.deruy@sfr.fr");
        cy.get('#password').type("test1");

        // Soumet le formulaire de connexion
        cy.get('button').click();

        // Vérifie qu'après la connexion, l'utilisateur est redirigé vers la page d'accueil ou reçoit une confirmation
        cy.url().should('include', '/#/'); // Remplacez par l'URL d'accueil ou tableau de bord post-connexion
        cy.contains("Déconnexion").should("be.visible"); // Vérifie la présence d'un message de bienvenue ou autre confirmation
        cy.contains("Mon panier").should("be.visible");
    });

    it("Connexion avec des identifiants invalides", () => {
        // Visite la page de connexion
        cy.visit("http://localhost:8080/#/login");

        // Remplit les champs avec des identifiants incorrects
        cy.get('#username').type("invalid@example.com");
        cy.get('#password').type("wrongpassword");

        // Soumet le formulaire de connexion
        cy.get('button').click();

        // Vérifie que l'erreur de connexion s'affiche
        cy.contains("Identifiants incorrects").should("be.visible"); // Message d'erreur à adapter
    });
});