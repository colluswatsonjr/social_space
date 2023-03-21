class PostSerializer < ActiveModel::Serializer
  attributes :id, :user, :space, :text
  belongs_to :user
  belongs_to :space

end
