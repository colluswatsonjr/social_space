class Post < ApplicationRecord
    validates :user_id, presence: true
    validates :space_id, presence: true

    belongs_to :user
    belongs_to :space
end
