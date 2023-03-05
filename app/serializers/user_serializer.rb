class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :fname, :lname, :bio
end
