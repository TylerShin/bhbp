class PostSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :table, :title, :content, :category,
    :userImage, :username, :profileUrl, :currentUserImage, :postPath, :commentCount,
    :likesCount, :likeOrNot, :myLikeId

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

  def likesCount
    object.likes.count
  end

  def likeOrNot
    if Like.find_by(post_id: object.id, user_id: scope.id)
      true
    else
      false
    end
  end

  def myLikeId
    if Like.find_by(post_id: object.id, user_id: scope.id)
      Like.find_by(post_id: object.id, user_id: scope.id).id
    else
      ''
    end
  end

  def commentCount
     object.comments.length
  end 
end
