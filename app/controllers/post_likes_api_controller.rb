class PostLikesApiController < ApplicationController
	def create
		if Like.find_by(post_id: params[:posts_api_id], user_id: current_user.id)
		@post = Post.find(params[:posts_api_id])
		render json: @post
		else
			@like = current_user.likes.build(post_id: params[:posts_api_id], user_id: current_user.id)
			if @like.save
				# Make notification to receiver
				unless Post.find(params[:posts_api_id]).user === current_user
					@like.post_like_send_noti(params[:posts_api_id], current_user.id, Post.find(params[:posts_api_id]).user.id)
				end
			end
			@post = Post.find(params[:posts_api_id])
			render json: @post
		end
	end	

	def destroy
		@like = Like.find(params[:id])
    	if @like.user_id == current_user.id
	      if @like.destroy
					# Destroy notification to receiver
					unless Post.find(params[:posts_api_id]).user === current_user
						@like.undo_post_like_noti(params[:posts_api_id], current_user.id, Post.find(params[:posts_api_id]).user.id)
					end
				end
	      @post = Post.find(params[:posts_api_id])
	      render json: @post
	    else
	    	@post = Post.find(params[:posts_api_id])
	    	render json: @post
	    end
	end
end
