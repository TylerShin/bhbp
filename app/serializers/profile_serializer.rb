class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :username, :region, :nation, :interest, :intro, :url, :userId,
    :user_image, :point, :nano_user_image, :mini_user_image, :chinese_point, :korean_point,
    :followingCount, :followersCount, :myposts, :mine_or_not, :follow_or_not, :request_or_not

  def url
    profile_path(object)
  end

  def user_image
    object.userimage.url
  end

  def userId
    object.user.id
  end

  def followingCount
    object.user.following.count
  end

  def followersCount
    object.user.followers.count
  end

  def mini_user_image
    object.userimage.mini_thumb.url
  end

  def nano_user_image
    object.userimage.nano_thumb.url
  end

  def mine_or_not
    if object.user.id === scope.id
      return true
    else
      return false
    end
  end

  def follow_or_not
    if scope.following.pluck(:id).include?(object.user.id)
      return true
    else
      return false
    end
  end

  def request_or_not
    scope.request?(object.user)
  end

  def myposts
    Post.where(user_id: object.user.id).order("created_at DESC").limit(5)
  end
end
