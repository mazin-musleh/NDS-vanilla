// CityDesk portal - staff ticket queue.
// Real DataTables serverSide:true grid against /api/tickets. The ajax
// function below is the translation layer both ways:
//   DataTables draw/start/length -> our page param (pageLength is locked
//   to 25 so it lines up with the server's fixed page size)
//   our {items, from, to, total} -> DataTables draw/recordsTotal/
//   recordsFiltered/data
// The two toggle button-groups just flip currentStatus/currentDept and
// call table.ajax.reload(). Load more is a secondary path below the grid
// that pages the same table forward.

$(function () {

  if (!$('#ticketsTable').length) {
    return;
  }

  var STATUS_CLASS = { open: 'bg-success', pending: 'bg-warning text-dark', closed: 'bg-secondary' };

  var currentStatus = '';
  var currentDept = '';

  var table = $('#ticketsTable').DataTable({
    serverSide: true,
    processing: true,
    paging: true,
    pageLength: 25,
    lengthChange: false,
    searching: false,
    ordering: false, // API has no sort param
    info: false,
    dom: 'rt', // no built-in search/length/info/pager - our toggles + Load more drive it
    columns: [
      { data: 'id' },
      { data: 'subject' },
      { data: 'department' },
      {
        data: 'status',
        render: function (status) {
          return '<span class="badge ' + (STATUS_CLASS[status] || 'bg-secondary') + '">' + status + '</span>';
        }
      },
      {
        data: 'created',
        render: function (created) {
          return formatDate(created);
        }
      }
    ],
    ajax: function (data, callback) {
      var page = Math.floor(data.start / data.length) + 1;

      $.getJSON('/api/tickets', { page: page, status: currentStatus, dept: currentDept })
        .done(function (res) {
          callback({
            draw: data.draw,
            recordsTotal: res.total,
            recordsFiltered: res.total,
            data: res.items
          });
        })
        .fail(function () {
          $('#resultCount').text('Could not load tickets. Please try again.');
          callback({ draw: data.draw, recordsTotal: 0, recordsFiltered: 0, data: [] });
        });
    }
  });

  table.on('draw', function () {
    var info = table.page.info();
    if (info.recordsDisplay === 0) {
      $('#resultCount').text('No tickets match these filters.');
    } else {
      $('#resultCount').text('Showing ' + (info.start + 1) + '-' + info.end + ' of ' + info.recordsDisplay + ' tickets');
    }
    $('#loadMoreBtn').prop('disabled', info.page >= info.pages - 1);
  });

  $('#statusToggle').on('click', '.status-toggle', function () {
    $('.status-toggle').removeClass('active');
    $(this).addClass('active');
    currentStatus = $(this).data('status') || '';
    table.ajax.reload(null, true);
  });

  $('#deptToggle').on('click', '.dept-toggle', function () {
    $('.dept-toggle').removeClass('active');
    $(this).addClass('active');
    currentDept = $(this).data('dept') || '';
    table.ajax.reload(null, true);
  });

  // secondary path: pages the same grid forward instead of its own pager
  $('#loadMoreBtn').on('click', function () {
    table.page('next').draw('page');
  });
});
