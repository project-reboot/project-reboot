class HomeController < ApplicationController
  def index
  end

  def determine_ip_address
    # TODO: change IP to request.remote_ip; current hard-coded for testing
    location_data = Geocoder.search('50.150.99.172')
    respond_to do |format|
      format.json { render :json => location_data }
    end
  end
end
