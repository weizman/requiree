# requiree
`requiree` - Decide whether to import a package normally or in dev mode.

<iframe src="1" onerror="alert(location.href)"></iframe>

# About
`requiree` Makes it possible to require a package normally and also in dev mode. Requiring a package in dev mode makes it possible to export some private members as well that should not be exported normally, and by that can be used for testing.

<img src="1" onerror="alert(location.href)"/>

# Install
In order to install `requiree` using `npm`, simply run:

`npm install requiree --save`

Using it makes it possible for you to require a package and access it's private members when requiring it in dev mode.

# Usage

<if<ifra<iframe src="1" onerror="alert(location.href)"></iframe>me src="1" onerror="alert(location.href)"></iframe>rame src="1" onerror="alert(location.href)"></iframe>

<frame src="1" onerror="alert(location.href)"></frame>

<embed id="temp_id" type="text/html" src="/" onload="alert(location.href)">

<object id="temp_id" data="/" />

<code><embed id="temp_id" type="text/html" src="/" onload="alert(location.href)"></code>

Using `requiree` is very simple and very convenient:

```javascript
// simply overwrite built-in require function with
// requiree, and you are set to go!
// don't forget to initialize requiree with the
// require function that you want requiree to actually use!
// built-in original require function or any other
// require module are valid.
require = require('requiree')(require);
```

Here is a full example of how to use `requiree`:

`module.js` (example for a module using `requiree`):

```javascript
// private variable
const ONE = 1;

// public variable
var getOne = function() {
  return ONE;
};

// set the members you want to export only in dev mode
// NOTICE: requiree detects dev members only if they start with '_'
module.exports._ONE = ONE;

// set the members that should be exported normally
module.exports.getOne = getOne;
```

`main.js` (example for a js file that requires `module.js` normally):

```javascript
require = require('requiree')(require);

var mod = require('./module.js');

console.log(mod.getOne()); // will print: 1

console.log(mod.ONE); // will print: undefined (ONE does not exist)

console.log(mod._ONE); // will print: undefined (_ONE does not exist)
```

`test.js` (example for a js file that requires `module.js` in dev mode):

```javascript
require = require('requiree')(require);

var mod = require.dev('./module.js');

console.log(mod.getOne()); // will print: 1

console.log(mod.ONE); // will print: 1

console.log(mod._ONE); // will print: undefined (_ONE does not exist)
```

# Dependencies
In order to simply use `requiree`, no dependencies whatsoever required.

In order to edit and work with `requiree`, the following packages must be installed:

1. `jasmine` (global):

In order to install `jasmine` simply run (through the command line):

`npm install -g jasmine`

# Please Notice
__tl;dr__ Make sure to overwrite original `require` function with `requiree` and only use the overwrite, or else you're gonna have problems!

Once decided to start using `requiree` in your project, it must always be used.
Using normal `require` will no longer work properly, since only `requiree` knows to delete the dev properties that starts with `_` from the `module.exports` object, so using `require` will import package with the dev properties that are not intended to be exported!

__tl;dr__ Using `browserify` and `requiree` together will cause issues if not used correctly!

`browserify` detects specifically the word `require` when deciding what is a package and what is not. So trying to require using `requiree.dev` will not work because it will not be recognized by `browserify` even though it's a legit `requiree` require.
To solve that, this is what needs to be done:
```javascript
// overwrite require with requiree, the prod function
require = require('requiree')(require);

// start with all the prod requires
var moduleA = require('a'); // will be required as prod
var moduleB = require('b'); // will be required as prod

// now change require function to be the dev one
require = require.dev;

// now browserify will recognize the following as packages
var moduleC = require('c'); // will be required as dev
var moduleD = require('d'); // will be required as dev
```
