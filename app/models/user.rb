class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true

    has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
    has_many :followees, through: :followed_users
    has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
    has_many :followers, through: :following_users

    has_many :spaces, foreign_key: :creator, class_name: 'Space', dependent: :destroy
        
    has_many :posts, dependent: :destroy
    has_many :spaces, through: :posts

    has_many :subscribes
end
