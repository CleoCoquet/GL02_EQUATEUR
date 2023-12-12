
    const ensQuestions = require("./prepare_exam.js");
    const readlineSync = require("readline-sync");
    const fs = require('fs');

const profilGift = function () {
   
    console.log(
      "Creation de la fiche d'examen sous format gift \n"
    );
    // récupération de la liste des questions
    questions = ensQuestions.createExam();
    // création d'une chaine de caractères qui va contenir toutes les questions
    let giftContent = "";
    // ajout de chaque question à la chaine de caractères
    questions.forEach((q) => {
      giftContent += `${q}\n\n`;
    });
    
    let fileName = readlineSync.question("Veuillez saisir un nom pour le fichier : ");
    fs.writeFileSync(`${fileName}.gift`, giftContent);
  }





