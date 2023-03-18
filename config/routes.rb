Rails.application.routes.draw do
  resources :posts
  post "/delete_post/:id", to: "posts#destroy"

  resources :subscribes
  post "/unsubscribe/:id", to: "subscribe#destroy"

  resources :spaces
  resources :follows
  resources :users, only: [:index]
  get "/me", to: "users#show"
  get "/profile/find_user/:username", to: "users#find_user"
  post "/register", to: "users#create"
  patch "/edit_user", to: "users#update"
  delete "/delete_user", to: "users#destroy"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
