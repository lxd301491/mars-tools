export function wrapper(target: (...args: unknown[]) => unknown) {

  return {
    invoke: function (...args: unknown[]) {
      if (this.before) this.before(args);
      const result = target.apply;
    },
    before: function () {

    },
    after: function () {

    }
  };
}