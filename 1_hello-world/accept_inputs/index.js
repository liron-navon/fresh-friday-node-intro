const readline = require('readline');

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => interface.question(`${question} `, resolve))
}

async function askQuestions() {
    const n1 = await ask('pick a number');
    const n2 = await ask('pick a second number');
    const name = await ask('what is your name?');

    const sum = Number(n1) + Number(n2);
    console.log(`hello ${name}, the sum of these numbers is ${sum}.`);
    interface.close();
}

askQuestions();

// simpler
//
// interface.question('What is your favorite food? ', (answer) => {
//     console.log(`Oh, so your favorite food is ${answer}`);
// });
