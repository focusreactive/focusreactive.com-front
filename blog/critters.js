const Critters = require('critters');
const { join } = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');

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
  const critters = new Critters({ path: currentFolder });

  const files = getFiles(currentFolder);

  for (const file of files) {
    if (file.endsWith('.html')) {
      try {
        const html = fs.readFileSync(file, 'utf-8');
        const DOMBeforeCritters = parse(html);
        const uniqueExtractedStyles = new Set();

        for (const style of DOMBeforeCritters.querySelectorAll('style')) {
          uniqueExtractedStyles.add(style.innerHTML);

          style.remove();
        }

        const inlined = await critters.process(html);
        const DOMAfterCritters = parse(inlined);
        const head = DOMAfterCritters.querySelector('head');

        if (head && uniqueExtractedStyles.size > 0) {
          head.insertAdjacentHTML(
            'beforeend',
            `<style>${Array.from(uniqueExtractedStyles).join('')}</style>`,
          );
        }

        for (const link of DOMAfterCritters.querySelectorAll('link')) {
          if (link.attributes?.as === 'style' || link.attributes?.rel === 'stylesheet') {
            link.remove();
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
