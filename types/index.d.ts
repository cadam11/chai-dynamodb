// Merge namespace with global chai
declare global {
  namespace Chai {
    interface Assertion {
      noReservedWords(): Assertion;
      noReservedWordsExcept(exceptions: string[]): Assertion;
    }
  }
}

declare function chaiDynamodb(chai: any, utils: any): void;

export = chaiDynamodb;
