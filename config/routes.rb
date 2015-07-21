Rails.application.routes.draw do
  root 'profiles#index'
  devise_for :users
  resources :profiles do
    collection do
      get 'follow', 'unfollow'
    end
  end
end
