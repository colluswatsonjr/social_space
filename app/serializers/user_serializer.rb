class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :fname, :lname, :bio, :followers, :followees, :spaces
end
