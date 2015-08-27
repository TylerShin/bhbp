class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :post
  belongs_to :comment
  belongs_to :request
  validates :noti_type, presence: true
  validates :receiver_id, presence: true
  validates :sender_id, presence: true
  before_create :destroy_old_notification

  def sender
    User.find(self.sender_id).profile.username
  end

  def sender_profile_id
    User.find(self.sender_id).profile.id
  end

  private

  def destroy_old_notification
    if Notification.where(receiver_id: self.receiver_id).length > 19
      User.find(receiver_id).notifications.first.destroy!
    end
  end
end
