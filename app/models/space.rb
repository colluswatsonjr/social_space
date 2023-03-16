class Space < ApplicationRecord
    belongs_to :creator, class_name: 'User'
    
    has_many :posts, dependent: :destroy
    has_many :users, through: :posts

    has_many :subscribes
end
