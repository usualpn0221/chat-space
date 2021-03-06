Rails.application.routes.draw do

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html




resources :users, only: [:index,:edit, :update]
root 'groups#index'
resources :groups, only: [:new,:create,:edit,:update,:destroy] do
  resources  :messages, only: [:index,:create]
  end

end
