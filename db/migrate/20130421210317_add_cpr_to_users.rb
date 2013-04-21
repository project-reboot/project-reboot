class AddCprToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cpr, :boolean, :default => false
    add_index  :users, :cpr
  end
end
