const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataVCardDir = 'data_vcard';

// Vérifier si le répertoire existe, sinon le créer
if (!fs.existsSync(dataVCardDir)) {
  fs.mkdirSync(dataVCardDir);
}

function generateVCard() {
  // Demander à l'utilisateur d'entrer ses informations
  rl.question("Entrez votre nom complet: ", (fullName) => {
    rl.question("Entrez votre adresse e-mail (facultatif): ", (email) => {
      rl.question("Entrez votre numéro de téléphone (facultatif): ", (phoneNumber) => {
        rl.question("Entrez le nom de votre établissement et son adresse (facultatif): ", (organization) => {
          // Créer le contenu vCard
          const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${fullName}
EMAIL:${email || ''}
TEL:${phoneNumber || ''}
ORG:${organization || ''}
END:VCARD
`;

          // Afficher la vCard générée
          console.log('vCard générée :', vCardData);

          // Enregistrer la vCard dans un fichier .vcf dans le répertoire data_vcard
          const fileName = path.join(dataVCardDir, `${fullName.replace(/\s+/g, '_')}.vcf`);
          fs.writeFileSync(fileName, vCardData, 'utf-8');
          console.log(`vCard enregistrée dans le fichier ${fileName}`);

          // Fermer l'interface readline
          rl.close();
        });
      });
    });
  });
}

// Appeler la fonction pour générer la vCard


module.exports = { generateVCard };





















