class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :updated_at, :followings, :followers,
    :request_senders, :request_receivers, :profile

  has_one :profile, serializer: ProfileSerializer
  has_many :followings, each_serializer: NofollowingSerializer
  has_many :followers, each_serializer: NofollowingSerializer

  def profile
    object.profile
  end

  def followings
    object.following
  end

  def followers
    object.followers
  end

  def request_senders
    object.request_senders
  end

  def request_receivers
    object.request_receivers
  end

  def created_at
    object.created_at.strftime('%Y-%m-%d, %H:%M')
  end

  def updated_at
    object.updated_at.strftime('%Y-%m-%d, %H:%M')
  end
end
