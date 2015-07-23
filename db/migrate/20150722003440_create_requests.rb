class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.boolean :accepted, default: false

      t.timestamps null: false
    end
    add_index :requests, :sender_id
    add_index :requests, :receiver_id
    add_index :requests, [:sender_id, :receiver_id], unique: true
  end
end
