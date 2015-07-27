Rails.application.routes.draw do
  root 'profiles#index'

  devise_for :users

  resources :profiles do
    collection do
      get 'ownlist', 'follow', 'unfollow', 'sendrequest', 'unsendrequest'
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
