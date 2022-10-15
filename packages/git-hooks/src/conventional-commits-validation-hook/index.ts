import fs from 'fs';

export function execute() {
    try {
        const conventionalCommitMessageRegExp: RegExp =
            /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test){1}(\([\s\w\-\.]+\))?(!)?: ([\w ])+([\s\S]*)/g;
        let exitCode = 0;
        const commitMsgFile = process.argv[2];
        const message: string = fs.readFileSync(commitMsgFile, 'utf8');
        const isValid: boolean = conventionalCommitMessageRegExp.test(message);

        if (!isValid) {
            console.log('Cannot commit: the commit message does not comply with conventional commits standards.');
            exitCode = 1;
        }

        process.exit(exitCode);
    } catch (error) {
        console.error(`Cannot commit: unexpected error occurred: ${error.message}`);
        process.exit(1);
    }
}