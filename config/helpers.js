module.exports = {
    ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    ifEqualsTwo: function(a, b, c, options) {
      console.log("================================================")
      console.log(a);
      console.log(b);
      console.log(c);
      console.log("================================================")
        if (a == b || c) {
          console.log(this);
          return options.fn(this)
        };
        return options.inverse(this);
    },
    bar: function(){
      return "BAR!";
    }
}