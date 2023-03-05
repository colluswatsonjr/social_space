json.extract! user, :id, :username, :email, :fname, :lname, :bio, :password_digest, :created_at, :updated_at
json.url user_url(user, format: :json)
