class GroupsController < ApplicationController

  before_action :set_group, only: [:edit, :update]

  def index

  end


  def new
    @group = Group.new
    @group.users << current_user


  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end

  end

  def edit


  end

  def update
    if request.xhr? then
    Member.create(params.permit(:group_id,:user_id))
    elsif @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  def destroy
    if request.xhr? then

      member = Member.find_by(group_id: params[:group_id], user_id: params[:user_id])
      member.destroy
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end


  def set_group
    @group = Group.find(params[:id])
  end

end
