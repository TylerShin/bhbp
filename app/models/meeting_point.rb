class MeetingPoint < ActiveRecord::Base
  belongs_to :evaluation, class_name: 'Request'
end
