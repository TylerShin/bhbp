class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :updated_at, :followings, :followers,
    :request_senders, :request_receivers, :profile, :profile_url

  has_many :followings, serializer: UserSerializer

  def profile
    object.profile
  end

  def profile_url
    profile_path(object.profile)
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
end
