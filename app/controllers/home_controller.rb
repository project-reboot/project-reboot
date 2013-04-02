class HomeController < ApplicationController
  def index
  end

  def determine_ip_address
    location_data = Geocoder.search('50.150.99.172') # TODO: change IP to request.remote_ip
    respond_to do |format|
      format.json { render :json => location_data }
    end
  end
end
