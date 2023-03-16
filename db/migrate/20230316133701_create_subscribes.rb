class CreateSubscribes < ActiveRecord::Migration[7.0]
  def change
    create_table :subscribes do |t|
      t.integer :user_id
      t.integer :space_id

      t.timestamps
    end
  end
end
