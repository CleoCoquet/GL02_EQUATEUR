const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

const dataVCardDir = 'data_vcard';

function listVCardFiles() {
  // Vérifier si le répertoire existe
  if (!fs.existsSync(dataVCardDir)) {
    console.log(`Le répertoire ${dataVCardDir} n'existe pas.`);
    return;
  }

  // Lister les fichiers .vcf dans le répertoire
  const files = fs.readdirSync(dataVCardDir).filter(file => path.extname(file) === '.vcf');

  // Afficher la liste des fichiers .vcf
  console.log('Fichiers .vcf disponibles :');
  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });

  // Demander à l'utilisateur de choisir un fichier à consulter
  if (files.length > 0) {
    const fileIndex = readlineSync.questionInt('Entrez le numéro du fichier que vous souhaitez consulter : ', {
      min: 1,
      max: files.length
    });

    const selectedFile = path.join(dataVCardDir, files[fileIndex - 1]);

    if (fs.existsSync(selectedFile)) {
      const fileContent = fs.readFileSync(selectedFile, 'utf-8');
      console.log(`Contenu du fichier ${selectedFile} :\n${fileContent}`);
    } else {
      console.log('Le fichier sélectionné n\'existe pas.');
    }
  } else {
    console.log('Aucun fichier .vcf disponible.');
  }
}

// Appeler la fonction pour lister et consulter les fichiers .vcf
listVCardFiles();

