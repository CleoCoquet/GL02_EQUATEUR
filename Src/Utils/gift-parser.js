function parseGift(giftString) {
    const questions = [];

    //splits document into paragraphs
    const paragraphs = giftString.split(/\n\s*\n/).map(paragraph => paragraph.trim());
    //works per paragraph, each paragraph is a question
    paragraphs.forEach(paragraph => {

        //splits paragraphs into lines based on their special characters
        const lines = parseSpecialCharacters(paragraph);
        const currentQuestion = {
            type: "",
            name: "",
            text: "",
            choices: [],
            feedback: [],
            //feedback should have the same place as the answer its referring to
            comments: [],
        };
        let temp = "";
        let flag = false;
        let shortansflag = false;

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith("::")) {
                // Parse question header
                parseQuestionName(line, currentQuestion);

            } else if (line.startsWith("//")) {
                currentQuestion.comments.push(line.slice(2).trim());
            } else if (line.startsWith("{") || flag) {
                flag = true;

                if (line.endsWith("}") || temp.endsWith("}")) {
                    shortansflag = true;
                    flag = false;
                    if (temp !== "") {
                        temp += line;
                        QuestionType(temp, currentQuestion);
                        temp = "";
                    } else {
                        QuestionType(line, currentQuestion);
                        temp = "";
                    }
                    //checa que no sea missing word
                } else {
                    // makes sure that answers that are split into multiple lines are parsed correctly
                    temp += line;
                }
            } else {
                if (line.startsWith("####")) {
                    // Parse feedback
                    parseFeedback(line, currentQuestion);
                } else {
                    if (shortansflag) {
                        currentQuestion.type = "Missing Word";
                    }
                    currentQuestion.text += line;
                }


            }
        });
        if (currentQuestion.name) {
            //parse through all the choices of the current question
            let temp = true;
            currentQuestion.choices.forEach(choice => {
                if (!choice.startsWith("=") && currentQuestion.type !== "Missing Word") {
                    temp = false;

                }

            });
            if (temp) {
                currentQuestion.type = "Short Answer";
            }

            questions.push(currentQuestion);
        }
    if(currentQuestion.text && currentQuestion.choices.length === 0){
        currentQuestion.type = "Description";}

    });
    return questions;
}

function QuestionType(line, currentQuestion) {
    // Remove curly braces and spaces
    const cleanLine = line.replace(/[{}]/g, '');
    if (cleanLine) {

        //the answers are split by the special characters
        let answers = cleanLine.split(/([~=#])/).filter(Boolean);  // Filter to remove empty strings
        const joinedAnswers = [];
        for (let i = 0; i < answers.length; i += 2) {
            if (i + 1 < answers.length) {
                joinedAnswers.push(answers[i] + answers[i + 1]);
            } else {
                joinedAnswers.push(answers[i]);
            }
        }
        answers = joinedAnswers;
        // Multiple choice, matching or , short
        //revisar que # de feedback no este no moleste con el de numerical
        if (answers.length >= 2 && (answers[0].includes("~") || answers[0].includes("=") || answers[0].includes("->"))) {

            answers.forEach(option => {
                    //agregar short answer
                    answers[0] = answers[0].trim();
                    const match = option.split("#");
                    if (match) {
                        if (match[0].includes("~") && !match[0].includes("->")) {
                            currentQuestion.type = "Multiple Choice";
                            currentQuestion.choices.push(match[0]);
                            currentQuestion.feedback.push(match[1]);
                        } else if (match[0].includes("=") && !match[0].includes("->")) {
                            currentQuestion.type = "Multiple Choice";
                            currentQuestion.choices.unshift(match[0]);
                            currentQuestion.feedback.unshift(match[1]);
                        } else {
                            currentQuestion.type = "Matching";
                            currentQuestion.choices.push(match[0]);
                            currentQuestion.feedback.push(match[1]);
                        }
                    } else {
                        if (option.includes("~") && !option.includes("->")) {
                            currentQuestion.type = "Multiple Choice";
                            currentQuestion.choices.push(option);
                        } else if (option.includes("=") && !option.includes("->")) {
                            currentQuestion.type = "Multiple Choice";
                            currentQuestion.choices.unshift(option);
                        } else {
                            currentQuestion.type = "Matching";
                            currentQuestion.choices.push(option);
                        }
                    }

                }
            );
        } else {
            const match = answers[0].split("#");

            //Truth or false, short answer or essay, numerical
            if (match.length === 2) {
                if (answers[0] === "Truth" || answers[0] === "False" || answers[0] === "True"
                    || answers[0] === "F" || answers[0] === "T" || answers[0] === "TRUE" || answers[0] === "FALSE") {
                    currentQuestion.type = "TF";
                    currentQuestion.choices.push(answers[0]);
                    currentQuestion.feedback.push(match[1]);
                } else if (answers[0] === "") {
                    currentQuestion.type = "Essay";
                    currentQuestion.choices.push(answers[0]);
                }
            } else {
                if (answers[0].includes("#")) {
                    currentQuestion.type = "Numerical";
                    currentQuestion.choices.push(answers[0]);
                } else if (answers[0] === "Truth" || answers[0] === "False" || answers[0] === "True"
                    || answers[0] === "F" || answers[0] === "T" || answers[0] === "TRUE" || answers[0] === "FALSE") {
                    currentQuestion.type = "TF";
                    currentQuestion.choices.push(answers[0]);
                    currentQuestion.feedback.push(match[1]);
                } else if (answers[0] === "") {
                    currentQuestion.type = "Essay";
                    currentQuestion.choices.push(answers[0]);

                } else {
                    currentQuestion.type = "Incomplete";
                    currentQuestion.choices.push(answers[0]);
                    currentQuestion.feedback.push("Incomplete Question");
                }
            }
        }
    } else {
        currentQuestion.type = "Incomplete";
        currentQuestion.choices.push(cleanLine);
        currentQuestion.feedback.push("Incomplete Question");
    }
}

function parseQuestionName(line, currentQuestion) {
    currentQuestion.name = line.slice(2).trim();

}

function parseFeedback(line, currentQuestion) {
    if (currentQuestion) {
        currentQuestion.feedback = line.slice(1).trim();
    }
}


function parseSpecialCharacters(text) {
    // Replace special characters with newline characters before and after
    const result = text.replace(/(::.*?::|\{[^}]*\}|\/\/[^\n\r]*|{|})/g, '\n$1\n');

    // Split the result into an array of lines
    // Filter out lines that are empty or contain only whitespace
    return result.split('\n').filter(line => line.trim() !== '');
}


module.exports = {parseGift};