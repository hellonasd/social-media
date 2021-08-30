module.exports =  class Dtos {
    constructor(model){
        this.id = model._id;
        this.profilePicture = model.profilePicture;
        this.coverPicture = model.coverPicture;
        this.followers = model.followers;
        this.followings = model.followings;
        this.isAdmin = model.isAdmin;
        this.username = model.username;
        this.email = model.email;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt
    }
}
