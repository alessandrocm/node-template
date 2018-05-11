const { omit, omitBy, isEmpty, isUndefined, pick } = require('lodash');
const { compose } = require('../../lib/funcs');
const { query, transaction } = require('../../lib/database');

const usersList = [];

function users() {
  return usersList;
}

function whereEmailLike(email) {
  return (usersQuery) =>
    !email ?
      usersQuery :
      usersQuery.filter(user => user.email === email)
  ;
}

function select(properties = []) {
  return (usersQuery) =>
    Promise.resolve(usersQuery.map(user => pick(user, properties)))
  ;
}

function insert(newUser) {
  return (list) => {
    list.push(newUser);
    return Promise.resolve(list);
  };
}

function omitPassword(users) {
  return users.map(user => omit(user, ['password']));
}

const self = module.exports = {

  createUserAsync(newUser = {}) {

    return compose(
        users,
        insert(newUser)
      )()
      .then(omitPassword)
      .then(users => !!users && users[0])
    ;

  },

  retrieveUserByAsync({id, email, first_name, last_name, gid} = {}) {

    const properties = omitBy({id, email, first_name, last_name, gid}, isUndefined);
    if (isEmpty(properties)) {
      return Promise.resolve(null);
    }

    return compose(
        users,
        where(properties),
        first(['id', 'email', 'first_name', 'last_name', 'password', 'verified', 'gid'])
      )()
    ;

  },

  findAsync({email} = {}) {
    return compose(
        users,
        whereEmailLike(email),
        select(['id', 'email', 'first_name', 'last_name', 'verified'])
      )()
    ;

  },

  updateUserAsync(id, {email, first_name, last_name, password, verified, gid} = {}) {

    const properties = omitBy({email, first_name, last_name, password, verified, gid}, isUndefined);
    if (isEmpty(properties)) {
      return Promise.resolve(false);
    }

    properties.updated_at = (new Date()).toUTCString();

    return compose(
        users,
        where({id}),
        update(properties)
      )()
      .then(omitPassword)
      .then(users => !!users && !!users.length && users[0])
    ;

  },


};
