// Records Desk — site behaviour.
$(document).ready(function () {

  $('#records-table').dataTable({
    paging: true,
    pageLength: 10,
    order: [[4, 'desc']]
  })

  var table = document.getElementById('records-table')
  var box = document.getElementById('records-search')
  var count = document.getElementById('records-count')

  function filter() {
    if (!table) return
    var term = box ? box.value.toLowerCase() : ''
    var rows = table.tBodies[0].rows
    var shown = 0
    for (var i = 0; i < rows.length; i++) {
      var match = rows[i].textContent.toLowerCase().indexOf(term) > -1
      rows[i].style.display = match ? '' : 'none'
      if (match) shown++
    }
    if (count) count.textContent = shown + (shown === 1 ? ' record' : ' records')
  }

  $('#records-search').on('keyup', filter)
  $('#records-search-btn').on('click', filter)

  $('.js-year').text(String(new Date().getFullYear()))
})
