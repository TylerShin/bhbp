class ProfilesController < ApplicationController
  before_filter :authenticate_user!, only: [:show]
  def index
    @profiles = User.all
    @sign_in = true if user_signed_in?
    respond_to do |format|
      format.html
      format.json { render json: @profiles, meta: { signIn: @sign_in } }
    end
  end

  def ownlist
    @profiles = current_user.following
    @sign_in = true if user_signed_in?
    render json: @profiles, meta: { signIn: @sign_in }
  end

  def show
    @profile = Profile.find(params[:id])
    @my_profile = current_user.following?(@profile)
    @request = current_user.request?(@profile.user)
    @process = current_user.process?(@profile.user) if @request
    @mine = true if @profile.user == current_user
    respond_to do |format|
      format.html
      format.json { render json: @profile, meta: { mine: @mine, following: @my_profile, request: @request, process: @process }}
    end
  end

  def follow
    @profile = Profile.find(params[:profile])
    current_user.follow(@profile.user)
    @my_profile = current_user.following?(@profile)
    @request = current_user.request?(@profile.user)
    @process = current_user.process?(@profile.user) if @request
    @mine = true if @profile.user == current_user
    render json: @profile, meta: { mine: @mine, following: @my_profile, request: @request, process: @process }
  end

  def unfollow
    @profile = Profile.find(params[:profile])
    current_user.unfollow(@profile.user)
    @my_profile = current_user.following?(@profile)
    @request = current_user.request?(@profile.user)
    @process = current_user.process?(@profile.user) if @request
    @mine = true if @profile.user == current_user
    render json: @profile, meta: { mine: @mine, following: @my_profile, request: @request, process: @process }
  end

  def sendrequest
    @receiver = User.find(params[:receiver_id])
    if current_user.request(@receiver)
      @profile = Profile.find(@receiver.profile.id)
      @my_profile = current_user.following?(@profile)
      @request = current_user.request?(@receiver)
      @process = current_user.process?(@receiver) if @request
      @mine = true if @profile.user == current_user
      render json: @profile, meta: { rmine: @mine, following: @my_profile, request: @request, process: @process }
    end
  end

  def unsendrequest
    @receiver = User.find(params[:receiver_id])
    if current_user.unrequest(@receiver)
      @profile = Profile.find(@receiver.profile.id)
      @my_profile = current_user.following?(@profile)
      @mine = true if @profile.user == current_user
      render json: @profile, meta: { mine: @mine, following: @my_profile, request: @request, process: @process }
    end
  end
end
