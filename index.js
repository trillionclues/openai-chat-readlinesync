import openaiInstance from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

// function to make req using created object
async function chat() {
  console.log(colors.bold.green('Welcome to the chatbot program!'));
  console.log(colors.bold.green('You can start interacting with the bot!'));

  // store convo history
  const chatHistory = [];

  // create chat loop through
  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      // create chathistory construct by iterating over history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // Add latest user input
      messages.push({ role: 'user', content: userInput });

      // call api w/userInput
      const chatCompletion = await openaiInstance.createChatCompletion({
        messages: messages,
        model: 'gpt-3.5-turbo',
      });

      // Get completion text
      const completionText = chatCompletion.data.choices[0].message.content;

      // end chatcompletion loop
      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('Bot: ' + completionText));
        return;
      }

      // return chatbot response
      console.log(colors.green('Bot: ' + completionText));

      // update history with userinput and bot response
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.log(colors.red(error));
    }
  }
}

chat();
