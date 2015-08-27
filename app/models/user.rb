class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :profile, dependent: :destroy
  has_many :active_relationships, class_name: 'Relationship', foreign_key: 'follower_id', dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: 'followed_id', dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :active_requests, class_name: 'Request', foreign_key: 'sender_id', dependent: :destroy
  has_many :passive_requests, class_name: 'Request', foreign_key: 'receiver_id', dependent: :destroy
  has_many :request_senders, through: :active_requests, source: :receiver
  has_many :request_receivers, through: :passive_requests, source: :sender
  has_many :sending_messages, class_name: 'Message', foreign_key: 'sender_id', dependent: :destroy
  has_many :receiving_messages, class_name: 'Message', foreign_key: 'receiver_id', dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :notifications, foreign_key: 'receiver_id', dependent: :destroy

  # Handle Follow
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
    if Notification.find_by(noti_type: "follow", sender_id: self.id, receiver_id: other_user.id).nil?
      @noti = Notification.new(noti_type: "follow", sender_id: self.id, receiver_id: other_user.id)
      @noti.save!
    end
  end

  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
    unless Notification.find_by(noti_type: "follow", sender_id: self.id, receiver_id: other_user.id).nil?
      @noti = Notification.find_by(noti_type: "follow", sender_id: self.id, receiver_id: other_user.id)
      @noti.destroy!
    end
  end

  def following?(other_user)
    following.include?(other_user)
  end

  # Handle request BEGIN
  def request(other_user)
    active_requests.create(receiver_id: other_user.id)
  end

  def unrequest(other_user)
    active_requests.find_by(receiver_id: other_user.id).destroy
  end

  def request?(other_user)
    request_senders.include?(other_user)
  end

  def process?(other_user)
    active_requests.find_by(receiver_id: other_user.id).accepted
  end

  # Count un-read notifications
  def count_unread_noti
    notifications.where(read_or_not: false).length
  end
  # Read Notifications(Update un-read notifications to read)
  def read_noti
    notifications.where(read_or_not: false).each do |noti|
      noti.update(read_or_not: true)
    end
  end

  private

end
