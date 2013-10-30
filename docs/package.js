(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "version": "0.1.3",
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "Copyright (c) 2012 Daniel X. Moore\n\nMIT License\n\nPermission is hereby granted, free of charge, to any person obtaining\na copy of this software and associated documentation files (the\n\"Software\"), to deal in the Software without restriction, including\nwithout limitation the rights to use, copy, modify, merge, publish,\ndistribute, sublicense, and/or sell copies of the Software, and to\npermit persons to whom the Software is furnished to do so, subject to\nthe following conditions:\n\nThe above copyright notice and this permission notice shall be\nincluded in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\nNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\nLIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION\nOF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION\nWITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "# Jquery::ImageReader\n\nHelpful jQuery plugins for dropping and pasting image data.\n\n## Usage\n\n```coffeescript\n$(\"html\").pasteImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n\n$(\"html\").dropImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n```\n\n## Contributing\n\n1. Fork it\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Added some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create new Pull Request\n",
      "type": "blob"
    },
    "drop.coffee.md": {
      "path": "drop.coffee.md",
      "mode": "100644",
      "content": "Drop\n====\n\n    (($) ->\n      $.event.fix = ((originalFix) ->\n        (event) ->\n          event = originalFix.apply(this, arguments)\n\n          if event.type.indexOf('drag') == 0 || event.type.indexOf('drop') == 0\n            event.dataTransfer = event.originalEvent.dataTransfer\n\n          event\n\n      )($.event.fix)\n\n      defaults =\n        callback: $.noop\n        matchType: /image.*/\n\n      $.fn.dropImageReader = (options) ->\n        if typeof options == \"function\"\n          options =\n            callback: options\n\n        options = $.extend({}, defaults, options)\n\n        stopFn = (event) ->\n          event.stopPropagation()\n          event.preventDefault()\n\n        this.each ->\n          element = this\n          $this = $(this)\n\n          $this.bind 'dragenter dragover dragleave', stopFn\n\n          $this.bind 'drop', (event) ->\n            stopFn(event)\n\n            Array::forEach.call event.dataTransfer.files, (file) ->\n              return unless file.type.match(options.matchType)\n\n              reader = new FileReader()\n\n              reader.onload = (evt) ->\n                options.callback.call element,\n                  dataURL: evt.target.result\n                  event: evt\n                  file: file\n                  name: file.name\n\n              reader.readAsDataURL(file)\n\n    )(jQuery)\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "\n    require \"./paste\"\n    require \"./drop\"\n",
      "type": "blob"
    },
    "paste.coffee.md": {
      "path": "paste.coffee.md",
      "mode": "100644",
      "content": "Paste\n=====\n\n    (($) ->\n      $.event.fix = ((originalFix) ->\n        (event) ->\n          event = originalFix.apply(this, arguments)\n\n          if event.type.indexOf('copy') == 0 || event.type.indexOf('paste') == 0\n            event.clipboardData = event.originalEvent.clipboardData\n\n          return event\n\n      )($.event.fix)\n\n      defaults =\n        callback: $.noop\n        matchType: /image.*/\n\n      $.fn.pasteImageReader = (options) ->\n        if typeof options == \"function\"\n          options =\n            callback: options\n\n        options = $.extend({}, defaults, options)\n\n        @each ->\n          element = this\n          $this = $(this)\n\n          $this.bind 'paste', (event) ->\n            found = false\n            clipboardData = event.clipboardData\n\n            Array::forEach.call clipboardData.types, (type, i) ->\n              return if found\n\n              if type.match(options.matchType) or (clipboardData.items && clipboardData.items[i].type.match(options.matchType))\n                file = clipboardData.items[i].getAsFile()\n\n                reader = new FileReader()\n\n                reader.onload = (evt) ->\n                  options.callback.call element,\n                    dataURL: evt.target.result\n                    event: evt\n                    file: file\n                    name: file.name\n\n                reader.readAsDataURL(file)\n\n                found = true\n\n    )(jQuery)\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.3\"\nentryPoint: \"main\"\nremoteDependencies: [\n  \"//code.jquery.com/jquery-1.10.1.min.js\"\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\n",
      "type": "blob"
    },
    "test/image_reader.coffee": {
      "path": "test/image_reader.coffee",
      "mode": "100644",
      "content": "require \"../main\"\n\n$(\"html\").pasteImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n\n$(\"html\").dropImageReader ({name, dataURL, file, event}) ->\n  $(\"body\").css\n    backgroundImage: \"url(#{dataURL})\"\n",
      "type": "blob"
    }
  },
  "distribution": {
    "drop": {
      "path": "drop",
      "content": "(function() {\n  (function($) {\n    var defaults;\n    $.event.fix = (function(originalFix) {\n      return function(event) {\n        event = originalFix.apply(this, arguments);\n        if (event.type.indexOf('drag') === 0 || event.type.indexOf('drop') === 0) {\n          event.dataTransfer = event.originalEvent.dataTransfer;\n        }\n        return event;\n      };\n    })($.event.fix);\n    defaults = {\n      callback: $.noop,\n      matchType: /image.*/\n    };\n    return $.fn.dropImageReader = function(options) {\n      var stopFn;\n      if (typeof options === \"function\") {\n        options = {\n          callback: options\n        };\n      }\n      options = $.extend({}, defaults, options);\n      stopFn = function(event) {\n        event.stopPropagation();\n        return event.preventDefault();\n      };\n      return this.each(function() {\n        var $this, element;\n        element = this;\n        $this = $(this);\n        $this.bind('dragenter dragover dragleave', stopFn);\n        return $this.bind('drop', function(event) {\n          stopFn(event);\n          return Array.prototype.forEach.call(event.dataTransfer.files, function(file) {\n            var reader;\n            if (!file.type.match(options.matchType)) {\n              return;\n            }\n            reader = new FileReader();\n            reader.onload = function(evt) {\n              return options.callback.call(element, {\n                dataURL: evt.target.result,\n                event: evt,\n                file: file,\n                name: file.name\n              });\n            };\n            return reader.readAsDataURL(file);\n          });\n        });\n      });\n    };\n  })(jQuery);\n\n}).call(this);\n\n//# sourceURL=drop.coffee",
      "type": "blob"
    },
    "main": {
      "path": "main",
      "content": "(function() {\n  require(\"./paste\");\n\n  require(\"./drop\");\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "paste": {
      "path": "paste",
      "content": "(function() {\n  (function($) {\n    var defaults;\n    $.event.fix = (function(originalFix) {\n      return function(event) {\n        event = originalFix.apply(this, arguments);\n        if (event.type.indexOf('copy') === 0 || event.type.indexOf('paste') === 0) {\n          event.clipboardData = event.originalEvent.clipboardData;\n        }\n        return event;\n      };\n    })($.event.fix);\n    defaults = {\n      callback: $.noop,\n      matchType: /image.*/\n    };\n    return $.fn.pasteImageReader = function(options) {\n      if (typeof options === \"function\") {\n        options = {\n          callback: options\n        };\n      }\n      options = $.extend({}, defaults, options);\n      return this.each(function() {\n        var $this, element;\n        element = this;\n        $this = $(this);\n        return $this.bind('paste', function(event) {\n          var clipboardData, found;\n          found = false;\n          clipboardData = event.clipboardData;\n          return Array.prototype.forEach.call(clipboardData.types, function(type, i) {\n            var file, reader;\n            if (found) {\n              return;\n            }\n            if (type.match(options.matchType) || (clipboardData.items && clipboardData.items[i].type.match(options.matchType))) {\n              file = clipboardData.items[i].getAsFile();\n              reader = new FileReader();\n              reader.onload = function(evt) {\n                return options.callback.call(element, {\n                  dataURL: evt.target.result,\n                  event: evt,\n                  file: file,\n                  name: file.name\n                });\n              };\n              reader.readAsDataURL(file);\n              return found = true;\n            }\n          });\n        });\n      });\n    };\n  })(jQuery);\n\n}).call(this);\n\n//# sourceURL=paste.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.3\",\"entryPoint\":\"main\",\"remoteDependencies\":[\"//code.jquery.com/jquery-1.10.1.min.js\",\"http://strd6.github.io/require/v0.2.2.js\"]};",
      "type": "blob"
    },
    "test/image_reader": {
      "path": "test/image_reader",
      "content": "(function() {\n  require(\"../main\");\n\n  $(\"html\").pasteImageReader(function(_arg) {\n    var dataURL, event, file, name;\n    name = _arg.name, dataURL = _arg.dataURL, file = _arg.file, event = _arg.event;\n    return $(\"body\").css({\n      backgroundImage: \"url(\" + dataURL + \")\"\n    });\n  });\n\n  $(\"html\").dropImageReader(function(_arg) {\n    var dataURL, event, file, name;\n    name = _arg.name, dataURL = _arg.dataURL, file = _arg.file, event = _arg.event;\n    return $(\"body\").css({\n      backgroundImage: \"url(\" + dataURL + \")\"\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/image_reader.coffee",
      "type": "blob"
    }
  },
  "entryPoint": "main",
  "dependencies": {},
  "remoteDependencies": [
    "//code.jquery.com/jquery-1.10.1.min.js",
    "http://strd6.github.io/require/v0.2.2.js"
  ],
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "repository": {
    "id": 4527535,
    "name": "jquery-image_reader",
    "full_name": "STRd6/jquery-image_reader",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://2.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/jquery-image_reader",
    "description": "Paste and Drop images into web apps",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/jquery-image_reader",
    "forks_url": "https://api.github.com/repos/STRd6/jquery-image_reader/forks",
    "keys_url": "https://api.github.com/repos/STRd6/jquery-image_reader/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/jquery-image_reader/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/jquery-image_reader/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/jquery-image_reader/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/jquery-image_reader/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/jquery-image_reader/events",
    "assignees_url": "https://api.github.com/repos/STRd6/jquery-image_reader/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/jquery-image_reader/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/jquery-image_reader/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/jquery-image_reader/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/jquery-image_reader/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/jquery-image_reader/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/jquery-image_reader/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/jquery-image_reader/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/jquery-image_reader/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/jquery-image_reader/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/jquery-image_reader/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/jquery-image_reader/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/jquery-image_reader/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/jquery-image_reader/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/jquery-image_reader/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/jquery-image_reader/merges",
    "archive_url": "https://api.github.com/repos/STRd6/jquery-image_reader/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/jquery-image_reader/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/jquery-image_reader/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/jquery-image_reader/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/jquery-image_reader/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/jquery-image_reader/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/jquery-image_reader/labels{/name}",
    "releases_url": "https://api.github.com/repos/STRd6/jquery-image_reader/releases{/id}",
    "created_at": "2012-06-02T07:12:27Z",
    "updated_at": "2013-10-25T15:50:54Z",
    "pushed_at": "2013-10-25T15:50:54Z",
    "git_url": "git://github.com/STRd6/jquery-image_reader.git",
    "ssh_url": "git@github.com:STRd6/jquery-image_reader.git",
    "clone_url": "https://github.com/STRd6/jquery-image_reader.git",
    "svn_url": "https://github.com/STRd6/jquery-image_reader",
    "homepage": null,
    "size": 130,
    "watchers_count": 4,
    "language": "CoffeeScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 1,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 1,
    "open_issues": 0,
    "watchers": 4,
    "master_branch": "master",
    "default_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 1,
    "branch": "master",
    "defaultBranch": "master"
  }
});