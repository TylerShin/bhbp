module FlagHelper
  def flag(nation)
    if nation == '한국'
      image_tag 'kr.svg', size: '40x30'
    else
      image_tag 'cn.svg'
    end
  end
end
