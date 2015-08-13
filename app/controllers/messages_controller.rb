class MessagesController < ApplicationController
  before_filter :authenticate_user!, only: [:new]
  def index
    @messages = current_user.receiving_messages.order("created_at DESC").page(params[:page]).per(2)
    respond_to do |format|
      format.html
      format.json {
        render json: @messages, meta: {
          current_page: @messages.current_page,
          next_page: @messages.current_page,
          prev_page: @messages.prev_page,
          total_pages: @messages.total_pages,
          total_count: @messages.total_count
        }
      }
    end
  end

  def show
  end

  def new
    @message = current_user.sending_messages.build
  end

  def create
    if @message = current_user.sending_messages.create!(message_params)
        redirect_to root_path
    end
  end

  def edit
  end

  def update
    @message = current_user.receiving_messages.find(params[:id])
    @message.update(read_or_not: true)
    render json: @message
  end

  def destroy
    @message = current_user.receiving_messages.find(params[:id])
    @message.destroy
    @messages = current_user.receiving_messages.page(params[:page]).per(2)
    render json: @messages, meta: {
        current_page: @messages.current_page,
        next_page: @messages.current_page,
        prev_page: @messages.prev_page,
        total_pages: @messages.total_pages,
        total_count: @messages.total_count
      }
  end

  def read
    @message = current_user.receiving_messages.find(params[:id])
    if @message.update(read_or_not: true)
      @messages = current_user.receiving_messages.page(params[:page]).per(2)
      render json: @messages, meta: {
        current_page: @messages.current_page,
        next_page: @messages.current_page,
        prev_page: @messages.prev_page,
        total_pages: @messages.total_pages,
        total_count: @messages.total_count
      }
    end
  end

  private

  def message_params
    params.require(:message).permit(:message, :receiver_id)
  end
end
