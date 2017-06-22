/**
 * @description - babel-plugin-annotate-ng annotate implement
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

module.exports = {
  injectFunctionDeclare,
  injectClassDeclare
};

/**
 * @description - inject Function DI annotation
 *
 * @param path
 * @param types
 */
function injectFunctionDeclare(path, types) {
  const { id, params } = path.node;
  const parent = path.findParent((path) => (types.isExportNamedDeclaration(path.node) || types.isExportDefaultDeclaration(path.node)));

  path.node.leadingComments = null;
  parent.node.leadingComments = null;
  parent.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));
}

/**
 * @description - inject Class DI annotation
 *
 * @param path
 * @param types
 */
function injectClassDeclare(path, types) {
  const id = path.node.id;
  const params = path.node.body.body.find((ClassMethod) => ClassMethod.kind === 'constructor').params;
  const parent = path.findParent((path) => (types.isExportNamedDeclaration(path.node) || types.isExportDefaultDeclaration(path.node)));

  path.node.leadingComments = null;
  parent.node.leadingComments = null;
  parent.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));
}