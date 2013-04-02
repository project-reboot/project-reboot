class HomeController < ApplicationController
  def index
  end

  def determine_ip_address
    respond_to do |format|
      format.json { render :json => Geocoder.search('50.150.99.172') }
    end
  end
end
