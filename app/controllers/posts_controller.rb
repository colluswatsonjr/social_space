class PostsController < ApplicationController
  before_action :authorize

  def index
    posts = Post.all
    render json: posts
    # posts = User.find(session[:user_id]).posts
    # posts = []
    # User.find(session[:user_id]).followees.each do |x|
    #   x.posts.each do |post|
    #     posts << post
    #   end
    # end
    # User.find(session[:user_id]).subscribes.each do |sub|
    #   sub.space.posts.each do |post|
    #     posts << post
    #   end
    # end

    # # posts = Post.all
    # # posts = [mine, yours, alls]
    # render json: posts.uniq
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    post = Post.new(post_params)
    post.update({ user_id: session[:user_id] })
    if post.valid?
      render json: post
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find(params[:id])
    if post.user_id == session[:user_id]
      post.destroy
      render json: {}
    else
      render json: { error: "Post Not Found" }, status: 404
    end
  end

  private

  def post_params
    params.permit(:space_id, :text)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
end
