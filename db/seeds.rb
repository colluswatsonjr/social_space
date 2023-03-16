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

puts "✅ Done seeding"