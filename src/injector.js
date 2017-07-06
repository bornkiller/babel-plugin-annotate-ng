/**
 * @description - babel-plugin-annotate-ng annotate implement
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const types = require('babel-types');

module.exports = {
  injectFunctionDeclaration,
  injectClassDeclaration
};

/**
 * @description - inject Function DI annotation
 *
 * @param path - Export FunctionDeclaration
 */
function injectFunctionDeclaration(path) {
  const { id, params } = path.node;
  const parent = path.findParent((path) => (types.isExportNamedDeclaration(path.node) || types.isExportDefaultDeclaration(path.node)));

  path.node.leadingComments = null;
  parent.node.leadingComments = null;

  parent.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));

  types.isExportDefaultDeclaration(parent.node) ?
    parent.insertBefore(types.exportDefaultDeclaration(path.node)) :
    parent.insertBefore(types.exportNamedDeclaration(path.node, []));

  parent.remove();
}

/**
 * @description - inject Class DI annotation
 *
 * @param path - Export ClassDeclaration
 */
function injectClassDeclaration(path) {
  const id = path.node.id;
  const constructor = path.node.body.body.find((ClassMethod) => ClassMethod.kind === 'constructor');
  const params = constructor.params;
  const parent = path.findParent((path) => (types.isExportNamedDeclaration(path.node) || types.isExportDefaultDeclaration(path.node)));

  path.node.leadingComments = null;
  constructor.leadingComments = null;
  parent.node.leadingComments = null;

  parent.insertBefore(types.expressionStatement(types.assignmentExpression(
    '=',
    types.MemberExpression(id, types.identifier('$inject')),
    types.arrayExpression(params.map((identifier) => types.stringLiteral(identifier.name)))
  )));

  types.isExportDefaultDeclaration(parent.node) ?
    parent.insertBefore(types.exportDefaultDeclaration(path.node)) :
    parent.insertBefore(types.exportNamedDeclaration(path.node, []));

  parent.remove();
}