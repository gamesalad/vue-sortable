;(function () {

  var vSortable = {}
  var Sortable = typeof require === 'function'
      ? require('sortablejs')
      : window.Sortable

  if (!Sortable) {
    throw new Error('[vue-sortable] cannot locate Sortable.js.')
  }

  // exposed global options
  vSortable.config = {}

  vSortable.install = function (Vue) {
    Vue.directive('sortable',{
      bind: function (el, binding, vnode) {
        var options = binding.value || {}

        var sortable = new Sortable(el, options)

        if (this.arg && !this.vm.sortable) {
          this.vm.sortable = {}
        }

        //  Throw an error if the given ID is not unique
        if (this.arg && this.vm.sortable[this.arg]) {
          console.warn('[vue-sortable] cannot set already defined sortable id: \'' + this.arg + '\'')
        } else if( this.arg ) {
          this.vm.sortable[this.arg] = sortable
        }
      }
    })
  }

  if (typeof exports == "object") {
    module.exports = vSortable
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return vSortable
    })
  } else if (window.Vue) {
    window.vSortable = vSortable
    Vue.use(vSortable)
  }

})()
