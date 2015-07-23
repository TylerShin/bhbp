class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :username, :region, :nation, :interest, :intro, :url,
    :user_image

  def url
    profile_path(object)
  end

  def user_image
    object.userimage.url
  end
end
