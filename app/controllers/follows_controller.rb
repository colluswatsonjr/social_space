class FollowsController < ApplicationController
    def index
        follows = Follow.all
        render json: follows
    end
end
