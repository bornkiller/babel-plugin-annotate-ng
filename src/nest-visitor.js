/**
 * @description - babel-plugin-annotate-ng inline visitor
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const annotate = require('./annotate');

module.exports = {
  ClassDeclaration: {
    enter(path) {
      if (annotate.inspectAnnotationComment(path)) {
        annotate.injectInlineClassDeclare(path, this.types);
      }
    }
  },
  FunctionDeclaration: {
    enter(path) {
      if (annotate.inspectAnnotationComment(path)) {
        annotate.injectInlineFunctionDeclare(path, this.types);
      }
    }
  }
};