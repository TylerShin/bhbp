class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :username, :region, :nation, :interest, :intro, :url, :userId,
    :user_image, :point, :nano_user_image, :flag, :chinese_point, :korean_point

  def url
    profile_path(object)
  end

  def user_image
    object.userimage.url
  end

  def userId
    object.user.id
  end

  def nano_user_image
    object.userimage.nano_thumb.url
  end

  def flag
    if object.nation == '한국'
      ActionController::Base.helpers.asset_path('kr.svg')
    else
      ActionController::Base.helpers.asset_path('cn.svg')
    end
  end
end
