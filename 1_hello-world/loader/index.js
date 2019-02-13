function loader(text, doneText, animationSteps, interval = 100, timeout = 5000) {
    let counter = 0;
    return new Promise((resolve) => {
        // write the first line
        process.stdout.write(`${text}`);

        // animate animation steps
        function animate() {
            const step = animationSteps[counter];
            process.stdout.write(`\r${text} ${step}`);

            counter++;
            if (counter >= animationSteps.length) {
                counter = 0;
            }
        }

        // interval for the animation
        const intervalId = setInterval(animate, interval);

        // clear the animation and resolve
        setTimeout(() => {
            clearInterval(intervalId);
            const spaces = ' '.repeat(text.length);
            process.stdout.write(`\r${doneText} ${spaces}`);
            resolve();
        }, timeout)
    });
}

const lineAnimation = ['/', '|', '\\', '-', '/', '|'];
const emojiAnimation = ['💁‍♀️', '🙅‍♀️', '🙆‍♀️', '🙋‍♀️', '🤦‍♀️', '🤷‍♀️', '🙎‍♀️', '💇‍♀️', '💆‍♀️'];

loader('Loading', 'Done', lineAnimation, 20)
    .then(() => {
        console.log('');
        console.log('');
        console.log('');
        loader('Emojis Loading','Done 🤯', emojiAnimation)
    });
