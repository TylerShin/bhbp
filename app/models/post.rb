class Post < ActiveRecord::Base
  has_many :comments, dependent: :destroy
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :notifications, dependent: :destroy
  validates :table, presence: true
  validates :title, presence: true, length: {minimum: 5, maximum: 40}
  validates :content, presence: true, length: {minimum: 10}
end
