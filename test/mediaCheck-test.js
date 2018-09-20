import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mediaCheck, { mqChange } from '../src/js/mediaCheck.js';

chai.use(sinonChai);

describe('mediaCheck', () => {
  describe('setup', () => {
    it('returns nothing if !window', () => {
      delete global.window;

      expect(mediaCheck({})).to.be.null;
    });

    it('adds a matchMedia listener', () => {
      const addListener = sinon.spy();
      const addEventListener = sinon.spy();

      global.window = {
        matchMedia: sinon.fake.returns({
          addListener
        }),
        addEventListener
      };

      mediaCheck({
        media: '(max-width: 420px)'
      });

      expect(addListener).to.have.been.called;
    });

    it('adds an event listener for orienatation change', () => {
      const addListener = sinon.spy();
      const addEventListener = sinon.spy();

      global.window = {
        matchMedia: sinon.fake.returns({
          addListener
        }),
        addEventListener
      };

      mediaCheck({
        media: '(max-width: 420px)'
      });

      expect(addEventListener.getCall(0).args[0]).to.equal('orientationchange');
    });
  });

  describe('#mqChange', () => {
    context(' mq.matches === true', () => {
      const mq = { matches: true };
      it('Calls entry', () => {
        const entry = sinon.spy();
        mqChange(mq, { entry });

        expect(entry).to.have.been.calledWith(mq);
      });

      it('Does NOT call exit', () => {
        const exit = sinon.spy();
        mqChange(mq, { exit });

        expect(exit).not.to.have.been.calledWith(mq);
      });

      it('Calls both', () => {
        const both = sinon.spy();
        mqChange(mq, { both });

        expect(both).to.have.been.calledWith(mq);
      });
    });

    context(' mq.matches === false', () => {
      const mq = { matches: false };
      it('Calls exit', () => {
        const exit = sinon.spy();
        mqChange(mq, { exit });

        expect(exit).to.have.been.calledWith(mq);
      });

      it('Does NOT call entry', () => {
        const entry = sinon.spy();
        mqChange(mq, { entry });

        expect(entry).not.to.have.been.calledWith(mq);
      });

      it('Calls both', () => {
        const both = sinon.spy();
        mqChange(mq, { both });

        expect(both).to.have.been.calledWith(mq);
      });
    });
  });
});
