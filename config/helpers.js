module.exports = {
    ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    bar: function(){
      return "BAR!";
    },
    domClean: function(dom) {
      console.log(dom);
      cleanerTwo = dom.split('.com')[0];
      console.log(cleanerTwo);
      cleanerThree = cleanerTwo.split('.org')[0];
      console.log(cleanerThree);
      return cleanerThree;
    }
}