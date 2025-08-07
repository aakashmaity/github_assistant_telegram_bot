import { App } from "@octokit/app";
import { config } from "../config/index.js";
import { Octokit } from "@octokit/rest";

const app = new App({
    appId: config.github.appId,
    privateKey: config.github.githubPrivateKey,
    webhooks: {
        secret: config.github.webhookSecret
    },
});

const octokit = new Octokit({
    auth: config.github.token
})


// async function getOctokit() {
//     if(octokitInstance){
//         return octokitInstance;
//     }
//     octokitInstance = await app.getInstallationOctokit(config.github.installationId);
//     // console.log("Instance->", octokitInstance)
//     return octokitInstance;
// }
export {app, octokit};