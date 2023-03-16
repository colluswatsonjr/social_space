class SpaceSerializer < ActiveModel::Serializer
  attributes :id, :title, :bio, :creator, :posts
end
