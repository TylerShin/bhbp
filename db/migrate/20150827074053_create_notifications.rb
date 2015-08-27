class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :noti_type
      t.integer :post_id
      t.integer :request_id
      t.integer :comment_id
      t.integer :like_id
      t.integer :message_id
      t.integer :receiver_id
      t.integer :sender_id
      t.boolean :read_or_not, default: false
      t.timestamps null: false
    end
  end
end
