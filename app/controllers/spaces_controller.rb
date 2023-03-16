class SpacesController < ApplicationController
    def index
        spaces = Space.all
        render json: spaces
    end
    def show
        space = Space.find(params[:id])
        render json: space
    end
    def create
        space = Space.new(space_params)
        space.update({creator_id: 1})
        if space.valid?
            space.save
            render json: space, status: :created
        else
            render json: { errors: space.errors.full_messages }, status: :unprocessable_entity
        end
    end
    def destroy
        space = Space.find_by(id:params[:id])
        if space
            space.destroy
            render json: {}
        else
            render json: {error:"space Not Found"}, status: 404
        end
    end
    private

    def space_params
        params.permit(:title, :bio)
    end
end
