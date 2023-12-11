const { Prompt } = require('./main.js');
const { Questions } = require('./parsed-questions.js');



function searchQuestion(prompt) {
    console.log('Search for Question');
    const matchingQuestions = Questions.filter(question => question.includes(Prompt));

}
module.exports = { searchQuestion };
module.exports = { matchingQuestions };

