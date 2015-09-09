class RequestSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id, :accepted, :created_at, :met_or_not, :evaluation,
    :sender_nano_img, :sender_username, :sender_profile_URL

    def sender_nano_img
      object.sender.profile.userimage.nano_thumb.url
    end

    def sender_username
      object.sender.profile.username
    end

    def sender_profile_URL
      profile_path(object.sender.profile.id)
    end
end
