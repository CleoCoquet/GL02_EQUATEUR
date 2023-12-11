const { Questions } = require('./parsed-questions.js');

function searchQuestion(prompt) {
    console.log('Search for Question');
    const matchingQuestions = Questions.filter(question => question.includes(Prompt));
    //if no matches found, return error message
    //if matches found, return matches
    if (matchingQuestions.length === 0) {
        console.log("No matches found");
    } else {
        console.log(matchingQuestions);
        module.exports = { matchingQuestions };

    }
//return matchingQuestions;

}
module.exports = { searchQuestion};

