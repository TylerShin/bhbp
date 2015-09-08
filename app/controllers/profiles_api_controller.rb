class ProfilesApiController < ApplicationController	
	
	def index
	    @profiles = Profile.all.page(params[:page]).per(20)
	    if user_signed_in?
	      if params.has_key?(:condition)
	        if params[:condition] == 'following'
	         @profiles = current_user.following
	         render json: @profiles, each_serializer: FollowingSerializer, root: 'profiles'
	        elsif params[:condition] == 'followers'
	          @profiles = current_user.followers
	          render json: @profiles, each_serializer: FollowingSerializer, root: 'profiles'
	        end
	      else
	        render json: @profiles, each_serializer: ProfileSerializer, root: 'profiles'
	      end
	    else
	    render json: @profiles, each_serializer: ProfileSerializer, root: 'profiles'
	    end
	end
	
	def show
	    @profile = Profile.find(params[:id])
    	render json: @profile	
	end

end
