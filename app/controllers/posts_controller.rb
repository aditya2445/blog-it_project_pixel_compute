# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:user, :organization, :categories).all

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
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    user = User.find(post.user_id)
    render_json({ post: post, user: user, categories: post.categories })
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
