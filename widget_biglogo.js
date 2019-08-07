$.fn.extend({
  mo_make_biglogo: function()  
  {
    return this.each(function() {
      var self = $(this);
      self.addClass("widget_mo_biglogo");

      var revealer = self.find(".revealer");
      revealer.css('width', '0%');
      revealer.css('height', '0px');
      revealer.transition({'width': '100%'}, 350, 'cubic-bezier(0.1, 0.2, 0.4, 1)').transition({'height': '160px'}, 750);
      // _blink(revealer, 6, 0, 60);

      var under = self.find(".under");
      under.css('opacity', 0);
      under.delay(500).transition({'opacity': 1}, 500);

      var over = self.find(".over");
      over.css('visibility', 'hidden');
      _blink(over, 3, 120, 45);
    });
  }
});
