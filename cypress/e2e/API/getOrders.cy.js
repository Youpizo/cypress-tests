let token;

  
  before(() => {
    cy.request({
        method: "POST",
        url: "http://localhost:8081/login",
        body:{
            "username": "loic.deruy@sfr.fr",
            "password": "test1"
        }
    }).then((response) => {
        token = response.body.token;
    // Stockez le token dans la variable
    });
    })
    

  it("Récupération Orders, utilisateur connecté", () => {
    // Utilisez le token dans votre premier test
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      headers: {
        "Authorization": "Bearer " + token // Utilisez le token ici
      },
      body: {
        //s’il y a un body
      }
    }).then((response) => {
      // expect(response.status).to.eq(200); // Vérifiez que la requête est réussie
      
      // Accéder aux détails de la commande
      const order = response.body; // Supposons que la commande est un objet unique
      
      // expect(order).to.have.property('orderLines');  // Vérifie que 'orderLines' existe
      // expect(order.orderLines).to.be.an('array');    // Vérifie que 'orderLines' est un tableau

      // Parcourir chaque produit dans 'orderLines'
      order.orderLines.forEach((line) => {
          // Faites des assertions sur chaque produit dans la commande
          expect(line).to.have.property('product');  // Vérifie qu'il y a une propriété 'product'
          expect(line.product).to.have.property('name');  // Vérifie que chaque produit a un nom
          expect(line.product).to.have.property('price'); // Vérifie que chaque produit a un prix
          expect(line).to.have.property('quantity');      // Vérifie qu'il y a une quantité pour chaque ligne de commande
          
          // Affichez les détails pour chaque ligne de produit
          cy.log(`Produit: ${line.product.name}, Prix: ${line.product.price}, Quantité: ${line.quantity}`);
     });
  });
});