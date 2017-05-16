export default {
  classified: (state) => {
    const articlesInyear = {}
    const years = []
    state.articles.forEach((article, index) => {
      let date = new Date(article.date)
      let year = date.getFullYear()
      if (articlesInyear[year] === undefined) {
        articlesInyear[year] = []
        articlesInyear[year].push(article)
        years.push(year)
      } else {
        articlesInyear[year].push(article)
      }
    })
    return {articlesInyear, years}
  }
}
