class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :space_id, :text
end
