class AddLanguageSkillToProfiles < ActiveRecord::Migration
  def change
    add_column :profiles, :chinese_point, :integer, default: 0
    add_column :profiles, :korean_point, :integer, default: 0
  end
end
