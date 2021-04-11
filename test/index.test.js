const chai = require('chai');
chai.use(require('../'));
chai.should();
const assert = chai.assert;
const expect = chai.expect;

describe('noReservedWords', () => {
  const safe = 'id, phone, email';
  const notSafe = 'id, name, phone, email';
  const usingAttributeNamePrefix = 'id, #name, phone, email';
  const usingAttributeValuePrefix = 'username = :name';
  const multiplePrefxedReservedWords = '#user = :name';
  describe('should-style tests', () => {
    it('should pass if no reserved word is used at all', () => {
      safe.should.have.noReservedWords();
    });

    it('should pass if any reserved words are prefixed', () => {
      usingAttributeNamePrefix.should.have.noReservedWords();
      usingAttributeValuePrefix.should.have.noReservedWords();
      multiplePrefxedReservedWords.should.have.noReservedWords();
    });
  });

  describe('expect-style tests', function () {
    it('should pass if no reserved word is used at all', () => {
      safe.should.have.noReservedWords();
    });

    it('should pass if any reserved words are prefixed', () => {
      expect(usingAttributeNamePrefix).to.have.noReservedWords();
      expect(usingAttributeValuePrefix).to.have.noReservedWords();
      expect(multiplePrefxedReservedWords).to.have.noReservedWords();
    });
  });

  describe('tdd-style tests', function () {
    it('should pass if no reserved word is used at all', () => {
      safe.should.have.noReservedWords();
    });

    it('should pass if any reserved words are prefixed', () => {
      assert.noReservedWords(usingAttributeNamePrefix);
      assert.noReservedWords(usingAttributeValuePrefix);
      assert.noReservedWords(multiplePrefxedReservedWords);
    });
  });

  it('should fail if a reserverd word is found', () => {
    assert.throws(() => {
      assert.noReservedWords(notSafe);
    });
  });
});

describe('noReservedWordsExcept', () => {
  const safe = 'id, phone, email';
  const usingAttributeNamePrefix = 'SET #name = :fullname';
  const usingAttributeValuePrefix = 'SET username = :name';
  const missingPrefix = 'SET username = name';

  describe('should-style tests', () => {
    it('should pass if no reserved word is used at all', () => {
      safe.should.have.noReservedWordsExcept('SET');
    });

    it('should pass if any reserved words are prefixed', () => {
      usingAttributeNamePrefix.should.have.noReservedWordsExcept('SET');
      usingAttributeValuePrefix.should.have.noReservedWordsExcept('SET');
    });

    it('should pass regardless of case', () => {
      usingAttributeNamePrefix.should.have.noReservedWordsExcept('set');
      usingAttributeValuePrefix.should.have.noReservedWordsExcept('set');
    });

    it('should pass when multiple reserved words are allowed', () => {
      missingPrefix.should.have.noReservedWordsExcept(['SET', 'NAME']);
    });
  });

  describe('expect-style tests', function () {
    it('should pass if no reserved word is used at all', () => {
      safe.should.have.noReservedWordsExcept('SET');
    });

    it('should pass if any reserved words are prefixed', () => {
      expect(usingAttributeNamePrefix).to.have.noReservedWordsExcept('SET');
      expect(usingAttributeValuePrefix).to.have.noReservedWordsExcept('SET');
    });

    it('should pass regardless of case', () => {
      expect(usingAttributeNamePrefix).to.have.noReservedWordsExcept('set');
      expect(usingAttributeValuePrefix).to.have.noReservedWordsExcept('set');
    });

    it('should pass when multiple reserved words are allowed', () => {
      expect(missingPrefix).to.have.noReservedWordsExcept(['SET', 'NAME']);
    });
  });

  describe('tdd-style tests', function () {
    it('should pass if no reserved word is used at all', () => {
      safe.should.have.noReservedWordsExcept('SET');
    });

    it('should pass if any reserved words are prefixed', () => {
      assert.noReservedWordsExcept(usingAttributeNamePrefix, 'SET');
      assert.noReservedWordsExcept(usingAttributeValuePrefix, 'SET');
    });

    it('should pass regardless of case', () => {
      assert.noReservedWordsExcept(usingAttributeNamePrefix, 'set');
      assert.noReservedWordsExcept(usingAttributeValuePrefix, 'set');
    });

    it('should pass when multiple reserved words are allowed', () => {
      assert.noReservedWordsExcept(missingPrefix, ['SET', 'NAME']);
    });
  });

  it('should fail if a reserverd word is found', () => {
    assert.throws(() => {
      assert.noReservedWordsExcept(missingPrefix, 'SET');
    });

    assert.throws(() => {
      assert.noReservedWordsExcept(missingPrefix, 'set');
    });
  });

  it('should fail if the reserved word is not explicitly allowed', () => {
    assert.throws(() => {
      assert.noReservedWordsExcept(usingAttributeNamePrefix, []);
    });
  });
});
