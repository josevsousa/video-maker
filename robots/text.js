const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
    // console.log(`Recebi com sucesso o content: ${content.searchTerm}`)

    await fetchContentFromWikipedia(content) //baixa o conteudo da wikipidia
    sanitizeContent(content) // limpar o contudo 
    breakContentIntoSentences(content) // quebrar em sentenças


    async function fetchContentFromWikipedia(content) {
        // 1 Autenticação
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        // 2 Define o algoritmo
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        // 3 execulta
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm) // retorna uma promisse
        // retorna o valor
        const wikipediaContent = wikipediaResponde.get()

        content.sourceContentOriginal = wikipediaContent.content
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
       
        content.sourceContentSanitized = withoutDatesInParentheses

         function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n')
      
            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
              if (line.trim().length === 0 || line.trim().startsWith('=')) {
                return false
              }
      
              return true
            })
      
            return withoutBlankLinesAndMarkdown.join(' ')
          }
    }
      
    function removeDatesInParentheses(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }

    function breakContentIntoSentences(content) {
        content.sentences = []

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
          content.sentences.push({
            text: sentence,
            keywords: [],
            images: []
          })
        })
    }
      

}   

module.exports = robot