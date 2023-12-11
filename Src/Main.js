const program = require('caporal');
const {matchingQuestions} = require("./search-question");
const {parsedQuestions} = require("./parsed-questions");
const prompt = require('prompt-sync')();

program
    .version('1.0.0')
    .description('Exam Tool CLI');

program
    .command('show-options')
    .description('Show available options')
    .action(() => {
        parsedQuestions();
        console.log('Choose your option:');
        console.log('1. Search for Question');
        console.log('2. Select Questions');
        console.log('3. Prepare Exam');
        console.log('4. Profile GIFT Exam');
        console.log('5. Compare Exam Profile');
        console.log('6. Generate VCard');
        console.log('7. Simulate Exam');

        const option = prompt('Enter your option: ');
        handleOption(option);
    });

function handleOption(option) {
    switch (option) {
        case '1':
            runsearchQuestion();
            break;
        case '2':
            runselectQuestions();
            break;
        case '3':
            runprepareExam();
            break;
        case '4':
            runprofileGiftExam();
            break;
        case '5':
            runcompareExamProfile();
            break;
        case '6':
            rungenerateVCard();
            break;
        case '7':
            runsimulateExam();
            break;
        default:
            console.log('Invalid option. Please choose a valid option.');
            break;
    }
}

function runsearchQuestion() {
    console.log('Search for Question');
    let question = prompt('Enter your question: ')
    //call the file that contains the function
    const {matchingQuestions} = require("./search-question");
    //call the function
    matchingQuestions(question)

    console.log(matchingQuestions)
}



function runprepareExam() {
    console.log('Prepare Exam');
    //call the file that contains the function prepareExam
    const {prepareExam} = require("./prepare_exam");
    //call the function
    //dorcas fix this

}

function runprofileGiftExam() {
    console.log('Profile GIFT Exam');
//call the file that contains the function profileGiftExam
    const {profileGiftExam} = require("./profile-gift-exam");
//problem here
//eines
}

function runcompareExamProfile() {
    console.log('Compare Exam Profile');
    //call the file that contains the function compareExamProfile
    const {compareExamProfile} = require("./compare-exam-profile");
    //call the function
    //create the object to get results
    //dorcas fix this
}

    function rungenerateVCard() {
        console.log('Generate VCard');
        //call the file that contains the function generateVCard
        const {generateVCard} = require("./generate-vcard");
        //call the function
        generateVCard()
    }

    function runsimulateExam() {
        console.log('Simulate Exam');
        //call the file that contains the function simulateExam
        const {simulateExam} = require("./simulate-exam");
        //call the function
        //this is empty also eines

}

    program.parse(process.argv);

