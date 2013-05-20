class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation, :remember_me, :knows_cpr, :street, :city, :state

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_validation :geocode

  geocoded_by :address

  def address
    [street, city, state].compact.join(', ')
  end
end
