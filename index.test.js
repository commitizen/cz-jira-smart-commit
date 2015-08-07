import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import {prompter} from './index';

const {expect} = chai;
chai.use(sinonChai);

describe(`prompter`, () => {
  let cz, commit;
  beforeEach(() => {
    cz = {prompt: sinon.spy()};
    commit = sinon.spy();
  });

  it(`call cz.prompt`, () => {
    prompter(cz);
    expect(cz.prompt).to.have.been.calledWith(sinon.match.array, sinon.match.func);
  });

  describe(`commitAnswers`, () => {
    let commitAnswers;
    beforeEach(() => {
      prompter(cz, commit);
      commitAnswers = cz.prompt.getCall(0).args[1];
    });

    it(`should call commit with the proper message`, () => {
      const issues = 'CZ-234 CZ-235';
      const time = '3y 2w 7d 8h 30m';
      const workflow = 'closed';
      const comment = 'This took waaaaay too long';
      const message = 'It would not have been so bad except I got distracted...';
      commitAnswers({issues, time, workflow, comment, message});
      expect(commit).to.have.been.calledWith([
        issues,
        `#comment ${comment}`,
        `#time ${time}`,
        `#${workflow}`,
        '\n' + message
      ].join(' '));
    });

    ['comment', 'time', 'workflow', 'message'].forEach((item) => {
      it(`should just leave off ${item} if it's not specified`, () => {
        const issues = 'CZ-234 CZ-235';
        const time = '3y 2w 7d 8h 30m';
        const workflow = 'closed';
        const comment = 'This took waaaaay too long';
        const message = 'It would not have been so bad except I got distracted...';
        const answers = {issues, time, workflow, comment, message};
        delete answers[item];
        commitAnswers(answers);
        expect(commit).to.have.been.calledWith(filter([
          issues,
          item !== 'comment' ? `#comment ${comment}` : undefined,
          item !== 'time' ? `#time ${time}` : undefined,
          item !== 'workflow' ? `#${workflow}` : undefined,
          item !== 'message' ? '\n' + message : undefined
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
