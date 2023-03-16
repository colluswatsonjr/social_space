Rails.application.routes.draw do
  resources :follows
  resources :users
  get "/me", to: "users#show"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
