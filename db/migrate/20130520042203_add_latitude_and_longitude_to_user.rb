class AddLatitudeAndLongitudeToUser < ActiveRecord::Migration
  def up
    change_table :users do |t|
      t.column :latitude, :float
      t.column :longitude, :float
    end
  end

  def down
    change_table :users do |t|
      t.remove :latitude
      t.remove :longitude
    end
  end
end
