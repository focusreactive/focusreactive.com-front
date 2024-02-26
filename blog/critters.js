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
  const currentFolder = join(process.cwd(), 'build');
  const critters = new Critters({ path: currentFolder });

  const files = getFiles(currentFolder);

  for (const file of files) {
    if (file.endsWith('.html')) {
      try {
        const html = fs.readFileSync(file, 'utf-8');

        const inlined = await critters.process(html);

        const DOM = parse(inlined);
        const headElement = DOM.querySelector('head');

        if (headElement) {
          for (const link of DOM.querySelectorAll('link')) {
            if (link.attributes?.as === 'style') {
              headElement.insertAdjacentHTML(
                'beforeend',
                `<script></script>
                   <link rel='preload' href='${link.attributes?.href}' as='style' onload="this.onload=null;this.rel='stylesheet'"/>
                   <script></script>`,
              );

              link.remove();
            }
          }
        }

        fs.writeFileSync(file, DOM.toString());
      } catch (error) {
        console.log(error);
      }
    }
  }
}

main();
