//
const rechercher = require("./search-question.js");

function createExam(){
    let questionsExam = Array();
    console.log("veuillez rechercher les questions a ajouter");
//recherche des questions
    resultats = rechercher.searchQuestion();

    //ajout des questions a la liste de questions
    if(resultats != null){
        questionsExam.push(resultats);
        console.log("La question a été ajoutée \n");

    }
    else{
        console.log("la question n'a pas été trouvée")
    }

    //recuperation de la liste de questions

    //liste = questionsExam;




}
