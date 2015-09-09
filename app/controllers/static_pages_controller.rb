class StaticPagesController < ApplicationController
  layout "no_header"
  def home
    if user_signed_in?
      redirect_to posts_path
    else
      render 'home'
    end
  end
end
