class Profile < ActiveRecord::Base
  mount_uploader :userimage, UserimageUploader
  belongs_to :user
  has_many :active_relationships, class_name: 'Relationship', foreign_key: 'follower_id', dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: 'followed_id', dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  validates :intro, length: { maximum: 200 }
  validate :userimage_size

  private

  def userimage_size
    return unless userimage.size > 1.megabytes
    errors.add(:userimage, '프로필 사진 용량은 1MB를 초과할 수 없습니다.')
  end
end
