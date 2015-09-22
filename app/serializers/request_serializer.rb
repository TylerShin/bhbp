class RequestSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id, :accepted, :created_at, :met_or_not, :evaluation,
    :sender_nano_img, :sender_username, :sender_profile_URL,
    :receiver_nano_img, :receiver_username, :receiver_profile_URL

    # sender_part
    def sender_nano_img
      object.sender.profile.userimage.nano_thumb.url
    end

    def sender_username
      object.sender.profile.username
    end

    def sender_profile_URL
      profile_path(object.sender.profile.id)
    end
    # receiver_part
    def receiver_nano_img
      object.receiver.profile.userimage.nano_thumb.url
    end

    def receiver_username
      object.receiver.profile.username
    end

    def receiver_profile_URL
      profile_path(object.receiver.profile.id)
    end
end
