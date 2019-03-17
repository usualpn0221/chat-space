class UsersController < ApplicationController
  def index
      @group = params[:group_id]
      @users = User.where.not(id: current_user.id).where.not(id: Member.where(group_id: "#{@group}").select(:user_id)).where('Users.name LIKE(?)',"#{params[:keyword]}%")

      respond_to do |format|
      format.html { render :nothing => true }
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
