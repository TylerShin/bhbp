class CommentsApiController < ApplicationController
  def index
    @comments = Comment.where(post_id: params[:posts_api_id])
    render json: @comments
  end

  def create
    @comment = current_user.comments.build(post_id: params[:posts_api_id], comment: params[:comment])
    @comment.save!
    @comments = Comment.where(post_id: params[:posts_api_id])
    render json: @comments
  end

  def destroy
    @comment = Comment.find_by(post_id: params[:posts_api_id], id: params[:id])
    @comment.destroy!
    @comments = Comment.where(post_id: params[:posts_api_id])
    render json: @comments
  end
end
