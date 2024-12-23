describe("Récupération de la fiche produit", () => {
    
    it("Retourner les détails du produit avec l'ID spécifié", () => {
        const productId = 5; // Remplacez avec un ID valide d'un produit existant

        cy.request({
            method: "GET",
            url: `http://localhost:8081/products/${productId}` // Utilise l'ID dans l'URL
        }).then((response) => {
            // Vérifie que la requête est réussie
            expect(response.status).to.eq(200);

            // Vérifie que le corps de la réponse contient les détails du produit
            expect(response.body).to.have.property("id", productId);  // Vérifie que l'ID correspond
            expect(response.body).to.have.property("name");           // Vérifie que le nom du produit est présent
            expect(response.body).to.have.property("price");          // Vérifie que le prix est présent
            expect(response.body).to.have.property("description");    // Vérifie que la description est présente

            // Affiche les détails du produit dans les logs
            cy.log(`Produit ID: ${response.body.id}`);
            cy.log(`Nom: ${response.body.name}`);
            cy.log(`Prix: ${response.body.price}`);
            cy.log(`Description: ${response.body.description}`);
        });
    });
});