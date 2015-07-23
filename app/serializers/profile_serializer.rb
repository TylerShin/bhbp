class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :username, :region, :nation, :interest, :intro, :url

  def url
    profile_path(object)
  end
end
