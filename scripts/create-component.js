const { camelCase: camelify, capitalize, kebabCase } = require("lodash");
const path = require("path");

function capitalCamelCase(string) {
  return kebabCase(string)
    .split("-")
    .map((fragment) => capitalize(fragment))
    .join("");
}

const fs = require("fs").promises;
const CLI_FLAGS = require("minimist")(process.argv);

const INIT_CWD = process.env.INIT_CWD;

const COMPONENTS = CLI_FLAGS._.slice(2).map((component) => {
  const componentName = capitalCamelCase(component);

  return {
    componentName,
    camelCase: camelify(componentName),
    directory: path.resolve(`${INIT_CWD}/${componentName}`),
    kebabcase: kebabCase(component),
  };
});

const TEMPLATE_DIRECTORY = `${process.cwd()}/scripts/component-templates`;

async function getTemplates() {
  const files = await fs.readdir(TEMPLATE_DIRECTORY);

  return files;
}

async function createFolders() {
  const createDirectoryPromises = COMPONENTS.map(({ directory }) => fs.mkdir(directory));

  try {
    await Promise.all(createDirectoryPromises);
  } catch (error) {
    console.log(`Cannot create directory, try running with "--help" for usage info`);
    console.error(error);
    process.exit(1);
  }
}

async function createFiles(templates) {
  const readTemplatesPromises = templates.map((template) => {
    try {
      return fs.readFile(`${TEMPLATE_DIRECTORY}/${template}`, "utf8");
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

  let templateContents = [];

  try {
    templateContents = await Promise.all(readTemplatesPromises);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  const writeFilePromises = Array(COMPONENTS.length)
    .fill()
    .flatMap((_, componentIndex) => {
      const filenames = templates.map((template) => {
        const { camelCase, componentName, kebabcase } = COMPONENTS[componentIndex];

        return template
          .replaceAll("__componenT__", camelCase)
          .replaceAll("__component__", kebabcase)
          .replaceAll("__Component__", componentName);
      });

      const files = templateContents.map((template) => {
        const { camelCase, componentName, kebabcase } = COMPONENTS[componentIndex];

        return template
          .replaceAll("__componenT__", camelCase)
          .replaceAll("__component__", kebabcase)
          .replaceAll("__Component__", componentName);
      });

      return files.flatMap((file, fileIndex) =>
        fs.writeFile(`${COMPONENTS[componentIndex].directory}/${filenames[fileIndex]}`, file),
      );
    });

  try {
    await Promise.all(writeFilePromises);

    COMPONENTS.forEach(({ componentName, directory }) => {
      console.info(`Component "${componentName}" boilerplate created at ${directory}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function main() {
  if (CLI_FLAGS.help) {
    showHelp();
    process.exit(0);
  }

  if (!INIT_CWD.includes("components")) {
    console.error("Ran while not under a components directory, please cd to ./components");
    process.exit(1);
  }

  const templates = await getTemplates();

  await createFolders();
  await createFiles(templates);
}

function showHelp() {
  console.info(`
  createComponent
  ---------------
  
  Creates a component directory, with boilerplate files.
  
  Usage:
  
  npm run createComponent -- componentname [...componentname] [--type] [--help]
  
  Params
  ------
  
    componentName<string>:
      The kebab-case name(s) of the component you want to create
  
  Flags
  -----
  
    help:
      Shows this help
  
  Examples
  --------
  
    Create a component called MyDropdown
  
      npm run createComponent -- my-dropdown
  `);
}

main();
