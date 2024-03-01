const Critters = require('critters');
const { join } = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');
const CryptoJS = require('crypto-js');

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
  const critters = new Critters({ path: currentFolder, inlineFonts: true });

  const files = getFiles(currentFolder);

  for (const file of files) {
    if (file.endsWith('.html')) {
      try {
        const html = fs.readFileSync(file, 'utf-8');
        const DOMBeforeCritters = parse(html);

        /*
        whole thing with "importantStyles" is a workaround for preserving the specificity 
        of applied styles in cases where both inline styles and regular CSS are used.
        */
        const uniqueImportantStyles = new Set();

        for (const style of DOMBeforeCritters.querySelectorAll('style')) {
          uniqueImportantStyles.add(style.innerHTML);
        }

        const inlined = await critters.process(html);
        const DOMAfterCritters = parse(inlined);
        const head = DOMAfterCritters.querySelector('head');

        if (head) {
          for (const linkInHead of head.querySelectorAll('link')) {
            if (
              linkInHead.attributes?.as === 'style' ||
              linkInHead.attributes?.rel === 'stylesheet'
            ) {
              linkInHead.remove();
            }
          }
        }

        const importantCSS = Array.from(uniqueImportantStyles).join('');

        if (importantCSS.length > 0) {
          const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(importantCSS));
          const inlinedStylesPath = `/assets/css/styles.${hash}.css`;

          fs.writeFileSync(join(process.cwd(), 'build', inlinedStylesPath), importantCSS);

          const body = DOMAfterCritters.querySelector('body');

          if (body) {
            body.insertAdjacentHTML(
              'beforeend',
              `<link rel="stylesheet" href="${inlinedStylesPath}" />`,
            );
          }
        }

        fs.writeFileSync(file, DOMAfterCritters.toString());
      } catch (error) {
        console.log(error);
      }
    }
  }
}

main();
