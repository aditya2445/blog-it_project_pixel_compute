# frozen_string_literal: true

class OrganizationsController < ApplicationController
  def index
    organizations = Organization.all
    render json: {
      organizations:
    }, status: :ok
  end
end
