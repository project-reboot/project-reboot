source 'https://rubygems.org'

gem 'rails', '3.2.13'

# Database
gem 'pg'

# Server
gem 'unicorn', platforms: :ruby

# Security

# Controller & View
gem 'haml-rails'

# Location services
gem 'geocoder'

# user authentication
gem 'devise'
group :development do
  gem 'thin'
end

group :development, :test do
  gem 'faker'
  gem 'rspec-rails'
  gem 'zeus'
end

group :test do
  gem 'shoulda-matchers'
  gem 'capybara'
  # gem 'capybara-webkit'
  gem 'factory_girl_rails'
end

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'bootstrap-sass'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
  gem 'jquery-rails'
end

