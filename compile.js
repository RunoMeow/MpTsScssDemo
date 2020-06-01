const fs = require('fs');
const nodeCmd = require('node-cmd');

nodeCmd.run('npm run tsc');

(function getFiles(path) {
  const files = fs.readdirSync(path);
  files.forEach(item => {
    const nowPath = path + '/' + item;
    if (fs.lstatSync(nowPath).isDirectory()) return getFiles(nowPath);

    const
      file = item.split('.'),
      type = file.pop(),
      name = file.join('.');
    if (type === 'scss') nodeCmd.get(`node node_modules/node-sass/bin/node-sass ${nowPath} -o ${path} --output-style=compressed`, () => {
      const wxssPath = `${path}/${name}`;
      fs.renameSync(`${wxssPath}.css`, `${wxssPath}.wxss`);
    });
  });
})('miniprogram/pages');