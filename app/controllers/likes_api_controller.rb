class LikesApiController < ApplicationController
  def create
    if Like.find_by(post_id: params[:posts_api_id], comment_id: params[:comments_api_id], user_id: current_user.id)
      @comments = Comment.where(post_id: params[:posts_api_id])
      render json: @comments
    else
      @like = current_user.likes.build(post_id: params[:posts_api_id], comment_id: params[:comments_api_id])
      if @like.save
        # Make notification to receiver
        unless Comment.find(params[:comments_api_id]).user === current_user
          @like.comment_like_send_noti(params[:posts_api_id], params[:comments_api_id], current_user.id, Comment.find(params[:comments_api_id]).user.id)
        end
      end
      @comments = Comment.where(post_id: params[:posts_api_id])
      render json: @comments
    end
  end

  def destroy
    @like = Like.find(params[:id])
    if @like.user_id == current_user.id
      if  @like.destroy
        # Destroy notification to receiver
        unless Comment.find(params[:comments_api_id]).user === current_user
          @like.comment_like_undo_noti(params[:posts_api_id], params[:comments_api_id], current_user.id, Comment.find(params[:comments_api_id]).user.id)
        end
      end
      @comments = Comment.where(post_id: params[:posts_api_id])
      render json: @comments
    else
      @comments = Comment.where(post_id: params[:posts_api_id])
      render json: @comments
    end
  end
end
