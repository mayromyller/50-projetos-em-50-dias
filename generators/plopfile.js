module.exports = function (plop) {
  plop.setGenerator("project", {
    description: "insert your project name",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Miniproject name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../{{lowerCase name}}/index.html",
        templateFile: "templates/index.html.hbs",
      },
      {
        type: "add",
        path: "../{{lowerCase name}}/src/app.js",
        templateFile: "templates/app.js.hbs",
      },
      {
        type: "add",
        path: "../{{lowerCase name}}/src/styles/style.css",
        templateFile: "templates/style.css.hbs",
      },
    ],
  });
};
