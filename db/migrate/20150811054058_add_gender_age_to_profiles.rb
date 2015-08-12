class AddGenderAgeToProfiles < ActiveRecord::Migration
    def change
        add_column :profiles, :gender, :string
        add_column :profiles, :age, :integer
    end
end
