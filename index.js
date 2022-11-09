import fs from 'fs-extra'
import octokit from './auth.js'

async function popularRepos(language = '') {
    // get top 100 most popular python repositories
    const { data } = await octokit.request('GET /search/repositories', {
        q: `language:${language} sort:stars`,
        per_page: 100,
    })

    console.log(language + ' done')
    await fs.writeJson(`json/language/${language}.json`, data)
}


//await joinJsonsFromFolder('json/language/')


//await popularRepos('python')

/*
const languages = ['javascript', 'python', 'c++', 'java']
languages.forEach(async (language) => {
    await popularRepos(language)
})
*/

