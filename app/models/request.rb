class Request < ActiveRecord::Base
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
  has_one :evaluation, class_name: 'MeetingPoint', foreign_key: 'request_id', dependent: :destroy
  has_many :notifications, dependent: :destroy
  validates :sender_id, presence: true
  validates :receiver_id, presence: true

  def send_noti(sender_id, receiver_id)
    if Notification.find_by(noti_type: "request", request_id: self.id, sender_id: sender_id, receiver_id: receiver_id).nil?
      @noti = Notification.new(noti_type: "request", request_id: self.id, sender_id: sender_id, receiver_id: receiver_id)
      @noti.save!
    end
  end

  def undo_noti(sender_id, receiver_id)
    unless Notification.find_by(noti_type: "request", request_id: self.id, sender_id: sender_id, receiver_id: receiver_id).nil?
      @noti = Notification.find_by(noti_type: "request", request_id: self.id, sender_id: sender_id, receiver_id: receiver_id)
      @noti.destroy!
    end
  end
end
