const readline = require('readline-sync')
const robots = {
    text: require('./robots/text.js')
}

async function start(){

    // content que recebe todos os dados
    const content = {}

    content.searchTerm = askAndReturnSearchTerm() // add o item searchTerm ao objeto content
    content.prefix = askAndReturnPrefix() // add o item prefix ao objeto content

    await robots.text(content)

    // Tipo de input que mostra texto no label do input 
    function askAndReturnSearchTerm() {
        return readline.question('Type a wikipedia serach term: ')
    }

    function askAndReturnPrefix() {
        // array de prefixes
        const prefixes = ['Who is', 'what is', 'The history of']

        //mostra um menu com o array prefixes e abre um menu
        const selectPrefixIndex = readline.keyInSelect(prefixes, 'Choose one options: ')  //retorna o index do valor selecionado do prefixes
        const selectPrefixTest = prefixes[selectPrefixIndex] // guarda a resposta 
        
        return selectPrefixTest // retorna a resposta
    }
    console.log(content)
}

start()