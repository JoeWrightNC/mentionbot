module.exports = {
    ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    ifEqualsTwo: function(arg1, arg2, arg3) {
      return (arg1 == arg2 || arg3);
  },
    bar: function(){
      return "BAR!";
    }
}