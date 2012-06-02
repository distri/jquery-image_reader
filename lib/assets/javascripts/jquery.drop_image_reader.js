(function() {

  (function($) {
    var defaults;
    $.event.fix = (function(originalFix) {
      return function(event) {
        event = originalFix.apply(this, arguments);
        if (event.type.indexOf('drag') === 0 || event.type.indexOf('drop') === 0) {
          event.dataTransfer = event.originalEvent.dataTransfer;
        }
        return event;
      };
    })($.event.fix);
    defaults = {
      callback: $.noop,
      matchType: /image.*/
    };
    return $.fn.dropImageReader = function(options) {
      var stopFn;
      if (typeof options === "function") {
        options = {
          callback: options
        };
      }
      options = $.extend({}, defaults, options);
      stopFn = function(event) {
        event.stopPropagation();
        return event.preventDefault();
      };
      return this.each(function() {
        var $this, element;
        element = this;
        $this = $(this);
        $this.bind('dragenter dragover dragleave', stopFn);
        return $this.bind('drop', function(event) {
          stopFn(event);
          return Array.prototype.forEach.call(event.dataTransfer.files, function(file) {
            var reader;
            if (!file.type.match(options.matchType)) {
              return;
            }
            reader = new FileReader();
            reader.onload = function(evt) {
              return options.callback.call(element, {
                dataURL: evt.target.result,
                event: evt,
                file: file,
                name: file.name
              });
            };
            return reader.readAsDataURL(file);
          });
        });
      });
    };
  })(jQuery);

}).call(this);
