const express = require('express');
const path = require('path');

module.exports = function staticFiles() {
  return express.static(path.join(__dirname, '../public'));
};
