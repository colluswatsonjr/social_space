# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "📃 Seeding data..."

User.create( username: 'watsupnxt', fname: 'Collus', lname: 'Watson', bio: 'Living my best life terribly', password: 'asdf')
User.create(username: 'guest1', fname: 'guest', lname: '1', bio: '1111111 guest 1111111', password: 'asdf')
User.create(username: 'guest2', fname: 'guest', lname: '2', bio: '2222222 guest 2222222', password: 'asdf')
User.create(username: 'guest3', fname: 'guest', lname: '3', bio: '3333333 guest 3333333', password: 'asdf')

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
Post.create(user_id:2, space_id:1, text:'asdfasdf')
Post.create(user_id:2, space_id:2, text:'Iasdfasdfasdf')
Post.create(user_id:2, space_id:3, text:'ITsdfasdfasdf')
Post.create(user_id:3, space_id:1, text:'ITS asdfasdfasddfHERE')
Post.create(user_id:3, space_id:2, text:'ITSasdfasdfasdf asdfasdHERE')
Post.create(user_id:3, space_id:3, text:'ITSasd asdfasd G HERE')

Subscribe.create(user_id:1, space_id:1)
Subscribe.create(user_id:1, space_id:2)
Subscribe.create(user_id:1, space_id:3)
puts "✅ Done seeding"