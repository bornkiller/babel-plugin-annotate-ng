# babel-plugin-annotate-ng
![Build Status](https://img.shields.io/travis/bornkiller/babel-plugin-annotate-ng/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/babel-plugin-annotate-ng/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/babel-plugin-annotate-ng?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/babel-plugin-annotate-ng.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/babel-plugin-annotate-ng/dev-status.svg?style=flat)

Annotate angular v1 DI dependency.

## Usage
Add comment above export:

```javascript
/* @ngInject */
export default class MonitorController {
  constructor($q, $sce, $animate) {
    this.$q = $q;
    this.$sce = $sce;
    this.$animate = $animate;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
}

/* @ngInject */
export function ShowcaseController($q, $sce, $animate) {
  this.$q = $q;
  this.$sce = $sce;
  this.$animate = $animate;

  // lifecycle method
  this.ngOnInit = ngOnInit;
  this.ngAfterViewInit = ngAfterViewInit;
  this.ngOnDestroy = ngOnDestroy;

  // function declare
  function ngOnInit() {}

  function ngAfterViewInit() {}

  function ngOnDestroy() {}
}

```

Add comment inline before declaration:
```javascript
export default /* @ngInject */ class MonitorInlineController {
  constructor($q, $sce, $animate) {
    this.$q = $q;
    this.$sce = $sce;
    this.$animate = $animate;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
}

export /* @ngInject */ function ShowcaseInlineController($q, $sce, $animate) {
  this.$q = $q;
  this.$sce = $sce;
  this.$animate = $animate;

  // lifecycle method
  this.ngOnInit = ngOnInit;
  this.ngAfterViewInit = ngAfterViewInit;
  this.ngOnDestroy = ngOnDestroy;

  // function declare
  function ngOnInit() {}

  function ngAfterViewInit() {}

  function ngOnDestroy() {}
}

```

Add babel plugin:

```json
{
  "plugin": ["annotate-ng"]
}
```

## License
MIT
