/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const prog = require('caporal')

const readTemplate = file =>
  fs.readFileSync(path.join(__dirname, 'templates', file)).toString()

const createFeatureFolder = feature => {
  const featureFolder = path.join(__dirname, '..', 'src', feature)

  if (!fs.existsSync(featureFolder)) {
    fs.mkdirSync(featureFolder)
    fs.mkdirSync(path.join(featureFolder, 'components'))
    fs.mkdirSync(path.join(featureFolder, 'containers'))
    fs.mkdirSync(path.join(featureFolder, 'pages'))

    const template = readTemplate('index.jsx.tpl')
    fs.writeFileSync(path.join(featureFolder, 'index.jsx'), template)
  }

  return featureFolder
}

const createPage = (feature, page) => {
  const featureFolder = createFeatureFolder(feature)
  const pageFile = path.join(featureFolder, 'pages', `${page}.jsx`)
  const pageIndexFile = path.join(featureFolder, 'pages', `index.jsx`)

  if (fs.existsSync(pageFile)) {
    console.error(
      `You already have a ${chalk.bold(page)} page in the feature ${chalk.bold(
        feature
      )} already exists`
    )
    process.exit(1)
  }

  if (!fs.existsSync(pageIndexFile)) {
    const template = readTemplate('pages/index.jsx.tpl')
    const content = template.replace(/PAGE_NAME/g, page)
    fs.writeFileSync(pageIndexFile, content)
  }

  const template = readTemplate('pages/page.jsx.tpl')
  const content = template.replace(/PAGE_NAME/g, page)

  fs.writeFileSync(pageFile, content)
}

const createContainer = (feature, container) => {
  const featureFolder = createFeatureFolder(feature)
  const containerFile = path.join(
    featureFolder,
    'containers',
    `${container}.jsx`
  )

  if (fs.existsSync(containerFile)) {
    console.error(
      `You already have a ${chalk.bold(
        container
      )} container in the feature ${chalk.bold(feature)} already exists`
    )
    process.exit(1)
  }

  const template = readTemplate('containers/container.jsx.tpl')
  const content = template.replace(/CONTAINER_NAME/g, container)

  fs.writeFileSync(containerFile, content)
}

const createComponent = (feature, component) => {
  const featureFolder = createFeatureFolder(feature)
  const componentFolder = path.join(featureFolder, 'components', component)

  if (fs.existsSync(componentFolder)) {
    console.error(
      `You already have a ${chalk.bold(
        component
      )} component in the feature ${chalk.bold(feature)}`
    )
    process.exit(1)
  }

  const jsTemplate = readTemplate('components/component/index.js.tpl')
  const jsContent = jsTemplate.replace(/COMPONENT_NAME/g, component)

  fs.mkdirSync(componentFolder)
  fs.writeFileSync(path.join(componentFolder, 'index.jsx'), jsContent)

  const cssTemplate = readTemplate('components/component/index.css.tpl')
  const cssContent = cssTemplate.replace(/COMPONENT_NAME/g, component)

  fs.writeFileSync(path.join(componentFolder, 'index.css'), cssContent)
}

prog
  .version('1.0.0')
  .command('create')
  .argument(
    '<type>',
    'type of component to create',
    /^component|page|container$/,
    'component'
  )
  .argument(
    '<feature>',
    'the feature in which to create the component',
    /^[a-z]+.*$/
  )
  .argument('<name>', 'name of the component', /^[A-Z]+.*$/)
  .action(({ feature, name, type }) => {
    if (type === 'component') {
      createComponent(feature, name)
    } else if (type === 'container') {
      createContainer(feature, name)
    } else if (type === 'page') {
      createPage(feature, name)
    }
  })

prog.parse(process.argv)
