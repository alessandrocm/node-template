var {setWorldConstructor} = require('cucumber');

function CustomWorld() {

  this.stringify = function(obj) {

    const string = JSON.stringify(obj);
    return string.replace('\"', '"');

  }

  this.mapEndpoint = function(name) {

    switch (name) {
      case 'POST /profiles':
        return 'div#operations-Profiles-post_profiles';
    }

  };

  this.mapValue = function(name) {

    switch(name) {
      case "email" :
        return 'test.email@address.net';
      case "password" :
        return 'SuperSecurePassword1';
      case "first_name" :
        return 'Billy';
      case "last_name" :
        return 'Jean';
    }

  }

  this.clickElement = function(selector) {

    browser.element(selector)
      .click();
    ;
    browser.pause(300);

  };

  this.setValue = function(selector, value) {

    browser.element(selector)
      .setValue(value)
    ;
    browser.pause(100);

  };

}

setWorldConstructor(CustomWorld)
