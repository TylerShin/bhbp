class PostsApiController < ApplicationController
    def show
      @post = Post.find(params[:id])
      render json: @post
    end
    def free
        @posts = Post.where(table: 'free').page(params[:page]).per(7)
        render json: @posts, meta: {
          current_page: @posts.current_page,
          next_page: @posts.current_page,
          prev_page: @posts.prev_page,
          total_pages: @posts.total_pages,
          total_count: @posts.total_count
        }
    end

    def question
        @posts = Post.where(table: 'question').page(params[:page]).per(10)
        render json: @posts
    end

    def info
      @posts = Post.where(table: 'info').page(params[:page]).per(10)
        render json: @posts
    end

    def intro
      @posts = Post.where(table: 'intro').page(params[:page]).per(10)
        render json: @posts
    end

    def best
      @posts = Post.all
      render json: @posts
    end
end
