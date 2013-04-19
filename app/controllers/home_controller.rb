class HomeController < ApplicationController
  respond_to :json, only: [:determine_ip_address]

  def index
  end

  def determine_ip_address
    # TODO: change IP to request.remote_ip; current hard-coded for testing
    location_data = Geocoder.search('50.150.99.172').first

    respond_with location_data
  end
end
