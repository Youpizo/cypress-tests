describe("Vérification des erreurs d'authentification pour les commandes", () => {

    it("Retourner une erreur 401 sans token d'authentification", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8081/orders",
            failOnStatusCode: false  // Empêche Cypress de considérer le test comme échoué en cas d'erreur HTTP
        }).then((response) => {
            // Assertion pour vérifier que la réponse est une erreur 401 Unauthorized
            expect(response.status).to.eq(401);

            // Vérifiez la structure de la réponse en fonction des propriétés disponibles
            expect(response.body).to.have.property("code");  // Par exemple, vérifie qu'il y a un code d'erreur
            expect(response.body).to.have.property("message");  // Par exemple, vérifie qu'il y a un message d'erreur
            cy.log(`Erreur renvoyée: ${response.body.message}`);  // Affiche le message d'erreur dans les logs
        });
    });

    it("Retourne une erreur 403 avec un token invalide", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8081/orders",
            headers: {
                "Authorization": "Bearer invalid_token"  // Utilise un token incorrect
            },
            failOnStatusCode: false  // Empêche Cypress de considérer le test comme échoué en cas d'erreur HTTP
        }).then((response) => {
            // Vérifie que la réponse est une erreur 403 Unauthorized
            expect(response.status).to.eq(403); // Attendez-vous à un code 403 si le token est invalide
            expect(response.body).to.have.property("code");
            expect(response.body).to.have.property("message");
            cy.log(`Erreur renvoyée: ${response.body.message}`);
        });
    });
});