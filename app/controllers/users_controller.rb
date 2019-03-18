class UsersController < ApplicationController
  def index
      @group = params[:group_id]
      @users = User.where('users.name LIKE(?)',"#{params[:keyword]}%")

      respond_to do |format|
      format.html
      format.json
      end
  end

  def edit

  end

  def update
    current_user.update(create_params)
    redirect_to controller: :groups, action: :index
  end

  private
  def create_params
    params.require(:user).permit(:name ,:email)
  end
end
