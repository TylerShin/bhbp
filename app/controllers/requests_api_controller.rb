class RequestsApiController < ApplicationController

  def ownlist
    @requests = Request.where(receiver_id: params[:user_id])
    render json: @requests, root: :requests
  end

  def sendList
    @requests = Request.where(sender_id: params[:user_id])
    render json: @requests, root: :requests
  end

  def met
    @requests = Request.where(receiver_id: params[:receiver_id])
    @request = Request.find(params[:request_id])
    @request.update!(met_or_not: !@request.met_or_not)
    render json: @requests, root: :requests
  end

  def evaluation
    @requests = Request.where(receiver_id: params[:user_id])
    @request = Request.find(params[:request_id])
    @evaluation = @request.build_evaluation(point: params[:point], comment: params[:evaluation])
    if @evaluation.save
      render json: @requests, root: :requests
    end
  end

  def update
  	@requests = Request.where(receiver_id: params[:receiver_id])
  	@request = Request.find(params[:id])
  	@request.update!(accepted: !@request.accepted)
  	render json: @requests, root: :requests
  end

  def destroy
  	@requests = Request.where(receiver_id: params[:receiver_id])
  	@request = Request.find(params[:request_id])
  	@request.destroy!
  	render json: @requests, root: :requests
  end
end
