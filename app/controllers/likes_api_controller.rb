class LikesApiController < ApplicationController
  def create
    if Like.find_by(post_id: params[:posts_api_id], comment_id: params[:comments_api_id], user_id: current_user.id)
      @comments = Comment.where(post_id: params[:posts_api_id])
      render json: @comments
    else
      @like = current_user.likes.build(post_id: params[:posts_api_id], comment_id: params[:comments_api_id])
      @like.save!
      @comments = Comment.where(post_id: params[:posts_api_id])
      render json: @comments
    end
  end

  def destroy
    @like = Like.find(params[:id])
    if @like.user_id == current_user.id
      @like.destroy
      @comments = Comment.where(post_id: params[:posts_api_id])
      render json: @comments
    else
      @comments = Comment.where(post_id: params[:posts_api_id])
      render json: @comments
    end
  end
end
