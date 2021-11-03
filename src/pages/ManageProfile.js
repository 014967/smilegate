import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import noImg from '../assets/images/noimage.gif'
import { API, Storage } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import { v4 as uuidv4 } from 'uuid'

import S3 from 'react-aws-s3'
import { filenameToContentType } from '@aws-amplify/core'

const ManageWrapper = styled.div``

const Content_Title = styled.h1`
  border-bottom: 2px solid #353535;
`

const Blog_name = styled.div`
  display: flex;
`

const Blog_description = styled.div`
  display: flex;
`

const Blog_table = styled.table``



const ManageProfile = () => {
  const [profileImgUrl, setProfileImgUrl] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [introduce, setIntroduce] = useState('')
  const [id, setId] = useState('')

  const handleChange = (e) => {
    setIntroduce(e.target.value)
    console.log(introduce)
  }

  const submit_Profile = async () => {
    const profileDetail = {
      name: 'dummy',
      description: introduce,
      profile_img: profileImg,
    }

    if(profileImgUrl == '')
    {
      const updateDetail = {
        id: id,
        description: introduce,
        name: 'dummy',
        profile_img: profileImg,
      }

      if (id == '') {
        console.log(id)
  
        const newProfile = await API.graphql({
          query: mutations.createProfile,
          variables: { input: profileDetail },
        })
      } else {
        console.log(id)
        const updateProfile = await API.graphql({
          query: mutations.updateProfile,
          variables: { input: updateDetail },
        })
      }
    }else 
    {
      const updateDetail = {
        id: id,
        description: introduce,
      
      }

      if (id == '') {
        console.log(id)
  
        const newProfile = await API.graphql({
          query: mutations.createProfile,
          variables: { input: profileDetail },
        })
      } else {
        console.log(id)
        const updateProfile = await API.graphql({
          query: mutations.updateProfile,
          variables: { input: updateDetail },
        })
      }
    }

    

    /*ReactS3Client
        .uploadFile(uuid, profileImg)
        .then(data => console.log(data))
        .catch(error => console.error(error))*/

    //console.log(profileImg)

    if (profileImg != '') {
     
      const type = profileImg.type;
      const format = type.split('/');
      console.log(format[1]);
      const result = await Storage.put(id+"_"+uuidv4()+"."+format[1], profileImg, {
        contentType : profileImg.type,
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
        },
      })
    }
    alert("저장되었습니다");
  }

  const get_Profile = async () => {
    const allProfile = await API.graphql({ query: queries.listProfiles })
    if (allProfile.data.listProfiles.items.length != 0) {
      console.log(allProfile)
      console.log(allProfile.data.listProfiles.items[0].id)
      setId(allProfile.data.listProfiles.items[0].id)
      setIntroduce(allProfile.data.listProfiles.items[0].description)
      setProfileImgUrl(allProfile.data.listProfiles.items[0].profile_img)
      console.log(allProfile.data.listProfiles.items[0].description)
      console.log(allProfile.data.listProfiles.items[0].profile_img)
    }
  }

  const handleImg = (event) => {
    if(profileImg !== '')
    {

    }
    else {
      //bug 존재 사진설정하지않고 이미지 업로드시 초기화
      setProfileImg(event.target.files[0])
      setProfileImgUrl(URL.createObjectURL(event.target.files[0]))
    }
    
    
  }

  useEffect(() => {
    console.log(profileImg)
  }, [profileImg])

  useEffect(()=>
  {
    setProfileImg(profileImg)
  },[introduce])

  useEffect(() => {
    console.log(id)
  }, [id])

  useEffect(() => {
    get_Profile()
  }, [])
  return (
    <ManageWrapper>
      <Content_Title>블로그 정보</Content_Title>

      <Blog_table>
        <tbody>
          <tr>
            <td>블로그명</td>
            <td>
              <input type="text"></input>
            </td>
          </tr>
          <tr>
            <td>소개글</td>
            <td>
              <textarea
                cols="80"
                rows="3"
                value={introduce}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>블로그 프로필 이미지</td>
            <td>
              {profileImgUrl ? (
                <img src={profileImgUrl} width="180" height="180" />
              ) : (
                <img src={noImg} width="180" height="180" />
              )}
              <input type="file" onChange={handleImg} accept="image/*" />
            </td>
          </tr>
        </tbody>
      </Blog_table>
      <button onClick={submit_Profile}> 저장 </button>
    </ManageWrapper>
  )
}
export default ManageProfile
