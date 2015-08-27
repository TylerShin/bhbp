class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :post
  has_many :likes, dependent: :destroy
  has_many :notifications, dependent: :destroy

  validates :comment, presence: true, length: { minimum: 5, maximum: 250 }

  def send_noti(post_id, sender_id, receiver_id)
    if Notification.find_by(noti_type: "comment", post_id: post_id, comment_id: self.id, sender_id: sender_id, receiver_id: receiver_id).nil?
      @noti = Notification.new(noti_type: "comment", post_id: post_id, comment_id: self.id, sender_id: sender_id, receiver_id: receiver_id)
      @noti.save!
    end
  end

  def undo_noti(post_id, sender_id, receiver_id)
    unless Notification.find_by(noti_type: "comment", post_id: post_id, comment_id: self.id, sender_id: sender_id, receiver_id: receiver_id).nil?
      @noti = Notification.find_by(noti_type: "comment", post_id: post_id, comment_id: self.id, sender_id: sender_id, receiver_id: receiver_id)
      @noti.destroy!
    end
  end
end
