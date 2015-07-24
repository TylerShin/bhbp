class Profile < ActiveRecord::Base
  mount_uploader :userimage, UserimageUploader
  belongs_to :user
  validates :intro, length: { maximum: 200 }
  validate :userimage_size

  private

  def userimage_size
    return unless userimage.size > 1.megabytes
    errors.add(:userimage, '프로필 사진 용량은 1MB를 초과할 수 없습니다.')
  end
end
