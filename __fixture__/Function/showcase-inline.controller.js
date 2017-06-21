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
