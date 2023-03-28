# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "📃 Seeding data..."

User.create( username: 'watsupnxt', fname: 'Collus', lname: 'Watson', bio: 'Living my best life terribly', password: 'asdf')
User.create(username: 'jane_doe', fname: 'jane', lname: 'doe', bio: 'Up, Up, and Away', password: 'asdf')
User.create(username: 'john_doe', fname: 'john', lname: 'doe', bio: 'Lets go Power Rangers', password: 'asdf')
User.create(username: 'mr_awesome', fname: 'jack', lname: 'hill', bio: 'Whats next', password: 'asdf')

Follow.create(follower_id: 1, followee_id:2)
Follow.create(follower_id: 1, followee_id:3)
Follow.create(follower_id: 1, followee_id:4)
Follow.create(follower_id: 2, followee_id:1)
Follow.create(follower_id: 2, followee_id:3)
Follow.create(follower_id: 2, followee_id:4)

Space.create(title:'Sun', bio:'Im really hot', creator_id:1)
Space.create(title:'Earth', bio:'Im kinda thirsty', creator_id:1)
Space.create(title:'Moon', bio:'Great, another crator', creator_id:1)

Post.create(user_id:1, space_id:1, text:'ITS HOT HERE')
Post.create(user_id:1, space_id:2, text:'ITS WET HERE')
Post.create(user_id:1, space_id:3, text:'ITS BORING HERE')
Post.create(user_id:2, space_id:1, text:'One Two')
Post.create(user_id:2, space_id:2, text:'Buckle my shoe')
Post.create(user_id:2, space_id:3, text:'Three Four')
Post.create(user_id:3, space_id:1, text:'Not the place for me')
Post.create(user_id:3, space_id:2, text:'Im here to stay')
Post.create(user_id:3, space_id:3, text:'Shut the door')
Post.create(user_id:4, space_id:1, text:'Whats over here')
Post.create(user_id:4, space_id:2, text:'Just looking')
Post.create(user_id:4, space_id:3, text:'Love it here')

Subscribe.create(user_id:1, space_id:1)
Subscribe.create(user_id:1, space_id:2)
Subscribe.create(user_id:2, space_id:3)
Subscribe.create(user_id:2, space_id:1)
Subscribe.create(user_id:3, space_id:2)
Subscribe.create(user_id:3, space_id:3)
puts "✅ Done seeding"