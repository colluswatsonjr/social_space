class Follow < ApplicationRecord
    validates :follower_id, uniqueness: { scope: :followee_id }
    validates :followee_id, uniqueness: { scope: :follower_id }

    belongs_to :follower, class_name: 'User'
    belongs_to :followee, class_name: 'User'
end
