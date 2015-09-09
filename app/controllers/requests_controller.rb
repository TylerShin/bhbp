class RequestsController < ApplicationController
  def index
    @requests = Request.where(receiver_id: params[:user_id])
    render json: @requests
  end

  def ownlist
    @receivers = current_user.request_senders
    @sign_in = true if user_signed_in?
    render json: @receivers, root: 'profiles', each_serializer: UserSerializer, meta: { signIn: @sign_in }
  end
end
