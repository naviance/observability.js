(function() {
    "use strict";

    var observableMethods = {
        registerObserver: function (fn) {
            if (typeof fn !== "function") {
                throw new TypeError("registerObserver must be called with a function");
            }

            setupObservers(this);
            this._observers.push(fn);
        },
        notifyObservers: function () {
            var notifyArgs = arguments;

            this._observers.forEach(function(fn) {
                fn.apply(null, notifyArgs);
            });
        }
    };

    function setupObservers(obj) {
        if (obj._observers) { return; }

        Object.defineProperty(obj, "_observers", {
            enumerable: false,   // Hide property from for..in, JSON.stringify, etc.
            writable: false,     // Prevent overwriting
            configurable: false, // Prevent redefinition
            value: []
        });
    }

    function mixinObservability (obj) {
        if (obj.hasOwnProperty('_observers')) {
            throw new Error("the '_observers' property is already in use");
        }

        obj.registerObserver = observableMethods.registerObserver;
        obj.notifyObservers = observableMethods.notifyObservers;

        return obj;
    }

    window.mixinObservability = mixinObservability;

    if (window.angular) {
        angular.module("observability.js").value("mixinObservability", mixinObservability);
    }
})();
