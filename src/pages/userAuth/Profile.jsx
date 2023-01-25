import "../../styles/pages/_homepage.scss";
import { useEffect, useState } from "react";

const Profile = () => {


  const [storeName, setStoreName] = useState("")
  const [email, setEmail] = useState("")
  const [picture, setPicture] = useState("")
  const [password, setPassword] = useState("")



  useEffect(() => {
    //Should have request in db for all the user's data by sending te user ID

    //Or we can use this but this only returns partial info of the user
    const user = JSON.parse(localStorage.getItem("user"));
    setStoreName(user.data.storeName)
    setEmail(user.data.email)
    
  }, [])

  
  

  const handleUpdate = () => {

    console.log("Update")
  }


  return (
    <div className="profile-page">
      <h1>This is the profile page</h1>


      <div class="card">
      <figure class="image is-128x128">
        <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png"></img>
      </figure>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{storeName}</p>
              <p class="subtitle is-6">{email}</p>
            </div>
          </div>

          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br></br>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>
      
      

    </div>
  )
}

export default Profile;