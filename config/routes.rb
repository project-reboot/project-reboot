ProjectReboot::Application.routes.draw do
  devise_for :users, controllers: { sessions: 'devise/sessions' }

  root to: 'home#index'

  match '/api/locate', to: 'home#determine_ip_address',
                       constraints: { format: /json/ }
  match '/api/nearby_users', to: 'users#index',
                             constraints: { format: /json/ }
end
