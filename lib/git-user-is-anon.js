/**
 * Ensure that the name & email used in Git commit messages are "anonymous"(!)
 *
 * @author NDF, 08-Nov-2020.
 *
 * @see https://npmjs.com/package/husky#supported-hooks
 * @see https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node
 */

const exec = require('child_process').exec;
// const exists = require('command-exists')

(async () => {
  process.exit(await gitUserIsAnon() ? 0 : 1);
})();

function isAnonymous (stdout) {
  return /Anon(ymous)?/i.test(stdout);
}

async function gitUserIsAnon () {
  try {
    const nameResult = await gitUserNameIsAnon();
    const mailResult = await gitUserEmailIsAnon();

    console.warn('>', nameResult);
    console.warn('>', mailResult);
    return true;
  } catch (err) {
    console.error('>', err);
    return false;
    // process.exit(1);
  }
}

async function gitUserNameIsAnon () {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const stdout = await execPromise('git config --get user.name');

      if (isAnonymous(stdout)) {
        resolve(`gitUserNameIsAnon: OK (${stdout})`);
      } else {
        reject(`gitUserNameIsAnon: Fail (${stdout})`);
      }
    } catch (err) {
      reject(err);
    }
  });
  return promise;
}

async function gitUserEmailIsAnon () {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const stdout = await execPromise('git config --get user.email');

      if (isAnonymous(stdout)) {
        resolve(`gitUserEmailIsAnon: OK (${stdout})`);
      } else {
        reject(`gitUserEmailIsAnon: Fail (${stdout})`);
      }
    } catch (err) {
      reject(err);
    }
  });
  return promise;
}

async function execPromise (command, options = null) {
  const promise = new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
          console.error('stderr:', stderr);
          reject(error);
      }
      resolve(stdout.trim());
    });
  });
  return promise;
}
