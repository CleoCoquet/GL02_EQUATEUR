const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateVCard() {
  // Demander à l'utilisateur d'entrer ses informations
  rl.question("Entrez votre nom complet: ", (fullName) => {
    rl.question("Entrez le nom de votre organisation (facultatif): ", (organization) => {
      rl.question("Entrez votre numéro de téléphone (facultatif): ", (phoneNumber) => {
        rl.question("Entrez votre adresse e-mail (facultatif): ", (email) => {
          // Créer le contenu vCard
          const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${fullName}
ORG:${organization || ''}
TEL:${phoneNumber || ''}
EMAIL:${email || ''}
END:VCARD
`;

          // Afficher la vCard générée
          console.log('vCard générée :', vCardData);

          // Fermer l'interface readline
          rl.close();
        });
      });
    });
  });
}

// Appeler la fonction pour générer la vCard
generateVCard();

