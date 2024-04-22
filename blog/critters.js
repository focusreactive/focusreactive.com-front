const Critters = require('critters');
const { join } = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');
const CryptoJS = require('crypto-js');
const { minify } = require('csso');

// Recursive function to get files
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(name);
    }
  }
  return files;
}

async function main() {
  const folder = process.argv[2];
  const currentFolder = join(process.cwd(), folder);
  const files = getFiles(currentFolder);
  const isLoggingEnabled = process.argv[3];

  const critters = new Critters({
    path: currentFolder,
    fonts: true,
    logLevel: isLoggingEnabled ? 'debug' : 'silent',
  });

  function logger(textNode) {
    if (isLoggingEnabled) {
      console.log(textNode);
    }
  }

  for (const file of files) {
    if (file.endsWith('.html')) {
      try {
        logger('Found html file. Reading the file');
        const html = fs.readFileSync(file, 'utf-8');
        logger('Parse html');
        const DOMBeforeCritters = parse(html);

        /*
        whole thing with "importantStyles" is a workaround for preserving the specificity 
        of applied styles in cases where both inline styles and regular CSS are used.
        */
        const uniqueImportantStyles = new Set();

        for (const style of DOMBeforeCritters.querySelectorAll('style')) {
          logger('Found inline style');
          uniqueImportantStyles.add(style.innerHTML);
        }

        logger('Inline critical styles from attached stylesheets');
        const inlined = await critters.process(html);
        logger('Parse resulting html');
        const DOMAfterCritters = parse(inlined);
        const importantCSS = Array.from(uniqueImportantStyles).join('');
        const body = DOMAfterCritters.querySelector('body');

        if (importantCSS.length > 0) {
          logger('There are styles that need to be merged in stylesheet');
          const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(importantCSS));
          const inlinedStylesPath = `/assets/css/styles.${hash}.css`;
          const attachedStylesheets = [];

          logger('Collect links of all attached stylesheets and remove them from html');
          for (const linkInHead of DOMAfterCritters.querySelectorAll('link')) {
            if (
              linkInHead.attributes?.as === 'style' ||
              linkInHead.attributes?.rel === 'stylesheet'
            ) {
              attachedStylesheets.push(linkInHead.getAttribute('href'));

              linkInHead.remove();
            }
          }

          const stylesheets = [];
          logger('Read all stylesheets');
          for (const stylesheet of attachedStylesheets) {
            const stylesheetStyles = fs.readFileSync(join(process.cwd(), 'build', stylesheet));

            stylesheets.push(stylesheetStyles);
          }

          logger(
            'Merge all stylesheets in one, add importantCSS in the end to persist specificity',
          );
          const allInOne = stylesheets.join('') + importantCSS;

          logger('Minify and save result');
          fs.writeFileSync(join(process.cwd(), 'build', inlinedStylesPath), minify(allInOne).css);

          if (body) {
            logger('Attach our custom css file to html');
            body.insertAdjacentHTML(
              'beforeend',
              `<link rel="stylesheet" href="${inlinedStylesPath}" />`,
            );
          }
        }

        if (body) {
          logger('Not related to critical. Make sure all scripts have "defer"');
          const scripts = body.querySelectorAll('script');

          scripts.forEach((script) => {
            if (!script.getAttribute('defer')) {
              script.setAttribute('defer', 'defer');
            }
          });
        }

        logger('Save resulting html file');
        fs.writeFileSync(file, DOMAfterCritters.toString());
      } catch (error) {
        console.log(error);
      }
    }
  }
}

main();
