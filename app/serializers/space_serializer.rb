class SpaceSerializer < ActiveModel::Serializer
  attributes :id, :title, :bio, :creator, :posts
  has_many :posts, dependent: :destroy
  has_many :users, through: :posts

  has_many :subscribes
end
