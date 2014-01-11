/*
 * Audero Unified Placeholders is a very lightweight cross-browser jQuery plugin
 * to emulate the HTML5 placeholder attribute on browsers that don't support it.
 * This placeholder polyfill emulates perfectly the native behavior hiding the
 * placeholders' text on the first input of the user and not on focus.
 * In addition, it allows you to style the placeholders' texts using CSS
 * and to override the browsers' native support (in those who had).
 *
 * @author  Aurelio De Rosa <aurelioderosa@gmail.com>
 * @version 1.0.4
 * @link    https://github.com/AurelioDeRosa/Audero-Unified-Placeholders
 * @license Dual licensed under MIT (http://www.opensource.org/licenses/MIT)
 * and GPL-3.0 (http://opensource.org/licenses/GPL-3.0)
 */
(function($) {
   var defaultValues = {
      overrideNative: false,    // boolean. If override browsers native placeholder support.
      className: "",            // string. A class to apply to the selected elements.
      style: {color: "#A9A9A9"} // object. A object containing a set of rules to apply to the selected elements.
                                // The rules in this object will have higher priority among those used
                                // in the class specified using the className property.
   };

   var methods = {
      init: function(options) {
         if (options == null)
            options = {};
         options = $.extend(true, {}, defaultValues, options);

         // If the browser supports the placeholder attribute and the user chooses
         // to not override the native support
         if (("placeholder" in document.createElement("input")) && options.overrideNative === false)
            return;

         return this
            .filter(function() {
               // Filter the elements that haven't a placeholder
               return (typeof $(this).attr("placeholder") !== "undefined");
            })
            .each(function(index, element) {
               var $element = $(element);
               var placeholder = $element.attr("placeholder");
               $element.attr({
                  "data-audero-unp-text": placeholder,
                  "data-audero-unp-typed": "false"
               });
               // Delete the value so the style will be applied on refresh in Firefox #3
               $element.val("");

               // Remove the real placeholder attribute
               $element.removeAttr("placeholder");

               $element
               .on("focus.auderoUnifiedPlaceholders", function () {
                  if ($(this).val() === placeholder) {
                     if (this.createTextRange) {
                        var part = this.createTextRange();
                        part.move("character", 0);
                        part.select();
                     } else if (this.setSelectionRange)
                        this.setSelectionRange(0, 0);
                  }
               })
               .on("keydown.auderoUnifiedPlaceholders", function() {
                  var $this = $(this);
                  $this.removeClass(options.className);
                  for(var rule in options.style) {
                     $this.css(rule, "");
                  }
                  if ($this.val() === placeholder && $this.attr("data-audero-unp-typed") === "false") {
                     $this.val("");
                  } else {
                     $this.attr("data-audero-unp-typed", "true");
                  }
               })
               .on("keyup.auderoUnifiedPlaceholders", function() {
                  var $this = $(this);
                  if ($this.val() === "") {
                     $this
                     .trigger("blur.auderoUnifiedPlaceholders")
                     .trigger("focus.auderoUnifiedPlaceholders");
                  }
               })
               .on("blur.auderoUnifiedPlaceholders", function () {
                  var $this = $(this);
                  if ($this.val() === "") {
                     $this
                     .attr("data-audero-unp-typed", "false")
                     .val(placeholder)
                     .addClass(options.className)
                     .css(options.style);
                  }
               });

               $element.blur();
         });
      },
      enable: function() {
         return this.each(function() {
                   var placeholder = "";
                   var $this = $(this);
                   if (typeof $this.attr("placeholder") !== "undefined")
                      placeholder = $this.attr("placeholder");
                   else if (typeof $this.attr("data-audero-unp-text") !== "undefined")
                      placeholder = $this.attr("data-audero-unp-text");
                   else
                      return;

                   if ($this.val() === "")
                      $this.val(placeholder);
               });
      },
      disable: function() {
         return this.each(function() {
                   var placeholder = "";
                   var $this = $(this);
                   if (typeof $this.attr("placeholder") !== "undefined")
                      placeholder = $this.attr("placeholder");
                   else if (typeof $this.attr("data-audero-unp-text") !== "undefined")
                      placeholder = $this.attr("data-audero-unp-text");
                   else
                      return;

                   if ($this.val() === placeholder && $this.attr("data-audero-unp-typed") === "false")
                      $this.val("");
               });
      },
      reset: function() {
         return this
                .filter(function() {
                  // Remove elements that haven't neither a placeholder nor the audero unified placeholder
                  return (
                          typeof $(this).attr("placeholder") !== "undefined"
                          || typeof $(this).attr("data-audero-unp-text") !== "undefined"
                         );
               })
               .val("")
               .trigger("blur.auderoUnifiedPlaceholders");
      },
      destroy: function() {
         return this
                .trigger("keydown.auderoUnifiedPlaceholders")
                .off("focus.auderoUnifiedPlaceholders keydown.auderoUnifiedPlaceholders blur.auderoUnifiedPlaceholders")
                .each(function(index, element) {
                   var $element = $(element);
                   if (
                        typeof $element.attr("data-audero-unp-text") !== "undefined"
                        && typeof $element.attr("placeholder") === "undefined"
                      ) {
                            $element.attr("placeholder", $element.attr("data-audero-unp-text"));
                      }
                      $element.removeAttr("data-audero-unp-text data-audero-unp-typed");
                });
      }
   };

   $.fn.auderoUnifiedPlaceholders = function (method) {
      if (methods[method])
         return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      else if (typeof method === "object" || !method)
         return methods.init.apply(this, arguments);
      else
         $.error("Method " + method + " does not exist on jQuery.auderoUnifiedPlaceholders");
   };
})(jQuery);