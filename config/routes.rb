Rails.application.routes.draw do
  resources :posts
  post "/delete_post/:id", to: "posts#destroy"

  resources :subscribes
  post "/unsubscribe/:id", to: "subscribe#destroy"

  resources :spaces
  resources :follows
  resources :users
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
