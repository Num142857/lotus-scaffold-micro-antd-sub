const projectConfig = require('../public/project.json')
module.exports = {
  port: '22',
  host: '10.0.21.xxx',
  username: 'root',
  password: 'xxx',
  local: './build/',
  path: `/root/your_project_name/${projectConfig.name}/`,
}
