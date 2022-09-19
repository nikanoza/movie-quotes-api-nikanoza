import path from 'path'
import SwaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Movie Quotes',
}

const swaggerDocument = YAML.load(path.join(__dirname, '../config/swagger.yaml'))
export default [SwaggerUI.serve , SwaggerUI.setup(swaggerDocument, options)]