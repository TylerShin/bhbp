class RequestsController < ApplicationController
  def index
    @senders = current_user.request_receivers
    @sign_in = true if user_signed_in?
    render json: @senders, root: 'profiles', each_serializer: UserSerializer, meta: { signIn: @sign_in }
  end

  def ownlist
    @receivers = current_user.request_senders
    @sign_in = true if user_signed_in?
    render json: @receivers, root: 'profiles', each_serializer: UserSerializer, meta: { signIn: @sign_in }
  end
end
