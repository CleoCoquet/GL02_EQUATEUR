// When this function runs, it will return an array of all the questions and answers from the

let Questions = [];

const fs = require('fs');
const path = require('path');
const {parseGift} = require("./gift-parser");

function parseDatabase(){

// Get the absolute path to the folder where your script is located
const scriptFolderPath = path.resolve(__dirname);

// Replace 'your_documents_folder' with the actual name of your documents folder
const folderName = 'Data';
const folderPath = path.join(scriptFolderPath, folderName);
console.log("path: " + folderPath);

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }

    files.forEach(documentFile => {
        const documentPath = path.join(folderPath, documentFile);
        fs.readFile(documentPath, 'utf-8', (err, data) => {
            if (err) {
                console.error(`Error reading document ${documentPath}:`, err);
                return;
            }
            // Parse the document using the parser function
            const parsedResult = parseGift(data);

            // Add the parsed result to the array
            Questions.push(parsedResult);


            // Output the result
        });
        });
});
module.exports = {Questions};
}

module.exports = {parseDatabase};