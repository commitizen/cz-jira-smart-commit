import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import proxyquire from 'proxyquire';

const {expect} = chai;
chai.use(sinonChai);

describe(`prompter`, () => {
  let inquirer, commit, prompter;
  beforeEach(() => {
    inquirer = {prompt: sinon.spy()};
    commit = sinon.spy();
    prompter = proxyquire('./', {inquirer}).prompter;
  });

  it(`call inquirer.prompt`, () => {
    prompter(inquirer);
    expect(inquirer.prompt).to.have.been.calledWith(sinon.match.array, sinon.match.func);
  });

  describe(`commitAnswers`, () => {
    let commitAnswers;
    beforeEach(() => {
      prompter(inquirer, commit);
      commitAnswers = inquirer.prompt.getCall(0).args[1];
    });

    it(`should call commit with the proper message`, () => {
      const message = 'sample commit message';
      const issues = 'CZ-234 CZ-235';
      const workflow = 'closed';
      const time = '3y 2w 7d 8h 30m';
      const comment = 'This took waaaaay too long';
      commitAnswers({message, issues, workflow, time, comment});
      expect(commit).to.have.been.calledWith([
        message,
        issues,
        `#${workflow}`,
        `#time ${time}`,
        `#comment ${comment}`
      ].join(' '));
    });

    ['workflow', 'time', 'comment'].forEach((item) => {
      it(`should just leave off ${item} if it's not specified`, () => {
        const message = 'sample commit message';
        const issues = 'CZ-234 CZ-235';
        const workflow = 'closed';
        const time = '3y 2w 7d 8h 30m';
        const comment = 'This took waaaaay too long';
        const answers = {message, issues, workflow, time, comment};
        delete answers[item];
        commitAnswers(answers);
        expect(commit).to.have.been.calledWith(filter([
          message,
          issues,
          item !== 'workflow' ? `#${workflow}` : undefined,
          item !== 'time' ? `#time ${time}` : undefined,
          item !== 'comment' ? `#comment ${comment}` : undefined
        ]).join(' '));
      });
    })
  });

});

function filter(array) {
  return array.filter(function(item) {
    return !!item;
  });
}
