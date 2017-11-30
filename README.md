# requiree
`requiree` - decide whether to import a package normally or in dev mode.

# About
`requiree` makes it possible to require a package normally and also in dev mode. Requiring a package in dev mode makes it possible to export some private members as well that should not be exported normally, and by that can be used for testing.

# Install
In order to install `requiree` using `npm`, simply run:

`npm install requiree --save`

Using it makes it possible for you to require a package and access it's private members when requiring it in dev mode.

# Usage

Using `requiree` is very simple and very convenient. However it requires some code changes.

Here is a full example of how to use `requiree`:

`module.js` (example for a module using `requiree`):

```javascript
// private variable
const ONE = 1;

// public variable
var getOne = function() {
  return ONE;
};

// initialize the dev object used by requiree package
module.exports.dev = {}; // NOTICE: requiree uses @dev prop hardcoded, cannot use any different names

// set the members you want to export only in dev mode
module.exports.dev.ONE = ONE;

// set the members that should be exported normally
module.exports.getOne = getOne;
```

`main.js` (example for a js file that requires `module.js` normally):

```javascript
var requiree = require('requiree');

var mod = requiree('./module.js');

console.log(mod.getOne()); // will print: 1

console.log(mod.ONE); // will print: undefined (ONE does not exist)
```

`test.js` (example for a js file that requires `module.js` in dev mode):

```javascript
var requiree = require('requiree');

var mod = requiree.dev('./module.js');

console.log(mod.getOne()); // will print: 1

console.log(mod.ONE); // will print: 1
```

# Dependencies
In order to simply use `requiree`, no dependencies whatsoever required.

In order to edit and work with `requiree`, the following packages must be installed:

1. `jasmine` (global):

In order to install `jasmine` simply run (through the command line):

`npm install -g jasmine`

# Please Notice
Once decided to start using `requiree` in your project, it must always be used.
Using normal `require` will no longer work properly, since only `requiree` knows to delete the `dev` prop from the `module.exports` object, so using `require` will import package with the dev properties that are not intended to be exported!
