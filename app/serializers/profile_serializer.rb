class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :username, :region, :nation, :interest, :intro, :url,
    :user_image, :point, :nano_user_image

  def url
    profile_path(object)
  end

  def user_image
    object.userimage.url
  end

  def nano_user_image
    object.userimage.nano_thumb.url
  end
end
