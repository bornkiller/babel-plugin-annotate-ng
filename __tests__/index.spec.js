/**
 * @description - babel-plugin-annotate-ng unit test
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const annotate = require('../src');
// fixture
const template = fs.readFileSync(path.resolve(__dirname, '../__fixture__/redux.controller.js'), { encoding: 'utf8' });

describe('annotate-ng plugin', function () {
  it('class annotate', function () {
    const { code } = babel.transform(template, { plugins: [annotate] });

    expect(code).toMatchSnapsahot();
  });

  it('function annotate', function () {

  });
});
