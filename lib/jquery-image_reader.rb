require "jquery-image_reader/version"

if defined? ::Rails::Engine
  require "jquery-image_reader/rails"
elsif defined? ::Sprockets
  require "jquery-image_reader/sprockets"
end

module Jquery
  module ImageReader
  end
end
