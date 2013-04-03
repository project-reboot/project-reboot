ProjectReboot::Application.routes.draw do
  root to: 'home#index'

  match '/locate', to: 'home#determine_ip_address', constraints: {format: /json/}
end
