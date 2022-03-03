import fsExtra from 'fs-extra';
import fs from 'fs';
import initPromptSync from 'prompt-sync';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import sortPackageJson from 'sort-package-json';
import templatePackageJson from './package-template/package.json';
import prettier from 'prettier';
import chalk from 'chalk';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prompt = initPromptSync();

const templatePath = './scripts/package-template';
const packagesFolder = './packages';

(async () => {
    const packageFolderName =
        process.argv?.[2] || prompt(chalk.bold('Enter package name (without @trezor prefix): '));
    if (!packageFolderName) process.exit(1);

    const packageName = `@trezor/${packageFolderName}`;
    const packagePath = `${packagesFolder}/${packageFolderName}`;

    const workspaces = Object.keys(
        JSON.parse(JSON.parse(execSync('yarn workspaces --json info').toString()).data),
    );

    if (fs.existsSync(packagePath)) {
        console.error(
            chalk.bold.red(`Folder ${packagePath} already exists! Please choose different name.`),
        );
        process.exit(1);
    }

    if (workspaces.includes(packageName)) {
        console.error(
            chalk.bold.red(`Package ${packageName} already exists! Please choose different name.`),
        );
        process.exit(1);
    }

    const packageJson = {
        ...templatePackageJson,
        name: packageName,
    };

    const prettierConfigPath = await prettier.resolveConfigFile();
    const prettierConfig = {
        ...(await prettier.resolveConfig(prettierConfigPath)),
        parser: 'json',
    };

    const serializeConfig = config =>
        prettier.format(JSON.stringify(config).replace(/\\\\/g, '/'), prettierConfig);

    try {
        fsExtra.copySync(templatePath, packagePath);
        fs.writeFileSync(`${packagePath}/package.json`, serializeConfig(packageJson));
    } catch (error) {
        console.error(error);
        console.error(chalk.bold.red('Package creation failed.'));
        process.exit(1);
    }

    console.log(chalk.bold.green(`Package ${packageName} successfully created!`));
})();
