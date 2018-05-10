/**
 * Composes functions passed in. compose(a, b, c) === (...args) => c(b(a(...args)));
 * @param  {[type]} funcs [list of function to compose]
 * @return {[type]}       [Returns a function that is the composition of all passed in functions]
 */
function compose(...funcs) {
  return funcs.reduce((f, next) => (...params) => next(f(...params)));
}

/**
 * Combines output of all function into a single array. combine(a,b,c)(x) === [a(x), b(x), c(x)];
 * @param  {[type]} funcs [list of function to execute]
 * @return {[type]}       [Returns an array with the output of each function in the order they were executed]
 */
function combine(...funcs) {
  return (...args) => funcs.reduce((output, next) => {
    output.push(next(...args));
    return output;
  }, []);
}

/**
 * Executes the given promise once for each item in the array sequentially
 * series([1,2,3], p1) === p1(1).then(() => p1(2)).then(() => p1(3))
 * @param  {Array}  [args=[]] [Array of items]
 * @param  {[type]} [fn=(arg] [A promise to execute for each item]
 * @return {[type]}           [Returns a promise that will resolve once every item has been executed.]
 */
function series(args = [], fn = (arg) => Promise.resolve()) {
  return args.reduce((prev, next) => prev.then(() => fn(next)), Promise.resolve());
}

/**
 * Chains the all the promises. chain(p1, p2, p3) === (...args) => p1(...args).then(p2).then(p3)
 *  Every subsequest promise receives the value the previous promise resolves to.
 * @param  {[type]} promises [A list of promises. The will be executed in order]
 * @return {[type]}          [A promise that resolves to the value the last promise returns.]
 */
function chain(...promises) {
  return promises.reduce((p1, p2) => (...args) => p1(...args).then(p2));
}

/**
 * Chains the all the promises like chain.
 *  cancellable(p1, p2, p3) === (...args) => p1(...args, cancelFn).then(res1 => p2(res1, cancelFn)).then(res2 => p3(res2, cancelFn))
 *  Every subsequent promise receives the value the previous promise resolves to and a cancel function.
 *  Each promise can call cancel if it decides the chain of proimses should exit early.
 *  The cancel function can be passed a value if you wish to partially resolve the chain.
 * @param  {[type]} promises [A list of promises. The will be executed in order]
 * @return {[type]}          [A promise that resolves to the value the last promise returns.]
 */
function cancellable(...promises) {

	function CancelPromise(message, value) {
		this.message = message;
		this.value = value;
	}

	const cancel = (value) => {
		return Promise.reject(new CancelPromise('CANCELLED', value));
	}

	function handleCancellation(error) {
		if (error instanceof CancelPromise) {
			return error.value;
		}

		return Promise.reject(error);
	}

	function cancellablePromise(promise) {
		return (...args) => promise(...args, cancel);
	}

	return promises
		.map(p => cancellablePromise(p))
		.reduce(
			(p1, p2, index, list) =>
				(index === list.length - 1) ?
				(...args) =>
					p1(...args)
						.then(p2)
						.catch(handleCancellation)
				:
				(...args) =>
					p1(...args)
						.then(p2)
		)
	;
}

/**
  Can be used to ensure required parameters are provided to a function.
  function foo(bar = requiredParam('bar')) {}

  foo('OK');
  foo(); // throws error "bar parameter is missing"
**/
function requiredParam(name) {
  const requiredParamError = new Error(`${name} parameter is missing`);

 // preserve original stack trace
 if (typeof Error.captureStackTrace === 'function') {
   Error.captureStackTrace(
     requiredParamError,
     requiredParam
   );
 }

 throw requiredParamError;
}

module.exports = {
  compose,
  combine,
  series,
  chain,
  cancellable
};
