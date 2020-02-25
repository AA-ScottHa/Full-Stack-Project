class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :post_type_id
      t.string :title
      t.string :body
      t.boolean :reblogged
      t.integer :reblogged_id

      t.timestamps
    end
  end
end
