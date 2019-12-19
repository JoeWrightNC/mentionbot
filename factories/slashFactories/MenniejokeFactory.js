var mennieJokes = [
    "How many journalists does it take to change a light bulb?? Ommm, we just report the facts, we dont change them",
    "How many editors does it take to change a light bulb??  Only one, but first they will need to rewire the building",
    "Are we as a society ever going to reject clickbait journalism?  The answer may surprise you!",
    "Want to hear a funny joke about journalism?  Buzzfeed.",
    "What do you get if you cross a sports reporter with a vegetable ? A common tater !",
  ]

const MenniejokeFactory = () => (body) => new Promise((resolve, reject) => {
    //easy, help them out
    return resolve({
      text: `Oh, you like jokes?  Well I'm a bit of a comedian soooo :mennie::microphone:  \n\n ${mennieJokes[Math.floor(Math.random() * Math.floor(mennieJokes.length))]}`,
    })
})


module.exports = MenniejokeFactory