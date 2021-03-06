# observability.js

A JavaScript observer pattern mixin.

For an introduction to why you might want to use the observer pattern in JavaScript, see [Holy Bat-Signal, Batman! Implementing the Observer Pattern in JavaScript][drip].

## Installation

With Bower: `bower install observability.js --save`

## Usage

### General usage

#### On Ordinary Objects

By default, observability.js provides a `mixinObservability` object on the global
scope, which can be used as follows.

```js
var gordon = { name: "James Gordon" };

mixinObservability(gordon);
```

Now `gordon` has two new methods: `registerObserver`, and `notifyObservers`.

```js
(function () {
    function batSignal (villain) {
        console.log("Batman is on his way to deal with " + villain.name);
    }

    gordon.registerObserver(batSignal);
})();

gordon.notifyObservers({ name: "Joker" });
// => Batman is on his way to deal with Joker
```

#### On Prototypes

In addition to using observability on ordinary objects, you can also use it on object prototypes.

```js
function PoliceOfficer (name) {
    this.name = name;
}

mixinObservability(PoliceOfficer.prototype);
```

Now all `PoliceOfficer` objects can register and notify observers, but the observers will be unique to the instances.

### With Angular.js

If you are using Angular.js, you probably want to take advantage of Angular's dependency injection. Just add the `observability.js` module to your list of app dependencies.

```js
angular.module("gothamApp", ["observability.js"]);
```

And then you can inject the `observability` object as normal with Angular's DI.

```js
angular.module("gothamApp").factory("gordon", function (mixinObservability) {
    var gordon = { name: "James Gordon" };

    mixinObservability(gordon);

    return gordon;
});
```

Otherwise usage is the same as listed above.

[drip]:http://us6.campaign-archive2.com/?u=2cc20705b76fa66ab84a6634f&id=68a4cb2eb1&e=7cf19e1ff8
