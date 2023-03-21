class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :fname, :lname, :bio, :followers, :followees
  has_many :posts
  has_many :subscribes
end
