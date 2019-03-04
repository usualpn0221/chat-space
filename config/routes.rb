Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html




resources :users, only: [:edit, :update]
root 'groups#index'
resources :groups, only: [:new,:create,:edit,:update] do
  resources  :messages, only: [:index,:create]
  end


end
