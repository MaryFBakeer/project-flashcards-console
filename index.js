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

// Обработка принятого файла, возвращаем массив объектов
async function digestFile(path) {
  const arrStr = (await fs.readFile(path, 'utf-8')).split('\r\n');
  const arrQuestion = arrStr.filter((el, i) => i % 3 === 0);
  const arrAnswer = arrStr
    .filter((el, i) => i % 3 !== 0 && el !== '')
    .map((el) => el.split(', '));
  const arrObj = [];
  for (let i = 0; i < arrQuestion.length; i += 1) {
    arrObj.push({
      question: arrQuestion[i],
      choices: arrAnswer[i],
      correctAnswer: arrAnswer[i][0],
    });
  }
  // promtO(arrObj);
}
