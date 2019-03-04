class UsersController < ApplicationController
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
