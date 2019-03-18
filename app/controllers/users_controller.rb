class UsersController < ApplicationController
  def index
      @group = params[:group_id]
      @new_members =params[:users_id]

      @users = User.where.not(id: @new_members).where('users.name LIKE(?)',"#{params[:keyword]}%")

      respond_to do |format|
      format.html
      format.json
      end
  end
end
