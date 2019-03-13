  json.array! @messages do |message|
  json.body  message.body
  json.date  message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name  message.user.name
  json.image message.image
  json.id message.id
end
