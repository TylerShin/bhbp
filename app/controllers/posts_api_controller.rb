class PostsApiController < ApplicationController
    def show
      @post = Post.find(params[:id])
      render json: @post
    end
    def free
        @posts = Post.where(table: 'free')
        render json: @posts
    end

    def question
        @posts = Post.where(table: 'question')
        render json: @posts
    end

    def info
        @posts = Post.where(table: 'info')
        render json: @posts
    end
end
