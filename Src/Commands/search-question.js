const {Prompt} = require('./main.js');
const {Questions} = require('./parsed-questions.js');

Questions.forEach(question =>{
    if(question.name.includes(Prompt) || question.text.includes(Prompt)){
        console.log(question)}
        module.exports = {question};
    });
