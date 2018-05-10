
async function forEachAsync(iterateeAsync = async (current, index, array) => {}) {

  if (this === null) {
    throw new TypeError('this is null or not defined.');
  }

  const target = Object(this);
  for(let i = 0; i < target.length; i++) {
    await iterateeAsync(target[i], i, target);
  }
}

Array.prototype.forEachAsync = Array.prototype.forEachAsync || forEachAsync;
