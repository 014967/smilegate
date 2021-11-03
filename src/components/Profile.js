import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import noImg from '../assets/images/noimage.gif'
import { API, Storage } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import { v4 as uuidv4 } from 'uuid'

const ProfileWrapper  = styled.div`
    
`

const ProfileImg = styled.img`

`
const ProfileText = styled.div`
`



const Profile = () =>
{

    const [profile_Introduce , setProfile_Introduce] = useState('');
    const [profile_Img, setProfile_Img] = useState('');

    const get_Profile = async () =>
    {
        const allProfile = await API.graphql({ query: queries.listProfiles })
        console.log(allProfile)
        setProfile_Introduce(allProfile.data.listProfiles.items[0].description)
        setProfile_Img(allProfile.data.listProfiles.items[0].profile_img)

    }
    useEffect(()=>
    {
        get_Profile();
        console.log(profile_Img)
    },[])
    

    return (

        <ProfileWrapper>
            {
                profile_Img ? <ProfileImg src ={profile_Img} width ="180" height ="180" /> : <ProfileImg src ={noImg} width ="180" height ="180"/>
            }
            

            <ProfileText>
                {
                    profile_Introduce
                }

            </ProfileText>


            <button>

                글쓰기
            </button>

            

        </ProfileWrapper>


        
    );
}

export default Profile;