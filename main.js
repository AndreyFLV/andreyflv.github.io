$(document).ready(function() {
  $("#mainlogo").mo_make_biglogo();

  $("#alert").css("opacity", 0);
  $("#alert").css("visibility", "hidden");

  $("#alert").click(function(e) {
    e.preventDefault();

    if (!$("#register").prop("disabled"))
      return;

    $("#register").prop("disabled", false);

    $("#alert").transit({opacity: 0});
    $("#alert").css("visibility", "hidden");
  });

  $("#register").click(function(e) {
    e.preventDefault();

    if ($.trim($("#email").val()).length == 0)
      return;

    $("#register").prop("disabled", true);

    $.get("alpharegister/" + $("#email").val(), function(response) {
      $("#alert").html(response);
      $("#alert").css("visibility", "visible");
      
      $("#alert").transit({opacity: 1});
    });

    $("#email").val("");

    return true;
  });

  function labnolThumb(id) {
    return '<img class="youtube-thumb" src="/images/vidthumb.png"><div class="play-button"></div>';
  }
 
  function labnolIframe() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowFullscreen", "1");
    iframe.setAttribute("id", "youtube-iframe");
    iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=1&fs=1&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=1");
    this.parentNode.replaceChild(iframe, this);
  }

  var v = document.getElementsByClassName("youtube-player");
  for (var n = 0; n < v.length; n++) {
    var p = document.createElement("div");
    p.innerHTML = labnolThumb(v[n].dataset.id);
    p.onclick = labnolIframe;
    v[n].appendChild(p);
  }
});
