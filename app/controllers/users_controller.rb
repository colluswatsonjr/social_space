class UsersController < ApplicationController
    # before_action :authorize, except: [:create]

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(session[:user_id])
        render json: user
    end

    def create
        user = User.create(user_params)
        if user.valid?
            # session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by(id:params[:id])
        if user
          user.update(user_params)
         render json: user
        else
          render json: {error:"User Not Found"}, status: 404
        end
    end

    def destroy
        user = User.find_by(id:params[:id])
        if user
            user.destroy
            render json: {}
        else
            render json: {error:"User Not Found"}, status: 404
        end
    end

    private

    def user_params
        params.permit(:username, :fname, :lname, :bio, :password, :password_confirmation)
    end

    def authorize
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end