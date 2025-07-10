# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.select(:id, :name)
    render json: {
      categories: categories
    }, status: :ok
  end

  def create
    category = Category.new(category_params)
    category.save!
    render_notice(t("successfully_created"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
