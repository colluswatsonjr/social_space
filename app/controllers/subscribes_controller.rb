class SubscribesController < ApplicationController
        # before_action :authorize, except: [:create]

    def index
        subscribes = Subscribe.all
        render json: subscribes
    end
    def create
        subscribe = Subscribe.new(subscribe_params)
        subscribe.update({user_id:session[:user_id]})
        if subscribe.valid?
            render json: subscribe
        else
            render json: {errors: subscribe.errors.full_messages}, status: :unprocessable_entity
        end
    end
    def destroy
        subscribe = Subscribe.find(params[:id])
        if subscribe.user_id == session[:user_id]
            subscribe.destroy
            render json: {}
        else
            render json: {error:"Subscribe Not Found"}, status: 404
        end
    end
    private

    def subscribe_params
        params.permit(:space_id, :user_id)
    end

    def authorize
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end
