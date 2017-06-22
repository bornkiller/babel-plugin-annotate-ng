/**
 * @description - babel-plugin-annotate-ng
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const injector = require('./injector');
const DeclarationVisitor = require('./visitor');
const radar = require('./radar');

module.exports = function ({ types }) {
  return {
    visitor: {
      'ExportNamedDeclaration|ExportDefaultDeclaration': {
        enter(path) {
          const comments = radar.inspectExportAnnotationComment(path);

          // skip when not export Function or Class
          if (types.isFunctionDeclaration(path.node.declaration)) {
            if (radar.determineAnnotationComment(comments)) {
              injector.injectFunctionDeclare(path.get('declaration'), types);
            } else {
              path.traverse(DeclarationVisitor, { types: types });
            }

            return;
          }

          if (types.isClassDeclaration(path.node.declaration)) {
            if (radar.determineAnnotationComment(comments)) {
              injector.injectClassDeclare(path.get('declaration'), types);
            } else {
              path.traverse(DeclarationVisitor, { types: types });
            }
          }
        }
      }
    }
  };
};