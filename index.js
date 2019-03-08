const readline = require('readline-sync')

function start(){
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    function askAndReturnSearchTerm() {
        return readline.question('Type a wikipedia serach term: ')
    }

    function askAndReturnPrefix() {
        const prefixes = ['jose', 'aldeir', 'caue', 'Bela ']
        const selectPrefixIndex = readline.keyInSelect(prefixes, 'Choose one options: ')
        const selectPrefixTest = prefixes[selectPrefixIndex]
        
        return selectPrefixTest
    }

    console.log(content)
}

start()