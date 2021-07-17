const {readdirSync} = require('fs')

const defaultDirectories = ['atoms', 'molecules', 'organisms']

const getDirectories = source =>
  readdirSync(source, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getUniqueArray = array => Array.from(new Set(array))

module.exports = function (plop) {
  const componentDirectories = getUniqueArray([
    ...defaultDirectories,
    ...getDirectories('src/components')
  ])

  plop.setGenerator('component', {
    description: 'A stencil component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'component name'
    }, {
      type: 'list',
      name: 'destination',
      message: 'destination folder',
      choices: componentDirectories,
    }],
    actions: [{
      type: 'addMany',
      destination: '../src/components/{{destination}}/{{dashCase name}}',
      templateFiles: 'component/**/*'
    }]
  })
}
