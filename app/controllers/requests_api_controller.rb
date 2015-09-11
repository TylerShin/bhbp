class RequestsApiController < ApplicationController

  def ownlist
    @requests = Request.where(receiver_id: params[:user_id])
    render json: @requests, root: :requests
  end

  def update
  	@requests = Request.where(receiver_id: params[:receiver_id])
  	@request = Request.find(params[:id])
  	@request.update!(accepted: !@request.accepted)
  	render json: @requests, root: :requests
  end

  def destroy
  	@requests = Request.where(receiver_id: params[:receiver_id])
  	@request = Request.find(params[:id])
  	@request.destroy!
  	render json: @requests, root: :requests
  end
end
