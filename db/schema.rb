# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150806044448) do

  create_table "messages", force: :cascade do |t|
    t.integer  "sender_id",   limit: 4
    t.integer  "receiver_id", limit: 4
    t.string   "message",     limit: 255
    t.boolean  "read_or_not", limit: 1,   default: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  add_index "messages", ["receiver_id"], name: "index_messages_on_receiver_id", using: :btree
  add_index "messages", ["sender_id", "receiver_id"], name: "index_messages_on_sender_id_and_receiver_id", using: :btree
  add_index "messages", ["sender_id"], name: "index_messages_on_sender_id", using: :btree

  create_table "profiles", force: :cascade do |t|
    t.integer  "user_id",       limit: 4
    t.string   "username",      limit: 255, default: "이름없음"
    t.string   "region",        limit: 255
    t.string   "nation",        limit: 255
    t.string   "interest",      limit: 255, default: "등록된 관심사가 없습니다."
    t.string   "intro",         limit: 255, default: "등록된 소개말이 없습니다."
    t.string   "userimage",     limit: 255
    t.integer  "point",         limit: 4,   default: 0
    t.datetime "created_at",                                           null: false
    t.datetime "updated_at",                                           null: false
    t.integer  "chinese_point", limit: 4,   default: 0
    t.integer  "korean_point",  limit: 4,   default: 0
  end

  create_table "relationships", force: :cascade do |t|
    t.integer  "follower_id", limit: 4
    t.integer  "followed_id", limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "relationships", ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
  add_index "relationships", ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true, using: :btree
  add_index "relationships", ["follower_id"], name: "index_relationships_on_follower_id", using: :btree

  create_table "requests", force: :cascade do |t|
    t.integer  "sender_id",   limit: 4
    t.integer  "receiver_id", limit: 4
    t.boolean  "accepted",    limit: 1, default: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  add_index "requests", ["receiver_id"], name: "index_requests_on_receiver_id", using: :btree
  add_index "requests", ["sender_id", "receiver_id"], name: "index_requests_on_sender_id_and_receiver_id", unique: true, using: :btree
  add_index "requests", ["sender_id"], name: "index_requests_on_sender_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
