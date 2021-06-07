const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "team",
      message: "What is the name of your team?",
    },
    {
      type: "input",
      name: "manager",
      message: "Please enter the team manager's name: ",
    },
    {
      type: "input",
      name: "id1",
      message: "Please enter the manager's ID: ",
    },
    {
      type: "input",
      name: "email1",
      message: "Please enter the manager's email: ",
    },
    {
      type: "input",
      name: "phone1",
      message: "Please enter the manager's phone number: ",
    },
    {
      type: "checkbox",
      message: "Add an Engineer or an Intern? or Finish?",
      name: "eif",
      choices: ["Engineer", "Intern", "Finish"],
    },
  ]);
};

const validate = async (answers) => {
  if (answers.eif[0] === "Engineer" && answers.eif[1] === "Intern") {
    const res = await both().then((gen) => {
      answers.engineer = generateHTMLengineer(gen);
      answers.intern = generateHTMLintern(gen);
      return { ...answers };
    });
    return res;
  } else if (answers.eif[0] === "Engineer") {
    const res = await engineer().then((gen) => {
      answers.engineer = generateHTMLengineer(gen);
      return { ...answers };
    });
    return res;
  } else if (answers.eif[0] === "Intern") {
    const res = await intern().then((gen) => {
      answers.intern = generateHTMLintern(gen);
      return { ...answers };
    });
    return res;
  } else if (answers.eif[0] === "Finish") {
    return { ...answers };
  }
};

const engineer = async () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "What is the name of your engineer?",
    },
    {
      type: "input",
      name: "engineerID",
      message: "What is the id of your engineer?",
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is the email for your engineer?",
    },
    {
      type: "input",
      name: "engineerGit",
      message: "What is the Github username for your engineer?",
    },
  ]);
};

const intern = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "What is the name of your intern?",
    },
    {
      type: "input",
      name: "internID",
      message: "What is the id of your intern?",
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is your intern's email?",
    },
    {
      type: "input",
      name: "internSchool",
      message: "What is the name of your intern's school?",
    },
  ]);
};

const both = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "What is the name of your intern?",
    },
    {
      type: "input",
      name: "internID",
      message: "What is the id of your intern?",
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is your intern's email?",
    },
    {
      type: "input",
      name: "internSchool",
      message: "What is the name of your intern's school?",
    },
    {
      type: "input",
      name: "engineerName",
      message: "What is the name of your engineer?",
    },
    {
      type: "input",
      name: "engineerID",
      message: "What is the id of your engineer?",
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is the email for your engineer?",
    },
    {
      type: "input",
      name: "engineerGit",
      message: "What is the Github username for your engineer?",
    },
  ]);
};

const generateHTML = (answers) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">${answers.team}</h1>
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="">${answers.manager}</h5>
          </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Employee ID: ${answers.id1}</li>
              <li class="list-group-item">Email: ${answers.email1}</li>
              <li class="list-group-item">Phone: ${answers.phone1}</li>
            </ul>
        </div>
      </div> 
      ${answers.engineer === undefined ? "" : answers.engineer}
      ${answers.intern === undefined ? "" : answers.intern}
    </div>
  </div>
</body>
</html>`;
};
const generateHTMLengineer = (answers) =>
  `
  <div class="card-body">
    <h5 class="">${answers.engineerName}</h5>
    
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Employee ID: ${answers.engineerID}</li>
    <li class="list-group-item">Email: ${answers.engineerEmail}</li>
    <li class="list-group-item">Github: ${answers.engineerGit}</li>
  </ul>`;

const generateHTMLintern = (answers) =>
  `
  <div class="card-body">
    <h5 class="">${answers.internName}</h5>
    
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Employee ID: ${answers.internID}</li>
    <li class="list-group-item">Email: ${answers.internEmail}</li>
    <li class="list-group-item">School: ${answers.internSchool}</li>
  </ul>`;

(() => {
  questions().then((answers) => {
    validate(answers).then((data) => {
      writeFileAsync("index.html", generateHTML(data));
    });
  });
})();

module.exports = questions;
module.exports = engineer;
module.exports = intern;
module.exports = both;
