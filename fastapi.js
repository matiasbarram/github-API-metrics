import fs from 'fs-extra'
import octokit from './auth.js'
import { joinJsonsFromFolder, writeJson, extractAllPages } from './helper.js'


const OWNER = "tiangolo";
const REPO = "fastapi";
const PER_PAGE = 100;


async function allIssues() {

    extractAllPages(OWNER, REPO, PER_PAGE, 'GET /repos/{owner}/{repo}/issues?state=all', 'issues')
}

//allIssues()

async function allPulls() {
    extractAllPages(OWNER, REPO, PER_PAGE, "GET /repos/{owner}/{repo}/pulls?state=all", 'pulls')
}

//allPulls()


async function general() {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: OWNER,
        repo: REPO
    });
    await writeJson(`./json/fastapi/general.json`, data)
    console.log("general done");
}

//await general()

async function languages() {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}/languages", {
        owner: OWNER,
        repo: REPO
    });
    await writeJson(`./json/fastapi/languages.json`, data)
    console.log("languages done");
}

//await languages()

async function contributors() {
    extractAllPages(OWNER, REPO, PER_PAGE, "GET /repos/{owner}/{repo}/contributors", 'contributors')
}

// await contributors()


async function releases(){
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/releases', {
        owner: OWNER,
        repo: REPO  
      })
      await writeJson(`./json/fastapi/releases.json`, data)
}


await releases()