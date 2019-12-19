const MenniehelpFactory = () => (body) => new Promise((resolve, reject) => {
    //easy, help them out
    return resolve({
      text: `Hey There!  I'm Mennie the MentionBot :mennie:, and I'm here to help you better track press mentions! If you aren't already signed up, you can join the lunch program by typing */hippostart* (if you aren't sure just go for it, I'll only let you join once). \n\n-To view today's menu, type */hippomenu* . \n-To order your entree (sandwich plus side, salad, etc.), type */hippoentree* then your order.  You can also update your order using this command, in case you already ordered but have changed your mind.  \n-`,
    })
})


module.exports = MenniehelpFactory