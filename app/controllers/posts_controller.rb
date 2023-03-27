class PostsController < ApplicationController
    before_action :authorize

    def index
        posts = Post.all
        render json: posts
    end
    def show
        post = Post.find(params[:id])
        render json: post
    end
    def create
        post = Post.new(post_params)
        post.update({user_id:session[:user_id]})
        if post.valid?
            render json: post
        else
            render json: {errors: post.errors.full_messages}, status: :unprocessable_entity
        end
    end
    def destroy
        post = Post.find(params[:id])
        if post.user_id == session[:user_id]
            post.destroy
            render json: {}
        else
            render json: {error:"Post Not Found"}, status: 404
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
