this.methodA = function () {
  // ...
};

this['methodB'] = function () {

};

function methodC() {}

this.methodC = methodC;

this.methodD = this.methodA.bind(this);
this.methodE = methodC.bind(this);
// This next one would be a total arse to detect – runtime?
this.methodF = (function () {
  return function () {
    return 40;
  };
}());

var methodG = function () {};
this.methodG = methodG;

this.fakeA = 10;
this.fakeB = 'Hello world!';
this.fakeC = (function () { return 20; }());