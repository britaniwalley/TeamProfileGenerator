const questions = require("../script/app");

const engineer = require("../script/app");

const intern = require("../script/app");

const both = require("../script/app");

describe("runs initial prompt", () => {
  it("should run initial inquirer prompt", () => {
    expect(questions).toEqual(questions);
  });
});

describe("runs engineer prompt", () => {
  it("should run initial inquirer prompt", () => {
    expect(engineer).toEqual(engineer);
  });
});

describe("runs initial prompt", () => {
  it("should run initial inquirer prompt", () => {
    expect(intern).toEqual(intern);
  });
});

describe("runs initial prompt", () => {
  it("should run initial inquirer prompt", () => {
    expect(both).toEqual(both);
  });
});
