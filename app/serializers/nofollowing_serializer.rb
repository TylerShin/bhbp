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

  def created_at
    object.created_at.strftime('%Y-%m-%d, %H:%M')
  end

  def updated_at
    object.updated_at.strftime('%Y-%m-%d, %H:%M')
  end
end
