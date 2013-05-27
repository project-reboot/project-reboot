class AddAddressToUsers < ActiveRecord::Migration
  def up
    change_table :users do |t|
      t.column :street, :string
      t.column :city, :string
      t.column :state, :string
    end
  end

  def down
    change_table :users do |t|
      t.remove :street
      t.remove :city
      t.remove :state
    end
  end
end
