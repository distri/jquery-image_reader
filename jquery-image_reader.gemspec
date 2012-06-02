# -*- encoding: utf-8 -*-
require File.expand_path('../lib/jquery-image_reader/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Daniel X. Moore"]
  gem.email         = ["yahivin@gmail.com"]
  gem.description   = %q{A couple of jquery plugins that allow easy binding of file drop and paste events specially targeting getting image data.}
  gem.summary       = %q{Paste and Drop images into web apps}
  gem.homepage      = "https://github.com/STRd6/jquery-image_reader"

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "jquery-image_reader"
  gem.require_paths = ["lib"]
  gem.version       = Jquery::ImageReader::VERSION

  gem.add_dependency "jquery-source"
end
