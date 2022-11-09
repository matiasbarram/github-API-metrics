import fs from 'fs-extra'
import octokit from './auth.js'


//join all jsons file from a specific folder
export async function joinJsonsFromFolder(folder) {
    const files = await fs.readdir(`./${folder}`)
    console.log(files)


    const jsons = await Promise.all(files.map(async (file) => {
        const json = await fs.readJson('./' + folder + file)
        return json
    }))

    const joined = jsons.reduce((acc, json) => {
        if (json.items) {
            return acc.concat(json.items)
        }
        return acc.concat(json)
    }, [])

    await fs.writeJson(`./${folder}/all.json`, joined)

}

export async function writeJson(path, data) {
    try {
        await fs.writeJson(path, data)
    } catch (error) {
        console.log(error)
    }
}

async function getAllPages(pages, endpoint, OWNER, REPO, PER_PAGE) {
    return Promise.all(pages.map(async (page) => {
        const { data } = await octokit.request(endpoint, {
            owner: OWNER,
            repo: REPO,
            per_page: PER_PAGE,
            page: page
        });
        console.log('page fetched: ', page)
        return data
    }))
}

async function joinJsons(files) {
    console.log('joining jsons')

    return files.reduce((acc, json) => {
        return acc.concat(json)
    }, [])

}

export async function extractAllPages(OWNER, REPO, PER_PAGE, endpoint, path) {
    const { headers } = await octokit.request(endpoint, {
        owner: OWNER,
        repo: REPO,
        per_page: PER_PAGE,
        page: 1
    });

    const link = headers.link
    const lastPage = link.split(',').find((link) => link.includes('rel="last"')).split(';')[0].split('&page=')[1].split('>')[0]

    
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1)
    const pulls = await getAllPages(pages, endpoint, OWNER, REPO, PER_PAGE)
    const joined = await joinJsons(pulls)

    console.log('writing json')
    await writeJson(`./json/fastapi/${path}/all.json`, joined)

    console.log("all pulls done");
}