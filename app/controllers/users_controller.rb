class UsersController < ApplicationController
  respond_to :json, only: :index
  def index
    # return geocoding information of all users
    distance = 20
    center_point = params[:coords]
    box = Geocoder::Calculations.bounding_box(center_point, distance)

    respond_with User.within_bounding_box(box)
  end
end
