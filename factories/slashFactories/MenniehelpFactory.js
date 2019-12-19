const MenniehelpFactory = () => (body) => new Promise((resolve, reject) => {
    
    return resolve({
      text: `Hey There!  I'm Mennie the MentionBot :mennie:, and I'm here to help you better track press mentions! \n\n-To view the total press mentions saved since I started counting, type */Menniecount* . \n-To hear a funny journalism joke, type */Menniejoke* \n\n-Looking for the mention dashboard?  You can find it at: https://sn-mentionbot.herokuapp.com/ `,
    })
})


module.exports = MenniehelpFactory