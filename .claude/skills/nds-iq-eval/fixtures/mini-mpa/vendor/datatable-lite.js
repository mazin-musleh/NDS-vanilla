/*! datatable-lite: a legacy table enhancer on $.fn for the Records Desk fixture. Sorts by `order`, pages by `pageLength`. */
(function ($) {
  $.fn.dataTable = function (opts) {
    opts = opts || {}
    return this.each(function () {
      var body = this.tBodies[0]
      if (!body) return
      var rows = Array.prototype.slice.call(body.rows)
      var ord = (opts.order || [])[0]
      if (ord) {
        var col = ord[0], dir = ord[1] === 'desc' ? -1 : 1
        rows.sort(function (a, b) {
          var x = a.cells[col].textContent, y = b.cells[col].textContent
          return (x < y ? -1 : x > y ? 1 : 0) * dir
        })
        rows.forEach(function (r) { body.appendChild(r) })
      }
      if (!opts.paging) return
      var size = opts.pageLength || 10
      var pages = Math.ceil(rows.length / size)
      function show(p) { rows.forEach(function (r, i) { r.style.display = Math.floor(i / size) === p ? '' : 'none' }) }
      show(0)
      if (pages < 2) return
      var nav = document.createElement('div')
      nav.className = 'dt-pager'
      for (var p = 0; p < pages; p++) {
        var b = document.createElement('button')
        b.type = 'button'
        b.className = 'btn btn-secondary btn-sm'
        b.textContent = p + 1
        b.addEventListener('click', show.bind(null, p))
        nav.appendChild(b)
      }
      this.parentNode.insertBefore(nav, this.nextSibling)
    })
  }
})(window.jQuery);
