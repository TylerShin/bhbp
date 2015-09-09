# encoding: utf-8

class UserimageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  process resize_to_fill: [400, 400]
  version :mini_thumb do
    process resize_to_fill: [250, 250]
  end
  version :nano_thumb, from_version: :mini_thumb do
    process resize_to_fill: [50, 50]
  end

  if Rails.env.production?
    storage :fog
  else
    storage :file
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def default_url
    ActionController::Base.helpers.asset_path([version_name, "default_profile.jpg"].compact.join('_'))
  end
end
