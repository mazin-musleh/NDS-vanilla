// CityDesk account area - tiny hash router.
// #profile / #security swap which .account-view is shown; the nav
// links are plain <a href="#..."> so clicking them just changes the
// hash and this listens for that.

$(function () {
  var $nav = $('#accountNav');
  if (!$nav.length) {
    return;
  }

  function showView(name) {
    $('.account-view').removeClass('active');
    $('#view-' + name).addClass('active');

    $nav.find('.nav-link').removeClass('active');
    $nav.find('[data-view="' + name + '"]').addClass('active');
  }

  function routeFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (hash !== 'profile' && hash !== 'security') {
      hash = 'profile';
    }
    showView(hash);
  }

  $(window).on('hashchange', routeFromHash);
  routeFromHash();
});
