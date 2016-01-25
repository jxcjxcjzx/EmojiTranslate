'use strict'

let EmojiTranslate   = require('./lib'),
    emojiTranslator = new EmojiTranslate()

console.log(emojiTranslator.translate('the house is on fire!'))
// the 🚪 is on 📛
