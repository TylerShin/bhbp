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
  after_create :make_profile

  def follow(other_user)
    active_relationships.create(followed_id: other_user)
  end

  # Unfollows a user.
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user).destroy
  end

  # Returns true if the current user is following the other user.
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
  # Handle request END

  private

  def make_profile
    profile = build_profile(nation: '한국')
    profile.save
  end
end
