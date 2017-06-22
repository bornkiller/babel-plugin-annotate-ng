/**
 * @description - babel-plugin-annotate-ng inspect comments
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

module.exports = {
  inspectExportAnnotationComment,
  inspectFunctionAnnotationComment,
  inspectClassAnnotationComment,
  determineAnnotationComment
};


/**
 * @description - collect ExportNamedDeclaration / ExportDefaultDeclaration comments
 *
 * @param {Object} path
 *
 * @return {*}
 */
function inspectExportAnnotationComment(path) {
  return path.node.leadingComments;
}

/**
 * @description - collect Function declaration comments
 *
 * @param {Object} path
 *
 * @return {*}
 */
function inspectFunctionAnnotationComment(path) {
  return path.node.leadingComments;
}

/**
 * @description - determine Class declare @ngInject comment
 *
 * @param {Object} path - ExportNamedDeclaration / ExportDefaultDeclaration
 *
 * @return {*}
 */
function inspectClassAnnotationComment(path) {
  let constructor = path.node.body.body.find((ClassMethod) => ClassMethod.kind === 'constructor');
  let prevLeadingComments = path.node.leadingComments || [];
  let crossLeadingComments = constructor.leadingComments || [];

  return [...prevLeadingComments, ...crossLeadingComments];
}

/**
 * @description - determine @ngInject within
 *
 * @param {Array} comments
 *
 * @return {boolean}
 */
function determineAnnotationComment(comments = []) {
  return comments.map((comment) => comment.value.trim())
    .some((comment) => comment === '@ngInject');
}
