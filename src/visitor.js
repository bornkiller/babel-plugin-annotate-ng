/**
 * @description - babel-plugin-annotate-ng inline visitor
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const radar = require('./radar');
const injector = require('./injector');

module.exports = {
  FunctionDeclaration: {
    enter(path) {
      if (radar.determineAnnotationComment(radar.inspectFunctionAnnotationComment(path))) {
        injector.injectFunctionDeclare(path, this.types);
      }
    }
  },
  ClassDeclaration: {
    enter(path) {
      if (radar.determineAnnotationComment(radar.inspectClassAnnotationComment(path))) {
        injector.injectClassDeclare(path, this.types);
      }
    }
  }
};