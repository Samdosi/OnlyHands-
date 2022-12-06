import axios from "axios";
import { withNavigation } from "react-navigation";
import users from './users'
import FontAwesome from "react-native-vector-icons/FontAwesome";

const LoadProfiles = async (token) => {
    //const token = route.params.paramKey;
    console.log(token)
   //console.log('HEY');

   const avatarImages = [
    require('../Avatars/1.jpg'),
    require('../Avatars/2.jpg'),
    require('../Avatars/3.jpg'),
    require('../Avatars/4.jpg'),
    require('../Avatars/5.jpg'),
  ]

  const defaultImage = require('../Avatars/default.png')

        const header = {
            'x-access-token': token,
            'Content-Type': 'application/json',
        }

        const body = {
            'numMatches' : 10,
            'Content-Type': 'application/json',
        }
        //console.log(header["x-access-token"])
        try{
            const baseURL = "https://only-hands.herokuapp.com"
            const res = await axios.get(baseURL + '/api/match/serve',{
                headers:header,                    
            }).then((res)=>{

                console.log(res)
                for(i=0;i<=res.data.matches.length;i++){
                    console.log(i)
                    users[i].name = res.data.matches[i].firstName
                    users[i].bio = res.data.matches[i].bio
                    users[i].age = res.data.matches[i].age
                    users[i].wins = res.data.matches[i].wins 
                    users[i].losses = res.data.matches[i].losses
                    users[i].id = res.data.matches[i]._id 
                    console.log(res.data.matches[i].image)
                    users[i].image = avatarImages[res.data.matches[i].image] || defaultImage
                    console.log(users[i].id);
                }
            })
            
        }
        catch(e){
            console.log(e)
        }
        
}

export default LoadProfiles