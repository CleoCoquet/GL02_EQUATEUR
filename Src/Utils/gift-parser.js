function parseGift(giftString) {
    const questions = [];
    const paragraphs = giftString.split(/\n\s*\n/).map(paragraph => paragraph.trim());
    paragraphs.forEach(paragraphs => {

        const lines = parseSpecialCharacters(paragraphs);
        const currentQuestion = {
            type: "",
            name: "",
            text: "",
            choices: [],
            feedback: "",
            hints: []
        };

        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith("::")) {
                // Parse question header
                parseQuestionName(line, currentQuestion);

            } else if (line.startsWith("{")) {
                // Parse answer choices
                parseAnswerChoices(line, currentQuestion);
            } else if (line.startsWith("~") || line.startsWith("=")) {
                // Parse true/false or multiple-choice answers
                parseSingleChoiceAnswer(line, currentQuestion);
            } else if (line.startsWith("#")) {
                // Parse feedback
                parseFeedback(line, currentQuestion);
            } else if (line.startsWith("%")) {
                // Parse hints
                parseHints(line, currentQuestion);
            } else if (currentQuestion && line.trim() !== "") {
                // Extract answers within text
                const matches = line.match(/{([^}]+)}/g);
                if (matches) {
                    matches.forEach(match => {
                        parseSingleChoiceAnswer(match.slice(1, -1).trim(), currentQuestion);
                    });
                } else {
                    currentQuestion.text += line + '\n';
                }
            }
        });

        if (currentQuestion.name) {
            questions.push(currentQuestion);
        }
    });
    console.log(questions);
    return questions;
}

// Add the last question


function parseQuestionName(line, currentQuestion) {
    currentQuestion.name = line.slice(2).trim();

}

function parseAnswerChoices(line, currentQuestion) {
    const match = line.match(/^{(\d+):(.+)}$/);
    if (match && currentQuestion) {
        const choiceNumber = parseInt(match[1]);
        const choiceText = match[2].trim();
        currentQuestion.choices.push({number: choiceNumber, text: choiceText, correct: false});
    }
}

function parseSingleChoiceAnswer(line, currentQuestion) {
    if (currentQuestion && currentQuestion.type === "MC") {
        const isCorrect = line.startsWith("=");
        const choiceText = isCorrect ? line.slice(1).trim() : line.trim();
        const choice = {text: choiceText, correct: isCorrect};
        currentQuestion.choices.push(choice);
    } else if (currentQuestion && currentQuestion.type === "TF") {
        currentQuestion.choices.push({text: line.trim(), correct: line.startsWith("~")});
    }
}

function parseFeedback(line, currentQuestion) {
    if (currentQuestion) {
        currentQuestion.feedback = line.slice(1).trim();
    }
}

function parseHints(line, currentQuestion) {
    if (currentQuestion) {
        currentQuestion.hints.push(line.slice(1).trim());
    }
}

function parseSpecialCharacters(text) {
    const result = text.replace(/(::.*?::|\{.*?\}|\/\/[^\n\r]*|\})/g, '\n$1\n');
    return result.split('\n').filter(line => line.trim() !== '');

    // regex to also split on ~, #, %, =a

//     const result = paragraph.replace(/(:::.*?::|\{.*?\}|\/\/[^\n\r]*|\}|~|#|%|=)/g, '\n$1\n');
//
// // Split the result into an array of lines.
//     const resultLines = result.split('\n').filter(line => line.trim() !== '');

}

module.exports = {parseGift};