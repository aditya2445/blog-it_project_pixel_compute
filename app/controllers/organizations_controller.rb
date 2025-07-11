# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index
  def index
    organizations = Organization.all
    render json: {
      organizations:
    }, status: :ok
  end
end
