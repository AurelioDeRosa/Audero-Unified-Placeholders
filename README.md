# Audero Unified Placeholders #

[![Greenkeeper badge](https://badges.greenkeeper.io/AurelioDeRosa/Audero-Unified-Placeholders.svg)](https://greenkeeper.io/)
[Audero Unified Placeholders](https://github.com/AurelioDeRosa/Audero-Unified-Placeholders) is a very lightweight cross-browser jQuery plugin to emulate the HTML5 placeholder attribute on browsers that don't support it. This placeholder's polyfill emulates perfectly the native behavior hiding the placeholders' text on the first input of the user and not on focus. In addition, it allows you to style the placeholders' texts using CSS and to override the browsers' native support (in those who had).

## Demo ##
A live demo is available [here](http://htmlpreview.github.io/?https://github.com/AurelioDeRosa/Audero-Unified-Placeholders/blob/master/demo/index.html).

## Requirements ##
Being a jQuery plugin, the only requirement is [jQuery](http://www.jquery.com).

## Compatibility ##
It has been tested and works on all the major browsers, including Internet Explorer 6 and later.

## Installation ##
You can install Audero Unified Placeholders by using [Bower](http://bower.io).

    bower install audero-unified-placeholders

Alternatively, you have to manually download it.

Remember to include the script **after** the [jQuery](http://www.jquery.com) library in the header of your web page:

    <script src="path/to/jquery.js"></script>
    <script src="path/to/jquery.auderoUnifiedPlaceholders.js"></script>

## Usage ##
Using this plugin is very simple. Just call the `auderoUnifiedPlaceholders()` method on the element(s) you want to apply the placeholder, typically the `<input>`s and the `<textarea>`s of a `<form>`.
For example, let that you have the following code:

    <form name="registration-form" id="registration-form" action="#" method="get">
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="surname" placeholder="Surname" />
      <input type="email" name="email" placeholder="Email" />
      <input type="tel" name="phone-number" placeholder="Phone number" />
      <input type="submit" value="Register" />
    </form>

A basic call to the plugin is:

    <script>
       $(document).ready(function() {
          $('#registration-form input[placeholder]').auderoUnifiedPlaceholders();
       });
    </script>

The plugin is able to detect what elements have a placeholder, so in case you're lazy, you can use a snippet like the following as well (note the `*` selector):

    <script>
       $(document).ready(function() {
          $('#registration-form *').auderoUnifiedPlaceholders();
       });
    </script>

Please note using the `*` selector could reselt in worst performance.

### Enable/Disable the placeholder ###
This plugin uses the elements' value property to emulate the placeholder attribute. Moreover, chances there are that in your form you are using a plugin to validate the data inserted by the user. This means that the validator plugin will validate the values written as well as the placeholders. Another problematic case occurs when the user don't fill a field. In this circumstance, you probably want that the server will receive the field's value as empty instead of valorized with your placeholder.

To solve these cases, you can simply disable the plugin before validate the data or sending them to the server. To achieve this goal, you can use the `disable` method. To call it, you have to call the same method seen until now (`auderoUnifiedPlaceholders()`) passing a string having value `disable`, as you can see in the next example:

    <script>
       $('#registration-form *').auderoUnifiedPlaceholders('disable');
    </script>

Once the data are verified, if some of them are wrong, you can enable again the plugin using the `enable` method as shown in the next snippet:

    <script>
       $('#registration-form *').auderoUnifiedPlaceholders('enable');
    </script>

### Reset the placeholder ###
As said in the previous section, this polyfill uses the value property of the elements, so if your form has a reset button, once the user clicks it, all the elements will be cleared as well as the placeholders. To offer the expected behavior to your users, you have to use the `reset` method offered by the plugin instead of the native function. To use it you have to call the same method seen before (`auderoUnifiedPlaceholders()`) passing a string having value `reset`, as you can see in the next example:

    <script>
       $('#registration-form input[placeholder]').auderoUnifiedPlaceholders('reset');
    </script>

### Destroy the placeholder ###
In some cases (although I can't really imagine what), you may need to destroy the changes applied by this polyfill. To achieve this goal, you can call the `auderoUnifiedPlaceholders()` method passing the string `destroy`. To see it in action, take a look at the following snippet:

    <script>
       $('#registration-form *').auderoUnifiedPlaceholders('destroy');
    </script>

## Options ##
Audero Unified Placeholders has few but very useful options you can set during the call to the `auderoUnifiedPlaceholders()` method. They give you the possibility to create great effects and customization of the style of your forms placeholders. The options are:

* `overrideNative` (`boolean`. Default: `false`): If override browsers' native placeholder support.
* `className` (`string`. Default: `""`): A class to apply to the selected elements.
* `style` (`object`. Default: `{color: "#A9A9A9"}`): A object containing a set of rules to apply to the selected elements. Please note that the rules in this object will have **higher** priority among those used in the class specified using the `className` property. As you can see, the default value contains only a color hex code to display the text's color in the same way the browsers who support the attribute will do.

## Advanced Examples ##
### Example 1 ###
The first example shown uses two of the three options seen before. Using the `overrideNative` option, it'll force browsers having support for the HTML5 placeholder attribute to be replace by [Audero Unified Placeholders](https://github.com/AurelioDeRosa/Audero-Unified-Placeholders) system. Besides, using `style`, the placeholders will be shown using a black (#000000) color and in bold. The code of this example is the following:

    <script>
       $(document).ready(function() {
          $("#registration-form *").auderoUnifiedPlaceholders({
             overrideNative: true,
             style: {
                "color": "#000000",
                "font-weight": "bold"
             }
          });
       });
    </script>

### Example 2 ###
The next example is slightly more complex then the previous. In fact, it shows how the priority of the `style` properties can override those specified in a class set using `className`. Let that you want to apply to the placeholders a style defined in a class called `placeholder-class` and that the latter is defined as follows:

    .placeholder-class
    {
       color: #FCAD22 !important;
       font-style: italic;
    }

Now, say that you use the snippet listed below:

    <script>
       $(document).ready(function() {
          $("#registration-form *").auderoUnifiedPlaceholders({
             overrideNative: true,
             className: "placeholder-class",
             style: {
                "font-style": "normal"
             }
          });
       });
    </script>

In this case, the result is that you'll have an emulated placeholder even in browsers supporting natively the placeholder attribute, and that the placeholders' texts will be shown using the color #FCAD22 with a normal font-style (so not the *italic* style).

The most observant of you might have noted the use of the `!important` declaration. For an explanation, see the "Final Notes".

## Final Notes ##
As a conclusion, I want to highlight the following facts:

* The plugin is able to recognize if the user types the same value of the placeholder, behaving as expected. So, you don't have to worry about this case.
* Recalling that the properties of the `style` option have higher priority among those set in the class specified in the `className`, if you want to set a text color (different than #A9A9A9) using a property defined in the class, you have to use the `!important` declaration. The latter allows you to give the property an even higher prority, so this color will apply instead of the `style` one.
* If you want to use a client-side validator remember to disable the plugin first as discussed in the "Enable/Disable the placeholder" section.

## License ##
[Audero Unified Placeholders](https://github.com/AurelioDeRosa/Audero-Unified-Placeholders) is dual licensed under [MIT](http://www.opensource.org/licenses/MIT) and [GPL-3.0](http://opensource.org/licenses/GPL-3.0)

## Authors ##
[Aurelio De Rosa](http://www.audero.it) ([@AurelioDeRosa](https://twitter.com/AurelioDeRosa))