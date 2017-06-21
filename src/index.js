/**
 * @description - babel-plugin-annotate-ng
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

/**
 * @description - determine whether function declare has @ngInject commend
 *
 * @param {Object} path
 * @param types
 *
 * @return {*}
 */
function inspectAnnotationExports(path, types) {
  // skip none-comment function declare
  if (!path.node.leadingComments) return null;

  return path.node.leadingComments
    .map((comment) => comment.value.trim())
    .find((comment) => comment === '@ngInject');
}

function annotateFunctionDeclare(path, types) {
  const { id, params } = path.node.declaration;

  path.node.leadingComments = null;
  path.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));
}

function annotateClassDeclare(path, types) {
  const declaration = path.node.declaration;
  const params = declaration.body.body.find((ClassMethod) => ClassMethod.kind === 'constructor').params;

  path.node.leadingComments = null;
  path.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(declaration.id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));
}

module.exports = function ({ types }) {
  return {
    visitor: {
      'ExportNamedDeclaration|ExportDefaultDeclaration': {
        enter(path) {
          // skip when not annotation comment
          if (inspectAnnotationExports(path, types)) {
            if (types.isFunctionDeclaration(path.node.declaration)) {
              annotateFunctionDeclare(path, types);
            }

            if (types.isClassDeclaration(path.node.declaration)) {
              annotateClassDeclare(path, types);
            }
          }
        }
      }
    }
  };
};