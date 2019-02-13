const readline = require('readline');

// we create an interface with stdin and stdout
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// a small abstraction to make question into a promise
function ask(question) {
    return new Promise((resolve) => interface.question(`${question} `, resolve))
}

// ask some questions
async function askQuestions() {
    const n1 = await ask('Pick a number');
    const n2 = await ask('Pick a second number');
    const name = await ask('What is your name?');

    const sum = Number(n1) + Number(n2);
    console.log(`hello ${name}, the sum of these numbers is ${sum}.`);
    interface.close();
}
askQuestions();

// A simpler way to do it
//
// interface.question('What is your favorite food? ', (answer) => {
//     console.log(`Oh, so your favorite food is ${answer}`);
//     interface.close();
// });
