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

    it("Tester une faille XSS lors de l'ajout d'un avis", () => {
        const xssScript = "<script>alert('XSS')</script>";

        cy.request({
            method: "POST",
            url: "http://localhost:8081/reviews",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: {
                title: xssScript,
                comment: xssScript,
                rating: 1,
            },
            failOnStatusCode: false // Permet de capturer les erreurs sans que le test échoue
        }).then((response) => {
            // Vérifie que l'application bloque ou filtre le script
            expect(response.status).to.be.oneOf([400, 422, 500]); // Statut d'erreur attendu
            cy.log("Faille XSS non publie");
        });
    });
});
