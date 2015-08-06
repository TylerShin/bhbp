Rails.application.routes.draw do
  root 'static_pages#home'

  devise_for :users

  resources :profiles do
    collection do
      get 'ownlist', 'follow', 'unfollow', 'sendrequest', 'unsendrequest', 'search'
    end
  end

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
