class PostLikesApiController < ApplicationController
	def create
		if Like.find_by(post_id: params[:posts_api_id], user_id: current_user.id)
		@post = Post.find(params[:posts_api_id])
		render json: @post
		else
			@like = current_user.likes.build(post_id: params[:posts_api_id], user_id: current_user.id)
			@like.save!
			@post = Post.find(params[:posts_api_id])
			render json: @post
		end	
	end	

	def destroy
		@like = Like.find(params[:id])
    	if @like.user_id == current_user.id
	      @like.destroy
	      @post = Post.find(params[:posts_api_id])
	      render json: @post
	    else
	    	@post = Post.find(params[:posts_api_id])
	    	render json: @post
	    end
	end
end
