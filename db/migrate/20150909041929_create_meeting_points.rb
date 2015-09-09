class CreateMeetingPoints < ActiveRecord::Migration
  def change
    create_table :meeting_points do |t|
        t.integer :request_id
        t.integer :point
        t.string :comment
      t.timestamps null: false
    end
  end
end
