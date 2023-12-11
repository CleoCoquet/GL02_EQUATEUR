// // test.js

const fs = require('fs'); // File system module

const { parseGiftFile, parseGift} = require('./Utils/gift-parser');

// Read GIFT file content
const filePath = 'C:\\Users\\randa\\Documents\\Repos\\GitHubI Intro\\Src\\Utils\\Data\\U7-p76-Relative_clauses.gift';
const giftContent = fs.readFileSync(filePath, 'utf8');


// Parse GIFT file content
const parsedQuestions = parseGift(giftContent);
console.log(parsedQuestions);



// const paragraph = "This is a paragraph with ::special formatting::, {inside curly braces}, and //some comments. Another line with //more text.";
//
// // Replace :::Text::, {Text}, and //text with a newline character.
// const result = paragraph.replace(/(::.*?::|\{.*?\}|\/\/[^\n\r]*|\})/g, '\n$1\n');
//
// // Split the result into an array of lines.
// const resultLines = result.split('\n').filter(line => line.trim() !== '');
//
// console.log(resultLines);








