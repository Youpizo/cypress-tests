describe("Vérification des boutons d'ajout au panier", () => {
    let token;

    before(() => {
        // Effectuez une connexion pour obtenir le token d'authentification
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                username: "loic.deruy@sfr.fr",
                password: "test1"
            }
        }).then((response) => {
            token = response.body.token;
        });
    });

    beforeEach(() => {
        // Visitez la page des produits en utilisant le token pour s'assurer d'être connecté
        cy.visit("http://localhost:8080/#/products", {
            onBeforeLoad(win) {
                win.localStorage.setItem("authToken", token); // Sauvegarde du token dans le stockage local
            }
        });
    });

    it("Vérifie la présence des boutons d'ajout au panier", () => {
        // Vérifie que chaque produit affiché possède un bouton "Ajouter au panier"
        cy.get('.add-to-cart > [data-cy="product-link"]').each(($el) => {
            cy.wrap($el).should("be.visible"); // Adaptez le sélecteur si nécessaire
        });
    });
});