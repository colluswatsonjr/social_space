class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.integer :space_id
      t.string :text

      t.timestamps
    end
  end
end
