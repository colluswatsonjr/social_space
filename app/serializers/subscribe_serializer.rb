class SubscribeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :space_id, :user, :space

  belongs_to :user
  belongs_to :space
end
