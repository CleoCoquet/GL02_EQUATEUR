// main.js

function showOptions() {
    console.log('Choose your option:');
    console.log('1. Search for Question');
    console.log('2. Select Questions');
    console.log('3. Prepare Exam');
    console.log('4. Profile GIFT Exam');
    console.log('5. Compare Exam Profile');
    console.log('6. Generate VCard');
    console.log('7. Simulate Exam');

    const option = prompt('Enter the option number:');
    handleOption(option);
}

function handleOption(option) {
    switch (option) {
        case '1':
            searchQuestion();
            break;
        case '2':
            selectQuestions();
            break;
        case '3':
            prepareExam();
            break;
        case '4':
            profileGiftExam();
            break;
        case '5':
            compareExamProfile();
            break;
        case '6':
            generateVCard();
            break;
        case '7':
            simulateExam();
            break;
        default:
            console.log('Invalid option. Please choose a valid option.');
            break;
    }
}

function searchQuestion() {
    console.log('Search for Question');
    // Implement search logic
}

function selectQuestions() {
    console.log('Select Questions');
    // Implement select questions logic
}

function prepareExam() {
    console.log('Prepare Exam');
    // Implement prepare exam logic

}

function profileGiftExam() {
    console.log('Profile GIFT Exam');
    // Implement profile GIFT exam logic
}

function compareExamProfile() {
    console.log('Compare Exam Profile');
    // Implement compare exam profile logic
}

function generateVCard() {
    console.log('Generate VCard');
    // Implement generate VCard logic
}

function simulateExam() {
    console.log('Simulate Exam');
    // Implement simulate exam logic
}

showOptions();
