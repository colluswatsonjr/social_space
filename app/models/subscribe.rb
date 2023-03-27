class Subscribe < ApplicationRecord
    validates :user_id, presence: true, uniqueness: { scope: :space_id }
    validates :space_id, presence: true, uniqueness: { scope: :user_id }

    belongs_to :user
    belongs_to :space
end
