const {Prompt} = require('./main.js');
const {Questions} = require('./parsed-questions.js');
const matchingQuestions = Questions.filter(question => question.includes(Prompt));
module.exports = {matchingQuestions};
