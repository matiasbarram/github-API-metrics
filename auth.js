import { Octokit } from 'octokit'
import dotenv from 'dotenv';
dotenv.config()


const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    //auth:'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'
})

export default octokit