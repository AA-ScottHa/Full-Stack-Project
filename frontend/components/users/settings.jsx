import React from 'react';

export default class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile_image_url: this.props.user.profile_image_url,
      profile_image: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleImage(e){
    const file = e.currentTarget.files[0];

    const imageReader = new FileReader();
    let that = this;

    imageReader.onloadend= () => {
      that.setState({profile_image_url: imageReader.result});
    }

    if (file){
      this.setState({profile_image: file});
      imageReader.readAsDataURL(file);
    }
  }

  cancelEdit(){
    this.setState({
      profile_image_url: this.props.user.profile_image_url,
      profile_image: null,
    });

    let btn = document.querySelector('.update-btn');
    btn.disabled = false;
    btn.textContent = "Update Profile Picture";
    btn.classList.remove('disabled');
  }

  handleSubmit(e){
    e.preventDefault();

    let btn = document.querySelector('.update-btn');
    btn.disabled = true;
    btn.textContent = "Uploading...";
    btn.classList.add('disabled');

    const { profile_image } = this.state;
    const { updateSingleUserWithImage, user } = this.props;

    if (profile_image !== null){
      let formData = new FormData();
      formData.append('user[username]', user.username);
      formData.append('user[profile_image]', profile_image);

      updateSingleUserWithImage(user, formData)
        .then(() => this.cancelEdit())
        .fail(() => this.cancelEdit());
    }
  }

  render(){
    const { username } = this.props.user;
    const { profile_image_url } = this.state;

    if (this.props.user === undefined) return null;

    return (
      <div className="settings-div">
        <form className="settings-profile-img" onSubmit={this.handleSubmit}>
          <img
            className="profile-pic-user-show-settings"
            src={ profile_image_url === "" ? "https://68.media.tumblr.com/9f9b498bf798ef43dddeaa78cec7b027/tumblr_o51oavbMDx1ugpbmuo7_500.png" : profile_image_url }
            alt={username}
          /> <br/>
          <br/>
          <input
            type="file"
            name="profile_image"
            id="photos-uploader"
            onChange={this.handleImage}
            accept="image/*"
          /> <br/>
          <br/>
          <button className="update-btn">Update Profile Picture</button>
        </form>
      </div>
    )
  }
}