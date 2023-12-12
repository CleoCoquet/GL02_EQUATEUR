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

createExam();
