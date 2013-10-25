# Jquery::ImageReader

Helpful jQuery plugins for dropping and pasting image data.

## Usage

```coffeescript
$("html").pasteImageReader ({name, dataURL, file, event}) ->
  $("body").css
    backgroundImage: "url(#{dataURL})"

$("html").dropImageReader ({name, dataURL, file, event}) ->
  $("body").css
    backgroundImage: "url(#{dataURL})"
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
