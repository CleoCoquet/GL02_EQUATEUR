//
const path = require('path');
const giftparse = require('./gift-parser.js');
const rechercher = require("./search-question.js");


const dataquestion = 'data_question';

const createExam = function (){
        console.log("creation d'un examen");
    let questionsExam = Array();
    console.log("veuillez rechercher les questions a ajouter");
        //recherche des questions
            resultats = rechercher.searchQuestion();

    //ajout des questions a la liste de questions
    if(resultats != null){
        insert = readlineSync.question(
            "Voulez-vous ajouter la question (oui/non) : "
          );
          let keepIt;
          do{
            questionsExam.push(resultats);
            console.log("La question a été ajoutée \n");
                  const fileName = path.join(dataquestion, `${question.replace(/\s+/g, '_')}.gift`);
          fs.writeFileSync(fileName, questionData, 'utf-8');
         
          }
          while 
        (insert.toLowerCase() === "oui");
        
    }
    else{
        console.log("la question n'a pas été trouvée")
    }

   return questionsExam;
  
}

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

