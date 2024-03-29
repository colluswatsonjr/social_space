class SpacesController < ApplicationController
  before_action :authorize

  def index
    spaces = Space.all
    render json: spaces
  end

  def show
    space = Space.find_by(title: params[:title])
    render json: space
  end

  def create
    space = Space.new(space_params)
    space.update({ creator_id: 1 })
    if space.valid?
      space.save
      render json: space, status: :created
    else
      render json: { error: space.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    space = Space.find_by(id: params[:id])
    if space
      space.destroy
      render json: {}
    else
      render json: { error: "space Not Found" }, status: 404
    end
  end

  private

  def space_params
    params.permit(:title, :space_id, :bio)
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
end
