class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :created_at, :updated_at, :userImage, :username,
    :profileUrl, :mine, :likes, :likeOrNot, :myLikeId

  def userImage
    object.user.profile.userimage.url
  end

  def username
    object.user.profile.username
  end

  def profileUrl
    profile_path(object.user.profile)
  end

  def mine
    if object.user.id == scope.id
      true
    else
      false
    end
  end

  def likes
    object.likes.length
  end

  def likeOrNot
    if Like.find_by(comment_id: object.id, user_id: scope.id)
      true
    else
      false
    end
  end

  def myLikeId
    if Like.find_by(comment_id: object.id, user_id: scope.id)
      Like.find_by(comment_id: object.id, user_id: scope.id).id
    else
      ''
    end
  end
end
