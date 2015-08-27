class NotificationsController < ApplicationController
  def read
    if user_signed_in?
      current_user.read_noti
      @success = {success: "success"}
      render json: @success
    end
  end
end
