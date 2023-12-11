//selects questions from the database and creates a new exam
//déclaration de la variable Examen et de ses attributs
var Examen = function (name) {
    this.name = name
}

//fonction qui retourne l'ensemble des questions de la banque de questions sous la forme d'objets Question
Examen.prototype.allQuestions = function () {
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


//création d'un examen/fichier vide
Examen.prototype.createExam = function (name) {

    var existe = false;
   

    //on vérifie que le fichier n'existe pas déjà
    filenames = fs.readdirSync('./examen/');
    filenames.forEach(file => {
        //s'il existe déjà on change le booleen et on avertit l'utilisateur en montrant ou le fichier se trouve
        if (file === name + ".gift") {
            existe = true;
            console.log("L'examen ".cyan + name.cyan + ".gift".cyan + " existe déjà, vous pouvez le retrouver ici :\n".red +
                process.cwd().cyan + "/examen/".cyan + name.cyan + ".gift".cyan);
        }

    });
//si le fichier n'existe pas encore on le créer et on indique son emplacement à l'utilisateur
if (existe === false) {
    this.name = name;
    fs.writeFile(`./examen/${name}.gift`, "", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("L'examen ".green + name.magenta + ".gift".magenta + " a bien été créé. Vous pouvez le trouver à l'emplacement ci joint : \n".green +
                process.cwd().blue + "/examen/".blue + name.blue + ".gift".blue);
        }
    });
}

}

//permet d'ajouter une question à un examen en fonction de son ID
Examen.prototype.addQuestion = function (name, question) {

    var existe = false;

    //on verifie si la question existe déjà dans le fichier exam si c'est le cas on change le booléen et on avertit l'utilisateur
    var questionsExamText = [];
    var arrayQuestionsExamSplit = [];
    questionsExamText = fs.readFileSync('./examen/' + name + ".gift", 'utf8');
    arrayQuestionsExamSplit = [];
    arrayQuestionsExamSplit.push(questionsExamText.split("::"));
    arrayQuestionsExamSplit.forEach(element => {
        element.forEach(id => {
            if (id === question) {
                console.log("La question ".red + id.yellow + " existe déjà.".red);
                existe = true;
            }
        });
    });
//si la question n'existe pas encore dans l'examen on la cherche dans les fichier question
if (existeDeja === false) {
    function Gift() {
        data = "";
        filenames = fs.readdirSync('./SujetB_data/');
        var questionsFichiersText = [];
        var arrayQuestionsFichiersSplit = [];
        //on fait le tour des fichier questions
        filenames.forEach(file => {
            questionsFichiersText = [];
            //on transforme le fichier question en texte
            questionsFichiersText = fs.readFileSync('./SujetB_data/' + file, 'utf8');
            arrayQuestionsFichiersSplit = [];
            //on split le texte avec les :: pour séparer l'id du reste de la question
            arrayQuestionsFichiersSplit.push(questionsFichiersText.split("::"));
            arrayQuestionsFichiersSplit.forEach(element => {
                var i = 0;
                element.forEach(id => {
                    //si le contenu du tableau est égale à l'id de la question on l'ajoute à la variable qui sera ajoutée au fichier exam
                    if (id.trim().toLowerCase() === question.trim().toLowerCase()) {
                        data += "::" + element[i] + "::" + element[i + 1];
                        console.log("La question ".green + element[i].yellow + " a bien été ajoutée.".green)
                    }
                    i = i + 1;
                });
            });
        });
        return data;
    }

    myGift = Gift();
    if (myGift === '') console.log('\n Aucune question trouvée'.red)
    //on ajoute la question au fichier exam
    fs.appendFile(`./examen/${name}.gift`, myGift, "utf8", function (err) {
        if (err) {
            console.log(err);;
        } else {
            console.log("Vous pouvez trouver l'examen à l'emplacement ci joint : \n".green +
                process.cwd().cyan + "/examen/".cyan + name.cyan + ".gift".cyan);
        }
    });
    
}

}