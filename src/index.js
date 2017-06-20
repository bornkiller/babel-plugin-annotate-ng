/**
 * @description - babel-plugin-annotate-ng
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

/**
 * @description - determine whether function declare has @ngInject commend
 *
 * @param {Object} node
 *
 * @return {*}
 */
function inspectAnnotationComment(node) {
  // skip none-comment function declare
  if (!node.leadingComments) return null;

  return node.leadingComments
    .map((comment) => comment.value.trim())
    .find((comment) => comment === '@ngInject');
}

module.exports = function (babel) {
  return {
    visitor: {
      FunctionDeclaration: {
        enter(path) {
          // skip when not annotation comment
          if (!inspectAnnotationComment(path.node)) return;
        }
      }
    }
  };
};