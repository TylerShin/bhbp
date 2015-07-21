class ProfilesController < ApplicationController
  before_filter :authenticate_user!, only: [:show]
  def index
    @profiles = Profile.all
  end

  def show
    @profile = Profile.find(params[:id])
    @my_profile = current_user.following?(@profile)
    @mine = true if @profile.user == current_user
    respond_to do |format|
      format.html
      format.json { render json: @profile, meta: { mine: @mine, following: @my_profile }}
    end
  end

  def follow
    @profile = Profile.find(params[:profile])
    current_user.follow(@profile.user)
    @my_profile = current_user.following?(@profile)
    @mine = true if @profile.user == current_user
    render json: @profile, meta: { mine: @mine, following: @my_profile }
  end

  def unfollow
    @profile = Profile.find(params[:profile])
    current_user.unfollow(@profile.user)
    @my_profile = current_user.following?(@profile)
    @mine = true if @profile.user == current_user
    render json: @profile, meta: { mine: @mine, following: @my_profile }
  end
end
