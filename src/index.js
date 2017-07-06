/**
 * @description - babel-plugin-annotate-ng
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const injector = require('./injector');
const radar = require('./radar');

module.exports = function ({ types }) {
  return {
    visitor: {
      'ExportNamedDeclaration|ExportDefaultDeclaration': {
        enter(path) {
          const ExportsComments = radar.inspectExportAnnotationComment(path);
          const declaration = path.get('declaration');

          // skip when not export Function or Class
          if (types.isFunctionDeclaration(declaration)) {
            const comments = [...ExportsComments, ...radar.inspectFunctionAnnotationComment(declaration)];

            if (radar.determineAnnotationComment(comments)) {
              injector.injectFunctionDeclaration(declaration);
            }

            return;
          }

          if (types.isClassDeclaration(declaration)) {
            const comments = [...ExportsComments, ...radar.inspectClassAnnotationComment(declaration)]

            if (radar.determineAnnotationComment(comments)) {
              injector.injectClassDeclaration(declaration);
            }
          }
        }
      }
    }
  };
};