class SubscribesController < ApplicationController
  before_action :authorize

  def index
    subscribes = Subscribe.all
    render json: subscribes
  end

  def create
    subscribe = Subscribe.new(space_id: params[:space_id])
    subscribe.update(user_id: session[:user_id])
    if subscribe.valid?
      render json: subscribe
    else
      render json: { error: subscribe.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    subscribe = Subscribe.find(params[:id])
    if subscribe
      subscribe.destroy
      render json: subscribe
    else
      render json: { error: subscribe.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def subscribe_params
    params.permit(:space_id, :id)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
end
