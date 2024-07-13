const fs = require('fs');
const path = require('path');

const targetPackage = '@nuxtjs';
const nodeModulesPath = path.resolve('node_modules');

function checkDependencies(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = require(packageJsonPath);
    if (
      (packageJson.dependencies && packageJson.dependencies[targetPackage]) ||
      (packageJson.devDependencies && packageJson.devDependencies[targetPackage])
    ) {
      console.log(`${targetPackage} found in ${packageJson.name}`);
    }
  }
}

function traverseNodeModules(dirPath) {
  const directories = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const dir of directories) {
    if (dir.isDirectory()) {
      const packagePath = path.join(dirPath, dir.name);
      checkDependencies(packagePath);
      traverseNodeModules(packagePath);
    }
  }
}

traverseNodeModules(nodeModulesPath);
