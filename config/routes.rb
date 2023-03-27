Rails.application.routes.draw do
  resources :posts
  # delete "/delete_post/:id", to: "posts#destroy"

  resources :subscribes, only: [:index]
  post "/subscribe/:space_id", to: "subscribes#create"
  delete "/unsubscribe/:id", to: "subscribes#destroy"

  resources :spaces
  get "/find_space/:title", to: "spaces#show"

  resources :follows
  post '/follow/:user_id', to: "users#follow"
  post '/unfollow/:user_id', to: "users#unfollow"

  resources :users, only: [:index]
  get "/me", to: "users#show"
  get "/find_user/:username", to: "users#find_user"
  post "/register", to: "users#create"
  patch "/edit_user", to: "users#update"
  delete "/delete_user", to: "users#destroy"


  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

end
