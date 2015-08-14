class FollowingSerializer < ActiveModel::Serializer
  attributes :id, :username, :region, :nation, :interest, :intro, :url, :userId,
    :user_image, :point, :flag, :chinese_point, :korean_point

  def id
    object.profile.id
  end

  def username
    object.profile.username
  end

  def region
    object.profile.region
  end

  def nation
    object.profile.nation
  end

  def interest
    object.profile.interest
  end

  def intro
    object.profile.intro
  end

  def url
    profile_path(object.profile.id)
  end

  def userId
    object.id
  end

  def user_image
      object.profile.userimage.url
  end

  def point
      object.profile.point
  end

  def chinese_point
      object.profile.chinese_point
  end

  def korean_point
      object.profile.korean_point
  end
  def flag
    if object.profile.nation == '한국'
      ActionController::Base.helpers.asset_path('kr.svg')
    else
      ActionController::Base.helpers.asset_path('cn.svg')
    end
  end
end
