import { faker } from '@faker-js/faker';

describe("Ajout d'un avis produit", () => {
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

    // Générer une phrase aléatoire
    const phraseAleatoire = faker.lorem.sentence();

    // Générer un chiffre entre 1 et 5
    const chiffreAleatoire = faker.number.int({ min: 1, max: 5 });

    it("Ajouter plusieurs avis", () => {
        for (let i = 0; i < 5; i++) {
            // Générer une phrase et un chiffre aléatoires pour chaque itération
            const phraseAleatoire = faker.lorem.sentence();
            const chiffreAleatoire = faker.number.int({ min: 1, max: 5 });

            cy.request({
                method: "POST",
                url: "http://localhost:8081/reviews",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: {
                    title: "testcy",
                    comment: phraseAleatoire,
                    rating: chiffreAleatoire,
                }
            }).then((response) => {
                expect(response.status).to.eq(200); // Vérifie que l'avis est ajouté avec succès
            });
        }
    });
});