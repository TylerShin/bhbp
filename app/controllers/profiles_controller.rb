class ProfilesController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :show, :edit, :update]
  before_filter :make_profile, except: [:new, :create, :edit, :update]

  def index
    @message = current_user.sending_messages.build
  end

  def new
    if current_user.profile.nil?
      @profile = current_user.build_profile
    else
      redirect_to root_path
    end
  end

  def create
    @profile = current_user.build_profile(profile_params)
    if @profile.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  def ownlist
    @profiles = current_user.following
    @sign_in = true if user_signed_in?
    render json: @profiles, meta: {signIn: @sign_in}
  end

  def show
    @profile = Profile.find(params[:id])
  end

  def edit
    @profile = Profile.find(params[:id])
    redirect_to root_path unless @profile == current_user.profile
  end

  def update
    @profile = current_user.profile
    if @profile.update(profile_params)
      redirect_to profile_path(@profile)
    else
      render 'edit'
    end
  end

  def follow
    @profile = Profile.find(params[:profile_id])
    current_user.follow(@profile.user)
    render json: @profile
  end

  def unfollow
    @profile = Profile.find(params[:profile_id])
    current_user.unfollow(@profile.user)
    render json: @profile
  end

  def sendrequest
    @receiver = User.find(params[:receiver_id])
    if current_user.request(@receiver)
      @follow = current_user.following?(@receiver)
      @request = current_user.request?(@receiver)
      @process = current_user.process?(@receiver) if @request
      @mine = true if @receiver == current_user
      render json: @receiver, meta: {mine: @mine, following: @follow, request: @request, process: @process}
    end
  end

  def unsendrequest
    @receiver = User.find(params[:receiver_id])
    if current_user.unrequest(@receiver)
      @follow = current_user.following?(@receiver)
      @request = current_user.request?(@receiver)
      @process = current_user.process?(@receiver) if @request
      @mine = true if @receiver == current_user
      render json: @receiver, meta: {mine: @mine, following: @follow, request: @request, process: @process}
    end
  end

  def search
    if params.has_key?(:search)
      @profiles = Profile.where('username LIKE ?', "%#{params[:search]}%").limit(5) if params[:search].length > 0
    else
      @profiles = Profile.all
      @profiles = @profiles.where("nation LIKE ?", "#{params[:nation]}") if params[:nation]
      @profiles = @profiles.where("gender LIKE ?", "#{params[:gender]}") if params[:gender]
      @profiles = @profiles.where("age >= #{params[:minAge]}") if params[:minAge]
      @profiles = @profiles.where("age <= #{params[:maxAge]}") if params[:maxAge]
    end
    render json: @profiles
  end

  def find
  end

  private

  def make_profile
    if user_signed_in?
      if current_user.profile.nil?
        redirect_to new_profile_path
      end
    end
  end

  def profile_params
    params.require(:profile).permit(:username, :gender, :region, :nation, :interest, :intro, :userimage)
  end
end
