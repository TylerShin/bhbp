class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.references :user
      t.string :username, default: '이름없음'
      t.string :region, add_index: true
      t.string :nation, add_index: true
      t.string :interest, default: '등록된 관심사가 없습니다.', add_index: true
      t.string :intro, default: '등록된 소개말이 없습니다.'
      t.string :userimage
      t.integer :point, default: 0
      t.timestamps null: false
    end
  end
end
