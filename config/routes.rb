Rails.application.routes.draw do
  root 'static_pages#home'
  get '/change_locale/:locale', to: 'settings#change_locale', as: :change_locale
  devise_for :users

  resources :profiles do
    collection do
      get 'ownlist', 'follow', 'unfollow', 'sendrequest', 'unsendrequest', 'search', 'find'
    end
  end

  resources :posts
  resources :posts_api, only: [:show] do
    resources :post_likes_api, only: [:create, :destroy]
    resources :comments_api, only: [:index, :create, :destroy] do
      resources :likes_api, only: [:create, :destroy]
    end
    collection do
        get 'free', 'info', 'question', 'intro','best'
    end
  end
  resources :react_profiles

  resources :requests, only: [:index] do
    collection do
      get 'ownlist'
    end
  end

  resources :messages do
    collection do
      get 'read'
    end
  end
end
