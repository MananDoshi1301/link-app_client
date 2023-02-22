import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayLinks from './DisplayLinks';
import NoLinks from './NoLinks';
import { Skeleton, Stack } from '@chakra-ui/react';


const LinkPage = ({ details, setDetails }) => {

  const [linkData, setLinkData] = useState(null);
  const navigate = useNavigate();

  // window.onload = function () {
  //   if (!window.location.hash) {
  //     // window.alert('ONLOAD')
  //     window.location = window.location + '#loaded';
  //     window.location.reload();
  //   }
  // }

  const getLinks = useCallback(async () => {

    try {
      const resGetLinks = process.env.REACT_APP_API_URL + `/link-page/${details.id}`;
      const res = await fetch(resGetLinks, {
        method: "GET",
        headers: {
          'Accept': "application/json",
          'Authorization': details.authToken
        }
      })
      const data = await res.json();
      setLinkData(data.data);

    } catch (err) {
      console.log(err);
    }
  }, [details.id])

  const deleteLink = async (linkId) => {

    try {
      const resDeleteLink = process.env.REACT_APP_API_URL + '/link-page/delete-link';
      const res = await fetch(resDeleteLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": details.authToken
        },
        body: JSON.stringify({
          linkId, userId: details.id
        })
      });

      const res_data = await res.json();
      if (res_data.error === false) {
        // window.alert('DELETE');
        // window.location = window.location + '#loaded';
        getLinks();
        // navigate("/link-page")
      } else {

      }
      // console.log(res_data);

    } catch (error) {

    }
  }

  useEffect(() => {

    const session = JSON.parse(sessionStorage.getItem('details'));

    if (session === null) {
      navigate("/please-log-in");
      return 0;
    }

    if (!details.id) {
      const newDetails = {
        email: session.email,
        id: session.id,
        isLoggedIn: true,
        authToken: "Bearer " + session.acT
      }
      setDetails(newDetails);
    }

    getLinks();
  }, [details.id, details.isLoggedIn, setDetails, getLinks, navigate])

  return (
    <>
      {
        (
          linkData === null ? (
            <Stack p={10}>
              <Skeleton height='200px' />
              <Skeleton height='175px' />
              <Skeleton height='150px' />
            </Stack>
          ) :
            (linkData && linkData.length !== 0) ?
              (<DisplayLinks linkData={linkData} deleteLink={deleteLink} />) : (
                <NoLinks />
              )
        )
      }
    </>
  )
}

export default LinkPage