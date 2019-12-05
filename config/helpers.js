module.exports = {
    ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    ifEqualsTwo: function(arg1, arg2, arg3, options) {
      console.log("================================================")
      console.log(arg1);
      console.log(arg2);
      console.log(arg3);
      console.log("================================================")
        return (arg1 === arg2||arg3) ? options.fn(this) : options.inverse(this);
    },
    bar: function(){
      return "BAR!";
    }
}