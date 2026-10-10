// CityDesk portal - shared page glue.
// Loaded on every page; guards each block by checking the elements exist
// so one file can serve the whole site without a build step.

function formatDate(isoString) {
  var d = new Date(isoString);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

$(function () {

  // --- navbar active-link highlighting ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.navbar-nav .nav-link').each(function () {
    var href = $(this).attr('href');
    if (href === currentPage) {
      $(this).addClass('active');
    }
  });

  // --- search box is decorative only, don't let it reload the page ---
  $('#navSearchForm').on('submit', function (e) {
    e.preventDefault();
  });

  // --- submit.html: department select + description editor + form validation ---
  if ($('#submitForm').length) {

    $('#reqDept').select2({
      theme: 'bootstrap-5',
      width: '100%',
      placeholder: 'Select a department...'
    });

    tinymce.init({
      selector: '#reqDescription',
      height: 260,
      menubar: false,
      plugins: 'lists link',
      toolbar: 'undo redo | bold italic | bullist numlist | link'
    });

    function showError(fieldId, message) {
      $('#' + fieldId + 'Error').text(message);
    }

    function clearErrors() {
      $('.field-error').text('');
    }

    function validateSubmitForm() {
      clearErrors();
      var valid = true;

      var name = $.trim($('#reqName').val());
      if (!name) {
        showError('reqName', 'Please enter your name.');
        valid = false;
      }

      var email = $.trim($('#reqEmail').val());
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        showError('reqEmail', 'Please enter a valid email address.');
        valid = false;
      }

      var dept = $('#reqDept').val();
      if (!dept) {
        showError('reqDept', 'Please choose a department.');
        valid = false;
      }

      var subject = $.trim($('#reqSubject').val());
      if (!subject) {
        showError('reqSubject', 'Please enter a subject.');
        valid = false;
      }

      var description = tinymce.get('reqDescription') ? tinymce.get('reqDescription').getContent({ format: 'text' }) : '';
      if (!$.trim(description)) {
        showError('reqDescription', 'Please describe the issue.');
        valid = false;
      }

      return valid;
    }

    $('#submitForm').on('submit', function (e) {
      e.preventDefault();

      if (!validateSubmitForm()) {
        return;
      }

      var payload = {
        name: $('#reqName').val(),
        email: $('#reqEmail').val(),
        department: $('#reqDept').val(),
        subject: $('#reqSubject').val(),
        description: tinymce.get('reqDescription').getContent()
      };

      $('#submitBtn').prop('disabled', true).text('Submitting...');

      $.ajax({
        url: '/api/requests',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (res) {
          $('#submitRefId').text(res.id);
          $('#submitSuccess').removeClass('d-none');
          $('#submitForm')[0].reset();
          $('#reqDept').val('').trigger('change');
          tinymce.get('reqDescription').setContent('');
        },
        error: function () {
          alert('Something went wrong submitting your request. Please try again.');
        },
        complete: function () {
          $('#submitBtn').prop('disabled', false).text('Submit Request');
        }
      });
    });
  }

});
