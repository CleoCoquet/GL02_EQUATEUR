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
    filenames = fs.readdirSync('./Examens/');
    filenames.forEach(file => {
        //s'il existe déjà on change le booleen et on avertit l'utilisateur en montrant ou le fichier se trouve
        if (file === name + ".gift") {
            existe = true;
            console.log("L'examen ".red + name.magenta + ".gift".magenta + " existe déjà, vous pouvez le retrouver ici :\n".red +
                process.cwd().blue + "/Examens/".blue + name.blue + ".gift".blue);
        }

    });
//si le fichier n'existe pas encore on le créer et on indique son emplacement à l'utilisateur
if (existe === false) {
    this.name = name;
    fs.writeFile(`./Examens/${name}.gift`, "", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("L'examen ".green + name.magenta + ".gift".magenta + " a bien été créé. Vous pouvez le trouver à l'emplacement ci joint : \n".green +
                process.cwd().blue + "/Examens/".blue + name.blue + ".gift".blue);
        }
    });
}

}