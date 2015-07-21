class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :profile, dependent: :destroy
  after_create :make_profile

  def follow(other_user)
    profile.active_relationships.create(followed_id: other_user.profile.id)
  end

  # Unfollows a user.
  def unfollow(other_user)
    profile.active_relationships.find_by(followed_id: other_user.profile).destroy
  end

  # Returns true if the current user is following the other user.
  def following?(other_user_profile)
    profile.following.include?(other_user_profile)
  end

  private

  def make_profile
    profile = build_profile(nation: '한국')
    profile.save
  end
end
