var inquirer = require('inquirer')
const util = require('lotusjs-util')
const fse = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const lotusConfig = require('../config.js')
const log = util.log

module.exports = {
  init() {
    inquirer
      .prompt([{
        type: 'input',
        name: 'name',
        message: '给你的项目取个名字吧',
      }])
      .then(async function (answers) {
        for (let index = 0; index < lotusConfig.files.length; index++) {
          const filePath = lotusConfig.files[index]
          let basePath = path.resolve(__dirname, '../../' + filePath)
          let targetPath = process.cwd() + '/' + filePath
          try {
            await fse.copy(basePath, targetPath)
            log.info('success:', filePath, '------>', targetPath)
          } catch (error) {
            log.warn('warn:', filePath, '------>', targetPath)
            log.warn(error)
          }
        }
        try {
          let projectConfig = {}
          projectConfig.name = answers.name
          projectConfig.prefix = `/${answers.name}/`
          projectConfig.main = `/${answers.name}/main.js`
          projectConfig.store = `/${answers.name}/store.js`
          let project = await fse.writeJson(`${process.cwd()}/public/project.json`, projectConfig, {
            spaces: 2
          })
        } catch (error) {
          log.warn('project.json写入失败', error)
        }

        let packageConfig
        // 名字
        try {
          packageConfig = await fse.readJson(`${process.cwd()}/package.json`)
          packageConfig.name = answers.name
        } catch (error) {
          log.warn('package读取失败', error)
        }
        let gitignore = `
# dependencies
/node_modules

# testing
/coverage

# production
/build`
        try {
          await fse.outputFile(`${process.cwd()}/.gitignore`, gitignore)
          log.info('.gitignore 写入成功')
        } catch (error) {
          log.warn('.gitignore 写入失败', error)
        }

        try {
          await fse.writeJson(`${process.cwd()}/package.json`, packageConfig, {
            spaces: 2
          })
          log.info('脚手架生成完毕')
          process.exit(0)
        } catch (error) {
          process.exit(1)
          log.warn('脚手架生成失败', error)
        }
      })
  }
}
