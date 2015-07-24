class RequestSerializer < ActiveModel::Serializer
  attributes :id, :email, :profiles

  def profiles
    object.profile
  end
end
