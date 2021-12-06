const github = require("@actions/github");
const core = require('@actions/core');

const accessToken = process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(accessToken);

async function run() {
    const action = core.getInput('action');
    const labelName = core.getInput('name');
    const labelDescription = core.getInput('description');
    let labelColor = core.getInput('color');

    // If the color of a label has a # sign, remove it
    if (labelColor[0] === "#") {
        labelColor = labelColor.slice(1);
    }

    if (action === "create") {
        const params = {
            ...github.context.repo,
            name: labelName,
            color: labelColor,
            description: labelDescription,
        };

        try {
            console.log(`[Action] Creating Label: ${labelName}`);
            await octokit.rest.issues.createLabel(params);
        } catch (error) {
            core.setFailed(error.message);
        }
    } else if (action === "delete") {
        const params = {
            ...github.context.repo,
            name: labelName
        };

        try {
            console.log(`[Action] Deleting Label: ${labelName}`);
            await octokit.rest.issues.deleteLabel(params);
        } catch (error) {
            core.setFailed(error.message);
        }
    } else {
      core.setFailed(`Unknown action type '${action}'. Please use 'create' or 'delete'.`);
    }
}

run();
