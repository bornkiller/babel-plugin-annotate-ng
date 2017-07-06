/**
 * @description - babel-plugin-annotate-ng annotate Function declare unit test
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

const path = require('path');
const babel = require('babel-core');
const annotate = require('../src');
const babelOptions = {
  presets: [],
  plugins: [annotate],
  babelrc: false
};

describe('babel-plugin-annotate-ng Function Declare', function () {
  it('ExportNamedDeclare', function () {
    const fixture = path.resolve(__dirname, '../__fixture__/Function/showcase.controller.js');
    const { code } = babel.transformFileSync(fixture, babelOptions);

    expect(code).toMatchSnapshot();
  });

  it('ExportDefaultDeclaration', function () {
    const fixture = path.resolve(__dirname, '../__fixture__/Function/butterfly.controller.js');
    const { code } = babel.transformFileSync(fixture, babelOptions);

    expect(code).toMatchSnapshot();
  });
});

describe('babel-plugin-annotate-ng Inline Function Declare', function () {
  it('ExportNamedDeclare', function () {
    const fixture = path.resolve(__dirname, '../__fixture__/Function/showcase-inline.controller.js');
    const { code } = babel.transformFileSync(fixture, babelOptions);

    expect(code).toMatchSnapshot();
  });

  it('ExportDefaultDeclaration', function () {
    const fixture = path.resolve(__dirname, '../__fixture__/Function/butterfly-inline.controller.js');
    const { code } = babel.transformFileSync(fixture, babelOptions);

    expect(code).toMatchSnapshot();
  });
});
