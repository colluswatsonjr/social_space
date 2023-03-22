Rails.application.routes.draw do
  resources :posts
  post "/delete_post/:id", to: "posts#destroy"

  resources :subscribes
  post "/unsubscribe/:id", to: "subscribe#destroy"

  resources :spaces
  get "/find_space/:title", to: "spaces#show"

  resources :follows
  resources :users, only: [:index]
  
  get "/me", to: "users#show"
  get "/find_user/:username", to: "users#find_user"
  post "/register", to: "users#create"
  patch "/edit_user", to: "users#update"
  delete "/delete_user", to: "users#destroy"
  post '/follow/:user_id', to: "users#follow"
  post '/unfollow/:user_id', to: "users#unfollow"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
