require "../main"

$("html").pasteImageReader ({name, dataURL, file, event}) ->
  $("body").css
    backgroundImage: "url(#{dataURL})"

$("html").dropImageReader ({name, dataURL, file, event}) ->
  $("body").css
    backgroundImage: "url(#{dataURL})"
