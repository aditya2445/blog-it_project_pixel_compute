# frozen_string_literal: true

Rails.application.routes.draw do
  get "categories/index"
  get "categories/create"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  resources :posts, only: %i[index create show], param: :slug
  resources :categories, only: %i[index create]
  resources :users, only: %i[index, create]
  resources :organizations, only: :index

  root "home#index"
  get "*path", to: "home#index", via: :all
  # Defines the root path route ("/")
  # root "posts#index"
end
