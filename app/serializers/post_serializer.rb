class PostSerializer < ActiveModel::Serializer
  attributes :id, :user, :space, :text

end
