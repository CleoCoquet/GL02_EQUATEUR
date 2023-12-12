//
const path = require('path');
const giftparse = require('./gift-parser.js');
const rechercher = require("./search-question.js");




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
          }
          while 
        (insert.toLowerCase() === "oui");
        
    }
    else{
        console.log("la question n'a pas été trouvée")
    }

   return questionsExam;
  
}
