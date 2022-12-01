import axios from "axios";
import { withNavigation } from "react-navigation";
import users from './assets/data/usersTest'

const LoadProfiles = async (token) => {
    //const token = route.params.paramKey;
    console.log(token)
   //console.log('HEY');

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
            });
            
            console.log(res)
            console.log(res.data.matches[0].nickname)
            users[0].name = res.data.matches[0].nickname
            //users[0].name = res.data.matches[1].nickname
            //navigation.navigate("Home", { paramKey: token });

        }
        catch(e){
            console.log(e)
        }
        
}

export default LoadProfiles