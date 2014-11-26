describe("mixinObservability", function() {
    it("should be a function", function() {
        expect(typeof mixinObservability).toBe("function");
    });

    it("should add the observable methods to an object via mutation", function () {
        var obj = {};
        mixinObservability(obj);

        expect(typeof obj.registerObserver).toBe("function");
        expect(typeof obj.notifyObservers).toBe("function");
    });

    it("should return the modified object", function () {
        var obj = {};
        expect(mixinObservability(obj)).toBe(obj);
    });

    it("should throw if the object already has an `_observers` property", function () {
        function alreadyHasObserversProp () {
            mixinObservability({ _observers: false });
        }

        expect(alreadyHasObserversProp).toThrow();
    });

    describe("mixed-in", function () {
        describe("registerObserver", function() {
            it("should create a list of observers if it doesn't already have one", function() {
                var observable = mixinObservability({});
                observable.registerObserver(function() {});

                expect(observable._observers).not.toBeUndefined();
            });

            it("should throw if it is not given an observer function", function () {
                var observable = mixinObservability({});

                function withFn () { observable.registerObserver(function() {}); }
                function withoutFn () { observable.registerObserver(); }
                function nonFn () { observable.registerObserver(true); }

                expect(withFn).not.toThrow();
                expect(withoutFn).toThrow();
                expect(nonFn).toThrow();
            });
        });

        describe("notifyObservers", function () {
            it("should call each registered observer function", function () {
                var observable = mixinObservability({});

                var firstObserver = jasmine.createSpy("firstObserver");
                var secondObserver = jasmine.createSpy("secondObserver");

                observable.registerObserver(firstObserver);
                observable.registerObserver(secondObserver);

                observable.notifyObservers();

                expect(firstObserver).toHaveBeenCalled();
                expect(secondObserver).toHaveBeenCalled();
            });

            it("should call observer functions with the same arguments it is given", function () {
                var observable = mixinObservability({});
                var observer = jasmine.createSpy("observer");

                observable.registerObserver(observer);
                observable.notifyObservers(1, 2, 3, 4);

                expect(observer).toHaveBeenCalledWith(1, 2, 3, 4);
            });
        });
    });
});
