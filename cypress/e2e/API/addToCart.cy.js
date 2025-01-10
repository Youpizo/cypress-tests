describe("Ajout de produits au panier", () => {
    let token;

    before(() => {
        // Authentifiez-vous et obtenez le token
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                username: "test2@test.fr",
                password: "testtest"
            }
        }).then((response) => {
            token = response.body.token;
        });
    });

    it("Ajouter un produit disponible au panier", () => {
        const productId = 5; // Remplacez par un ID de produit disponible

        cy.request({
            method: "PUT",
            url: "http://localhost:8081/orders/add",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: {
                product: productId,
                quantity: 1
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Vérifie que le produit est ajouté avec succès
            cy.log("Produit disponible ajouté au panier");
        });
    });

    it("Ajouter un produit en rupture de stock au panier", () => {
        const outOfStockProductId = 3; // Remplacez par un ID de produit en rupture de stock

        cy.request({
            method: "PUT",
            url: "http://localhost:8081/orders/add",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: {
                product: outOfStockProductId,
                quantity: 1
            },
            failOnStatusCode: false // Permet de capturer les erreurs sans échec du test
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 409]); // Vérifie que le produit est refusé
            cy.log("Produit en rupture de stock non ajouté au panier");
        });
    });

    it("Ajouter une quantité de 0 au panier", () => {
        const productId = 5; // Remplacez par un ID de produit disponible

        cy.request({
            method: "PUT",
            url: "http://localhost:8081/orders/add",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: {
                product: productId,
                quantity: 0
            },
            failOnStatusCode: false // Permet de capturer les erreurs sans échec du test
        }).then((response) => {
            expect(response.status).to.eq(400); // Vérifie que l'ajout est refusé
            cy.log("Quantité de 0 non ajoutée au panier");
        });
    });

    it("Ajouter une quantité négative au panier", () => {
        const productId = 5; // Remplacez par un ID de produit disponible

        cy.request({
            method: "PUT",
            url: "http://localhost:8081/orders/add",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: {
                product: productId,
                quantity: -1
            },
            failOnStatusCode: false // Permet de capturer les erreurs sans échec du test
        }).then((response) => {
            expect(response.status).to.eq(400); // Vérifie que l'ajout est refusé
            cy.log("Quantité négative non ajoutée au panier");
        });
    });
    it("Ajouter une quantité excessive au panier", () => {
        const productId = 5; // Remplacez par un ID de produit disponible

        cy.request({
            method: "PUT",
            url: "http://localhost:8081/orders/add",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: {
                product: productId,
                quantity: 100000
            },
            failOnStatusCode: false // Permet de capturer les erreurs sans échec du test
        }).then((response) => {
            expect(response.status).to.eq(400); // Vérifie que l'ajout est refusé
            cy.log("Quantité excessive non ajoutée au panier");
        });
    });
});
