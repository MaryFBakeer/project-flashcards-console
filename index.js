const fs = require('fs').promises;
const inquirer = require('inquirer');

//выбор тем и возвращение пути к файлу темы
async function topics() {
  const func = await inquirer.prompt([
    {
      type: 'list',
      name: 'team',
      message: 'Какую тему вы хотите?',
      choices: ['Марвел', 'Мемные цитаты'],
    },
  ]);
  if (func.team === 'Марвел') {
    return './topics/nighthawk_flashcard_data.txt';
  }
  return './topics/otter_flashcard_data.txt';
}
