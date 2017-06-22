/**
 * @description - babel-plugin-annotate-ng inline visitor
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const radar = require('./radar');
const injector = require('./injector');

module.exports = {
  ClassDeclaration: {
    enter(path) {
      if (radar.determineAnnotationComment(radar.inspectClassAnnotationComment(path))) {
        injector.injectInlineClassDeclare(path, this.types);
      }
    }
  },
  FunctionDeclaration: {
    enter(path) {
      if (radar.determineAnnotationComment(radar.inspectFunctionAnnotationComment(path))) {
        injector.injectInlineFunctionDeclare(path, this.types);
      }
    }
  }
};