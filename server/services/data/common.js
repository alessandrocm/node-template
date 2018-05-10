
function first(columns = []) {
  return (query) =>
    query.first(columns)
  ;
}

function select(columns = []) {
  return (query) =>
    query.select(columns)
  ;
}

function insert(data, returning = '*') {
  return (query) =>
    query
      .returning(returning)
      .insert(data)
  ;
}

function update(data, returning = '*') {
  return (query) =>
    query
      .returning(returning)
      .update(data)
  ;
}

function del(returning = '*') {
  return (query) =>
    query
      .returning(returning)
      .del()
  ;
}

function where(properties) {
  return (query) =>
    query.where(properties)
  ;
}

function orWhere(properties) {
  return (query) =>
    query.orWhere(properties)
  ;
}

function whereRaw(rawSql = '') {
  return (query) =>
    query.whereRaw(rawSql);
}

function transacting(trx) {
  return (query) =>
    trx ?
    query.transacting(trx) :
    query
  ;
}

module.exports = {
  first,
  insert,
  select,
  update,
  del,
  where,
  orWhere,
  whereRaw,
  transacting
};
