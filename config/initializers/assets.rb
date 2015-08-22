# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( profiles_index.js )
Rails.application.config.assets.precompile += %w( components/profile_find.js )
Rails.application.config.assets.precompile += %w( components/profile_show.js )
Rails.application.config.assets.precompile += %w( components/posts_index.js )
Rails.application.config.assets.precompile += %w( components/posts_show.js )


Rails.application.config.assets.precompile += %w( static_pages.css )
Rails.application.config.assets.precompile += %w( login/login.css )
Rails.application.config.assets.precompile += %w( profiles/index.css )
Rails.application.config.assets.precompile += %w( profiles/show.css )
Rails.application.config.assets.precompile += %w( profiles/new.css )
Rails.application.config.assets.precompile += %w( profiles/find.css )
Rails.application.config.assets.precompile += %w( posts/posts_index.css )
Rails.application.config.assets.precompile += %w( posts/posts_show.css )
