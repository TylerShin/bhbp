class AddPointMetToRequest < ActiveRecord::Migration
  def change
    add_column :requests, :met_or_not, :boolean, default: false
  end
end
