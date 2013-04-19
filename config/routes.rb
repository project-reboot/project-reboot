ProjectReboot::Application.routes.draw do
  root to: 'home#index'
  devise_for :users
  match '/api/locate', to: 'home#determine_ip_address',
                       constraints: { format: /json/ }
end
