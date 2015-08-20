class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :post
  has_many :likes, dependent: :destroy

  validates :comment, presence: true, length: { minimum: 5, maximum: 250 }
end
