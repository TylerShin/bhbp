class PostSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :table, :title, :content, :category,
    :userImage, :username, :profileUrl, :currentUserImage, :postPath

  def userImage
    object.user.profile.userimage.url
  end

  def username
    object.user.profile.username
  end

  def profileUrl
    profile_path(object.user.profile)
  end

  def currentUserImage
    scope.profile.userimage.url if scope.profile
  end

  def postPath
    post_path(object.id)
  end
end
