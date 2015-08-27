class Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :post
  belongs_to :comment

  def post_like_send_noti(post_id, sender_id, receiver_id)
    if Notification.find_by(noti_type: "post_like", post_id: post_id, like_id: self.id, sender_id: sender_id, receiver_id: receiver_id).nil?
      @noti = Notification.new(noti_type: "post_like", like_id: self.id, post_id: post_id, sender_id: sender_id, receiver_id: receiver_id)
      @noti.save!
    end
  end

  def undo_post_like_noti(post_id, sender_id, receiver_id)
    unless Notification.find_by(noti_type: "post_like", post_id: post_id, like_id: self.id, sender_id: sender_id, receiver_id: receiver_id).nil?
      @noti = Notification.find_by(noti_type: "post_like", post_id: post_id, like_id: self.id, sender_id: sender_id, receiver_id: receiver_id)
      @noti.destroy!
    end
  end

  def comment_like_send_noti(post_id, comment_id, sender_id, receiver_id)
    if Notification.find_by(noti_type: "comment_like", post_id: post_id, like_id: self.id, comment_id: comment_id, sender_id: sender_id, receiver_id: receiver_id).nil?
      @noti = Notification.new(noti_type: "comment_like", like_id: self.id, post_id: post_id, comment_id: comment_id, sender_id: sender_id, receiver_id: receiver_id)
      @noti.save!
    end
  end

  def comment_like_undo_noti(post_id, comment_id, sender_id, receiver_id)
    unless Notification.find_by(noti_type: "comment_like", post_id: post_id, like_id: self.id, comment_id: comment_id, sender_id: sender_id, receiver_id: receiver_id).nil?
      @noti = Notification.find_by(noti_type: "comment_like", post_id: post_id, like_id: self.id, comment_id: comment_id, sender_id: sender_id, receiver_id: receiver_id)
      @noti.destroy!
    end
  end
end
