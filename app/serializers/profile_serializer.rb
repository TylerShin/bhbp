class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :username, :region, :followings, :followers,
             :nation, :interest, :intro, :image

  def image
    object.userimage.url
  end

  def followings
    object.following
  end

  def followers
    object.followers
  end
end
