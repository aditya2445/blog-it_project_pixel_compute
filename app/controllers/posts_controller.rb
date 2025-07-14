# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:user, :organization, :categories).where(
      organization_id: current_user.organization_id,
      status: "published")
    render status: :ok, json: {
      posts: posts.as_json(
        include: {
          user: { only: [:id, :name] },
          organization: { only: [:id, :name] },
          categories: { only: [:id, :name] }
        },
        except: [:user_id, :organization_id]
      )
    }
  end

  def create
    post = Post.new(post_params)
    post.categories = Category.where(id: post_params[:category_ids]) if post_params[:category_ids]
    post.organization = current_user.organization
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    user = User.find(post.user_id)
    render_json({ post: post, user: user, categories: post.categories })
  end

  def update
    post = Post.find_by(slug: params[:slug])
    post.update!(post_params)
    render_notice("Post successfully updated")
  end

  def destroy
    post = Post.find_by!(slug: params[:slug])
    post.destroy!
    render_notice("Post deleted successfully")
  end

  def my_posts
    posts = current_user.posts.includes(:categories)
    render status: :ok, json: {
      posts: posts.as_json(
        only: [:id, :title, :status, :slug, :created_at, :updated_at],
        include: {
          categories: { only: [:id, :name] }
        }
      )
    }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :status, :user_id, category_ids: [])
    end
end
