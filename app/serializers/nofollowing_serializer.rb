class NofollowingSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :updated_at, :profile

  has_one :profile, serializer: ProfileSerializer
  def profile
    object.profile
  end

  def request_senders
    object.request_senders
  end

  def request_receivers
    object.request_receivers
  end
end
