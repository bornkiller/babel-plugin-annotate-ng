/**
 * @description - babel-plugin-annotate-ng annotate implement
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

module.exports = {
  inspectAnnotationComment,
  injectFunctionDeclare,
  injectClassDeclare,
  injectInlineClassDeclare
};

/**
 * @description - determine whether function declare has @ngInject commend
 *
 * @param {Object} path
 * @param types
 *
 * @return {*}
 */
function inspectAnnotationComment(path, types) {
  // skip none-comment function declare
  if (!path.node.leadingComments) return null;

  return path.node.leadingComments
    .map((comment) => comment.value.trim())
    .find((comment) => comment === '@ngInject');
}

function injectFunctionDeclare(path, types) {
  const { id, params } = path.node.declaration;

  path.node.leadingComments = null;
  path.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));
}

function injectClassDeclare(path, types) {
  const declaration = path.node.declaration;
  const params = declaration.body.body.find((ClassMethod) => ClassMethod.kind === 'constructor').params;

  path.node.leadingComments = null;
  path.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(declaration.id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));
}

function injectInlineClassDeclare(path, types) {
  const id = path.node.id;
  const params = path.node.body.body.find((ClassMethod) => ClassMethod.kind === 'constructor').params;
  const parent = path.findParent((path) => (types.isExportNamedDeclaration(path.node) || types.isExportDefaultDeclaration(path.node)));

  path.node.leadingComments = null;
  parent.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));
}