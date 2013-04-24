class RenameCprColumnOnUsers < ActiveRecord::Migration
  def up
    change_table :users do |t|
      t.remove_index :cpr
      t.remove :cpr
      t.boolean :knows_cpr, default: false
      t.index :knows_cpr
    end
  end

  def down
    change_table :users do |t|
      t.remove_index :knows_cpr
      t.remove :knows_cpr
      t.boolean :cpr, default: false
      t.index :cpr
    end
  end
end
