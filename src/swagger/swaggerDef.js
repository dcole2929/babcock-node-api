import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import pkg from '../../package.json';

const loadYaml = file => {
  const filePath = path.resolve(path.join(__dirname, file));
  return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
};

export default Object.assign(
  {
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
      contact: {
        name: pkg.author,
      },
      license: {
        name: pkg.license,
      },
    },
  },
  loadYaml('./spec.yaml')
);
