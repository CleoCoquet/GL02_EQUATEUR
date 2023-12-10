const fs = require('fs');

// Déclaration de la variable Examen et de ses attributs
var Examen = function (name) {
    this.name = name
}

// Fonction qui retourne l'ensemble des questions de la banque de questions sous la forme d'objets Question
Examen.prototype.allQuestions = function () {
    // Utilisation du module gift-parser 
    var Parser = new gift-parser()
    var fileContent = []
    filenames = fs.readdirSync('./SujetB_data/');
    filenames.forEach(file => {
        fileContent.push(fs.readFileSync('./SujetB_data/' + file, { encoding: 'utf8' }))
    });

    var parsedQuestions = []
    fileContent.forEach(file => {
        parsedQuestions.push(Parser.parse(file))
    })

    return parsedQuestions
}

// Fonction qui dresse le profil d'un examen GIFT
Examen.prototype.examProfile = function (name) {
    var questionsExamText = fs.readFileSync('./examen/' + name + ".gift", 'utf8');
    var arrayQuestionsExamSplit = [];
    arrayQuestionsExamSplit.push(questionsExamText.split("::"));

    // Déclaration d'une structure de données pour stocker le profil de l'examen
    var examProfile = {
        totalQuestions: 0,
        questionTypes: {}
    };

    arrayQuestionsExamSplit.forEach(element => {
        element.forEach(id => {
            // Incrémente le nombre total de questions
            examProfile.totalQuestions++;

            // Extrait le type de question (supposé être le premier élément après l'ID)
            var type = element[1];

            // Met à jour le profil avec le type de question
            if (type in examProfile.questionTypes) {
                examProfile.questionTypes[type]++;
            } else {
                examProfile.questionTypes[type] = 1;
            }
        });
    });

    // Affiche le profil de l'examen
    console.log("\nProfil de l'examen " + name + ".gift :");
    console.log("Nombre total de questions : " + examProfile.totalQuestions);
    console.log("Répartition des types de questions :");
    for (var type in examProfile.questionTypes) {
        console.log("- " + type + " : " + examProfile.questionTypes[type]);
    }
}
