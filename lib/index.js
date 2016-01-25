'use strict'

const emojis = require("emojilib")
const SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~'

module.exports = function createEmojiTranslate() {
    return new EmojiTranslate()
}

function EmojiTranslate() {}
EmojiTranslate.prototype = Object.create(Object.prototype)

EmojiTranslate.prototype.translate = function(text) {
    let words = text.split(' ')
    let translatedText = []
    for (var idx in words) {
        translatedText.push(translateWord(words[idx]))
    }

    return translatedText.join(' ')
}

function translateWord(word) {
    word = normalizeWord(word)
    let result = word
    for (var key in emojis) {
        if (emojis.hasOwnProperty(key)) {
            let emoji = emojis[key],
                keywords = emoji.keywords || []
            if (keywords.indexOf(word) !== -1) {
                result = emoji.char
                break
            }
        }
    }

    return result
}

function normalizeWord(word) {
    while (SYMBOLS.indexOf(word[0]) !== -1) {
        word = word.slice(1, word.length)
    }

    while (SYMBOLS.indexOf(word[word.length - 1]) !== -1) {
        word = word.slice(0, word.length - 1)
    }

    // plural?
    if (word.length > 2 && word[word.length - 1] == 's') {
        word = word.slice(0, word.length - 1)
    }

    return word
}
