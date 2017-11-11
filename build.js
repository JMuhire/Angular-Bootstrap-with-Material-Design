'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const inlineResources = require('./inline-resources');

const libName = require('./package.json').name;
const rootFolder = path.join(__dirname);
const compilationFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, 'src/lib');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'lib');
const es5OutputFolder = path.join(compilationFolder, 'lib-es5');
const es2015OutputFolder = path.join(compilationFolder, 'lib-es2015');

async function build() {
  try {
    // Copy library to temporary folder and inline html/css.
    await _relativeCopy('**/*', srcFolder, tempLibFolder);
    await inlineResources(tempLibFolder);
    console.log('Inlining succeeded.');

    // Compile to ES2015 and ES5.
    let exitCode = await Promise.all([
      ngc([ '--project', `${tempLibFolder}/tsconfig.lib.json`]), 
      ngc([ '--project', `${tempLibFolder}/tsconfig.es5.json` ])
    ]);

    const [exitCodeES2015, exitCodeES5] = exitCode;
    if (exitCodeES2015 === 0) console.log('ES2015 compilation succeeded.');
    else return;

    if (exitCodeES5 === 0) console.log('ES5 compilation succeeded.');
    else return;

    // Copy typings and metadata to `dist/` folder.
    await Promise.all([
      _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder), 
      _relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder)
    ]);
    console.log('Typings and metadata copy succeeded.');

    // Base configuration.
    const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
    const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);
    const rollupBaseInputOptions = {
      external: [
        // List of dependencies
        // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
        '@angular/core',
        '@angular/forms'
      ],
      plugins: [
        commonjs({
          include: ['node_modules/rxjs/**']
        }),
        sourcemaps(),
        nodeResolve({ jsnext: true, module: true })
      ]
    };

    const rollupBaseOutputOptions = {
      sourcemap: true,
      name: camelCase(libName),
      // ATTENTION:
      // Add any dependency or peer dependency your library to `globals` and `external`.
      // This is required for UMD bundle users.
      globals: {
        // The key here is library name, and the value is the the name of the global variable name
        // the window object.
        // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
        '@angular/core': 'ng.core',
        '@angular/forms': 'ng.forms'
      },
    };

    // UMD bundle.
    const umdInputConfig = Object.assign({}, rollupBaseInputOptions, {
      input: es5Entry,      
    });
    const umdOutputConfig = Object.assign({}, rollupBaseOutputOptions, {
      file: path.join(distFolder, `bundles`, `${libName}.umd.js`),
      format: 'umd'
    });

    // Minified UMD bundle.
    const minifiedUmdInputConfig = Object.assign({}, rollupBaseInputOptions, {
      input: es5Entry,      
      plugins: rollupBaseInputOptions.plugins.concat([uglify({})])
    });
    const minifiedUmdOutputConfig = Object.assign({}, rollupBaseOutputOptions, {      
      file: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
      format: 'umd'
    });

    // ESM+ES5 flat module bundle.
    const fesm5InputConfig = Object.assign({}, rollupBaseInputOptions, {
      input: es5Entry
    });
    const fesm5OutputConfig = Object.assign({}, rollupBaseOutputOptions, {
      file: path.join(distFolder, `${libName}.es5.js`),
      format: 'es'
    });

    // ESM+ES2015 flat module bundle.
    const fesm2015InputConfig = Object.assign({}, rollupBaseInputOptions, {
      input: es2015Entry
    });
    const fesm2015OutputConfig = Object.assign({}, rollupBaseOutputOptions, {
      file: path.join(distFolder, `${libName}.js`),
      format: 'es'
    });

    const allInputConfigs = [umdInputConfig, minifiedUmdInputConfig, fesm5InputConfig, fesm2015InputConfig];
    const allOutputConfigs = [umdOutputConfig, minifiedUmdOutputConfig, fesm5OutputConfig, fesm2015OutputConfig];

    await Promise.all(allInputConfigs.map((cfg, i) => rollup.rollup(cfg).then(bundle => bundle.write(allOutputConfigs[i]))));

    console.log('All bundles generated successfully.');

    // Copy package files
    await Promise.all([
      _relativeCopy('license.pdf', rootFolder, distFolder),
      _directCopy('src/lib/package.json', rootFolder, distFolder),
      _relativeCopy('assets/**/*', rootFolder, distFolder),
      _relativeCopy('README.md', rootFolder, distFolder)
    ]);
    console.log('Package files copy succeeded.');

  } catch(e) {
    console.error('\nBuild failed. See below for errors.\n');
    console.error(e);
    process.exit(1);
  }
}

build();

// Copy files not maintaining relative paths.
function _directCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
      if (err) reject(err);
      files.forEach(file => {
        const fileName = file.split('/')[file.split('/').length - 1];
        const origin = path.join(from, file);
        const dest = path.join(to, fileName);
        const data = fs.readFileSync(origin, 'utf-8');
        fs.writeFileSync(dest, data);
        resolve();
      })
    })
  });
}


// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
      if (err) reject(err);
      files.forEach(file => {
        const origin = path.join(from, file);
        const dest = path.join(to, file);
        const data = fs.readFileSync(origin, 'utf-8');
        _recursiveMkDir(path.dirname(dest));
        fs.writeFileSync(dest, data);
        resolve();
      })
    })
  });
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
