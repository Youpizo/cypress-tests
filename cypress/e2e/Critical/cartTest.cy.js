describe('Tests des commandes', () => {
    let token;

    before(() => {
        // Connexion et récupération du token
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                "username": "loic.deruy@sfr.fr",
                "password": "test1"
            }
        }).then((response) => {
            token = response.body.token;
        });
    });

    const produits = [
        { selector: ':nth-child(1) > .add-to-cart > [data-cy="product-link"]', name: 'Sentiments printaniers', quantity: 1, shouldExist: true },
        { selector: ':nth-child(5) > .add-to-cart > [data-cy="product-link"]', name: 'Extrait de nature', quantity: 0, shouldExist: false },
        { selector: ':nth-child(4) > .add-to-cart > [data-cy="product-link"]', name: 'Dans la forêt', quantity: -1, shouldExist: false },
        { selector: ':nth-child(6) > .add-to-cart > [data-cy="product-link"]', name: 'Milkyway', quantity: 1000, shouldExist: false }
    ];

    produits.forEach((produit) => {
        it(`Ajoute le produit "${produit.name}" avec quantité ${produit.quantity}`, () => {
            // Connexion
            cy.visit("http://localhost:8080/#/login");
            cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
            cy.get('[data-cy="login-input-password"]').type("testtest");
            cy.get('[data-cy="login-submit"]').click();
            cy.wait(1200);

            // Ajout du produit au panier
            cy.get('[data-cy="nav-link-products"]').click();
            cy.wait(1200);
            cy.get(produit.selector).click();
            cy.get('[data-cy="detail-product-quantity"]').clear().type(produit.quantity.toString());
            cy.get('[data-cy="detail-product-add"]').click();
            cy.wait(1200);

            cy.get('[data-cy="nav-link-cart"]').click();
            cy.wait(1200);

            // Vérification de l'état du panier
            if (produit.shouldExist) {
                cy.get('[data-cy="cart-line-name"]').contains(produit.name).should('exist');
            } else {
                cy.get('[data-cy="cart-line-name"]').contains(produit.name).should('not.exist');
            }
        });
    });

    it("Vérifie les produits dans la commande via API", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8081/orders",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            const order = response.body;
            const produitsCommandes = order.orderLines.map(line => ({
                name: line.product.name,
                quantity: line.quantity
            }));

            // Vérifie que les produits ajoutés sont dans la commande avec les quantités correctes
            produits.forEach((produitAjoute) => {
                const produitCommande = produitsCommandes.find(p => p.name === produitAjoute.name);
                if (produitAjoute.shouldExist) {
                    expect(produitCommande, `Produit ${produitAjoute.name} devrait exister`).to.exist;
                    expect(produitCommande.quantity, `Quantité de ${produitAjoute.name} devrait être ${produitAjoute.quantity}`).to.equal(produitAjoute.quantity);
                } else {
                    expect(produitCommande, `Produit ${produitAjoute.name} ne devrait pas exister`).to.not.exist;
                }
            });

            // Affiche les détails pour chaque ligne de produit
            order.orderLines.forEach((line) => {
                cy.log(`Produit: ${line.product.name}, Prix: ${line.product.price}, Quantité: ${line.quantity}`);
            });
        });
    });
});