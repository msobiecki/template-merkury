var Interactive = {
  init: function (target, tooltipbox, tooltip) {
    this.target = target;
    this.tooltipbox = tooltipbox;
    this.tooltip = tooltip;

    this.catchDOM();
    this.setPoints();
    this.bindEvent();
    this.cloneTooltip();
  },
  catchDOM: function () {
    this.$el = $(this.target);
    this.$point = this.$el.find('.-point');
    this.$tooltipbox = $(this.tooltipbox);
    this.$tooltip = $(this.tooltip);
  },
  setPoints: function () {
    this.$point.each(this.setPoint)
  },
  setPoint: function (i, e) {
    $(e).css({'position': 'absolute', 'top': $(e).data('y') + '%', 'left': $(e).data('x') + '%', 'display': 'block'})
  },
  bindEvent: function () {
    this.$point.on('click', this.clickEvent.bind(this));
  },
  cloneTooltip: function () {
    this.$tooltip.clone().prependTo(this.$tooltipbox);
    this.$tooltipbox = $(this.tooltipbox);
  },
  clickEvent: function (e) {
    var _self = $(e.currentTarget);

    if (_self.hasClass('-opened')) {
      this.$tooltip.removeClass('-tooltip-open');
      this.$tooltipbox.find(this.tooltip).removeClass('-tooltip-open');
      _self.removeClass('-opened');
    } else {
      this.$point.not(_self).removeClass('-opened');
      this.$tooltip.removeClass('-tooltip-open');
      this.$tooltipbox.find(this.tooltip).removeClass('-tooltip-open');

      this.$tooltip.each(function (i, e) {
        if ($(e).data('tooltip') === _self.data('tooltip')) {
          $(e).addClass('-tooltip-open')
        }
      });

      this.$tooltipbox.find(this.tooltip).each(function (i, e) {
        if ($(e).data('tooltip') === _self.data('tooltip')) {
          $(e).addClass('-tooltip-open')
        }
      });
      _self.addClass('-opened');
    }
  }
};


(function () {
  if ($('.js-interactive').length > 0) {
    var interactive = new Object(Interactive);
    interactive.init('.js-interactive', '.js-interactive-box', '.js-interactive-tooltip');
  }
})();