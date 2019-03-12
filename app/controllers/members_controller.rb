class MembersController < ApplicationController
  def create
    Member.create(params.permit(:name,:user_ids))
    redirect_to controller: 'groups', action: 'update'
  end

    def destroy
      member = Member.find(params[:id])
        member.destroy
      redirect_to controller: 'groups', action: 'update'
    end

end
